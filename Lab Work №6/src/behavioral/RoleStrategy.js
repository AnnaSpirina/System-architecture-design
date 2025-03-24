class RoleStrategy {
    getPermissions() {
        throw new Error('This method must be implemented');
    }
}
  
class StudentStrategy extends RoleStrategy {
    getPermissions() {
        return ['view_organizations', 'subscribe', 'register_for_events'];
    }
}
  
class AdminStrategy extends RoleStrategy {
    getPermissions() {
        return ['manage_organizations', 'view_reports', 'manage_users'];
    }
}
  
class UserContext {
    constructor(strategy) {
        this.strategy = strategy;
    }
    
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    
    getPermissions() {
        return this.strategy.getPermissions();
    }
}
  
// Использование:
const studentContext = new UserContext(new StudentStrategy());
console.log(studentContext.getPermissions());

const adminContext = new UserContext(new AdminStrategy());
console.log(adminContext.getPermissions());