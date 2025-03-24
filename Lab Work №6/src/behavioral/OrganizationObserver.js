class OrganizationSubject {
    constructor() {
        this.observers = [];
    }
    
    subscribe(observer) {
        this.observers.push(observer);
    }
    
    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }
    
    notify(data) {
        this.observers.forEach(observer => observer.update(data));
    }
}
  
class StudentObserver {
    constructor(name) {
        this.name = name;
    }
    
    update(event) {
        console.log(`${this.name} received notification about: ${event.name}`);
    }
}
  
// Использование:
const organization = new OrganizationSubject();
const student1 = new StudentObserver('Ivan');
const student2 = new StudentObserver('Petr');

organization.subscribe(student1);
organization.subscribe(student2);

organization.notify({ name: 'New event: Hackathon' });