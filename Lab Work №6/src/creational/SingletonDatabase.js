class Database {
    constructor() {
        if (Database.instance) {
            return Database.instance;
        }
      
        this.organizations = [];
        this.users = [];
        this.events = [];
        this.posts = [];
        this.statistics = {
            userCount: 0,
            eventCount: 0,
            organizationCount: 0
        };
      
        Database.instance = this;
    }
    
    addOrganization(org) {
        this.organizations.push(org);
        this.statistics.organizationCount++;
        console.log(`Organization ${org.name} added to database`);
    }
    
    addUser(user) {
        this.users.push(user);
        this.statistics.userCount++;
        console.log(`User ${user.email} added to database`);
    }
    
    addEvent(event) {
        this.events.push(event);
        this.statistics.eventCount++;
        console.log(`Event ${event.name} added to database`);
    }
    
    findUserByEmail(email) {
        return this.users.find(user => user.email === email);
    }
    
    findOrganizationByName(name) {
        return this.organizations.find(org => org.name === name);
    }
    
    getStatistics() {
        return { ...this.statistics };
    }
    
    // Метод для тестирования - очистка базы данных
    clearDatabase() {
        this.organizations = [];
        this.users = [];
        this.events = [];
        this.posts = [];
        this.statistics = {
            userCount: 0,
            eventCount: 0,
            organizationCount: 0
        };
    }
}
  
// Расширение функциональности через замыкание
const enhancedDatabase = (function() {
    const instance = new Database();
    
    // Дополнительные методы
    instance.backup = function() {
        return {
            organizations: [...this.organizations],
            users: [...this.users],
            events: [...this.events],
            posts: [...this.posts],
            statistics: { ...this.statistics }
        };
    };
    
    instance.restore = function(backup) {
        this.organizations = [...backup.organizations];
        this.users = [...backup.users];
        this.events = [...backup.events];
        this.posts = [...backup.posts];
        this.statistics = { ...backup.statistics };
    };
    
    return instance;
})();
  
// Использование:
const db1 = new Database();
const db2 = new Database();

console.log(db1 === db2); // true

// Работа с базой данных
db1.addUser({
    firstName: 'Ivan',
    lastName: 'Ivanov',
    email: 'ivanov@edu.hse.ru',
    role: 'student'
});
  
db1.addOrganization({
    name: 'Coding Club',
    description: 'Programming club',
    type: 'academic'
});
  
console.log(db2.findUserByEmail('ivanov@edu.hse.ru')); // Найдет пользователя
console.log(db1.getStatistics());

// Использование расширенной версии
const backup = enhancedDatabase.backup();
enhancedDatabase.clearDatabase();
console.log(enhancedDatabase.getStatistics()); // Все счетчики 0
enhancedDatabase.restore(backup);
console.log(enhancedDatabase.getStatistics()); // Данные восстановлены