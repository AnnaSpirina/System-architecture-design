class EventService {
    constructor() {
        this.events = [
            { id: 1, name: 'Hackathon', date: '2023-11-10', participants: [], details: null }
        ];
        this.accessLog = [];
    }
  
    getEventDetails(id) {
        console.log(`[RealService] Fetching event ${id} from database...`);
        this.logAccess(`fetched event ${id}`);
        return this.findEvent(id);
    }
  
    addParticipant(eventId, userId) {
        console.log(`[RealService] Adding participant ${userId} to event ${eventId}`);
        const event = this.findEvent(eventId);
        if (event) {
            event.participants.push(userId);
            this.logAccess(`added participant ${userId} to event ${eventId}`);
            return true;
        }
        return false;
    }
  
    findEvent(id) {
        return this.events.find(event => event.id === id);
    }
  
    logAccess(action) {
        this.accessLog.push({
            timestamp: new Date(),
            action,
            user: 'system'
        });
    }
  
    getAccessLog() {
        return [...this.accessLog];
    }
}
  
class EventProxy {
    constructor(eventService) {
        this.eventService = eventService;
        this.cache = {};
        this.participantCache = {};
        this.accessControl = {
            bannedUsers: []
        };
    }
  
    getEventDetails(id, userId) {
        if (this.isUserBanned(userId)) {
            console.log(`Access denied for banned user ${userId}`);
            return null;
        }
  
        if (!this.cache[id]) {
            this.cache[id] = this.eventService.getEventDetails(id);
        }
        return { ...this.cache[id] };
    }
  
    addParticipant(eventId, userId) {
        if (this.isUserBanned(userId)) {
            console.log(`Cannot add banned user ${userId} to event`);
            return false;
        }
  
        // Проверяем, не зарегистрирован ли уже пользователь
        if (this.participantCache[eventId]?.includes(userId)) {
            console.log(`User ${userId} already registered for event ${eventId}`);
            return false;
        }
  
        const result = this.eventService.addParticipant(eventId, userId);
        if (result) {
            if (!this.participantCache[eventId]) {
            this.participantCache[eventId] = [];
            }
            this.participantCache[eventId].push(userId);
        }
        return result;
    }
  
    banUser(userId) {
        this.accessControl.bannedUsers.push(userId);
        console.log(`User ${userId} banned from events`);
    }
  
    unbanUser(userId) {
        this.accessControl.bannedUsers = this.accessControl.bannedUsers.filter(id => id !== userId);
        console.log(`User ${userId} unbanned`);
    }
  
    isUserBanned(userId) {
        return this.accessControl.bannedUsers.includes(userId);
    }
  
    clearCache() {
        this.cache = {};
        this.participantCache = {};
        console.log('Proxy cache cleared');
    }
}
  
// Использование:
const realService = new EventService();
const proxy = new EventProxy(realService);

// Получаем данные о событии (кэшируется)
console.log(proxy.getEventDetails(1, 101));
console.log(proxy.getEventDetails(1, 101)); // Из кэша

// Регистрируем участников
proxy.addParticipant(1, 101);
proxy.addParticipant(1, 102);
proxy.addParticipant(1, 101); // Уже зарегистрирован

// Бан пользователя
proxy.banUser(103);
proxy.addParticipant(1, 103); // Запрещено

// Доступ к оригинальному сервису
console.log(realService.events);
console.log(realService.getAccessLog());