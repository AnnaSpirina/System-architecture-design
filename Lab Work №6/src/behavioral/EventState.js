class EventState {
    constructor(event) {
        this.event = event;
    }
    
    publish() {
        throw new Error('This method must be implemented');
    }
    
    cancel() {
        throw new Error('This method must be implemented');
    }
}
  
class DraftEventState extends EventState {
    publish() {
        console.log(`Publishing event: ${this.event.name}`);
        this.event.setState(new PublishedEventState(this.event));
        return true;
    }
    
    cancel() {
        console.log('Event is still in draft, no need to cancel');
        return false;
    }
}
  
class PublishedEventState extends EventState {
    publish() {
        console.log('Event is already published');
        return false;
    }
    
    cancel() {
        console.log(`Canceling event: ${this.event.name}`);
        this.event.setState(new CanceledEventState(this.event));
        this.event.notifySubscribers();
        return true;
    }
}
  
class CanceledEventState extends EventState {
    publish() {
        console.log('Cannot publish a canceled event');
        return false;
    }
    
    cancel() {
        console.log('Event is already canceled');
        return false;
    }
}
  
class Event {
    constructor(name) {
        this.name = name;
        this.state = new DraftEventState(this);
        this.subscribers = [];
    }
    
    setState(state) {
        this.state = state;
    }
    
    publish() {
        return this.state.publish();
    }
    
    cancel() {
        return this.state.cancel();
    }
    
    subscribe(student) {
        this.subscribers.push(student);
    }
    
    notifySubscribers() {
        this.subscribers.forEach(sub => 
            console.log(`Notifying ${sub.email} about cancellation of ${this.name}`));
    }
}
  
// Использование:
const event = new Event('Hackathon');
event.subscribe({ email: 'student1@hse.ru' });
event.subscribe({ email: 'student2@hse.ru' });

event.publish();
event.cancel();