class EventInvitationCommand {
    constructor(event, student) {
        this.event = event;
        this.student = student;
    }
    
    execute() {
        console.log(`Sending invitation to ${this.student.email} for ${this.event.name}`);
        // Реальная логика отправки приглашения
        this.event.addParticipant(this.student);
        return true;
    }
    
    undo() {
        console.log(`Canceling invitation for ${this.student.email}`);
        this.event.removeParticipant(this.student);
    }
}
  
class EventInvitationManager {
    constructor() {
        this.history = [];
    }
    
    invoke(command) {
        if (command.execute()) {
            this.history.push(command);
        }
    }
    
    undo() {
        const command = this.history.pop();
        if (command) {
            command.undo();
        }
    }
}
  
// Использование:
const event = { 
    name: 'Workshop', 
    participants: [], 
    addParticipant: s => event.participants.push(s),
    removeParticipant: s => event.participants = event.participants.filter(p => p.email !== s.email)
};

const student = { email: 'student@edu.hse.ru' };

const manager = new EventInvitationManager();
const cmd = new EventInvitationCommand(event, student);

manager.invoke(cmd);
console.log(event.participants);
manager.undo();
console.log(event.participants);