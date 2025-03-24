class UserFactory {
    createUser(role, data) {
      const user = this.getUser(role, data);
      user.setPermissions();
      user.setDefaultSettings();
      return user;
    }
    
    getUser(role, data) {
        switch (role) {
            case 'student':
                return new Student(data);
            case 'admin':
                return new Admin(data);
            case 'manager':
                return new ContentManager(data);
            case 'leader':
                return new OrganizationLeader(data);
            case 'deputy':
                return new DeputyLeader(data);
            default:
                throw new Error('Invalid user role');
        }
    }
}
  
class User {
    constructor({ firstName, lastName, email, phone }) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone || '';
        this.role = 'user';
        this.permissions = [];
        this.isActive = true;
    }
    
    setPermissions() {
        // Базовые разрешения для всех пользователей
        this.permissions.push('view_profile');
    }
    
    setDefaultSettings() {
        this.settings = {
            notifications: true,
            theme: 'light'
        };
    }
    
    deactivate() {
        this.isActive = false;
        console.log(`User ${this.email} deactivated`);
    }
}
  
class Student extends User {
    constructor(data) {
        super(data);
        this.role = 'student';
        this.subscriptions = [];
        this.registeredEvents = [];
    }
    
    setPermissions() {
        super.setPermissions();
        this.permissions.push(
            'view_organizations',
            'subscribe',
            'register_for_events'
        );
    }
    
    subscribeToOrganization(orgId) {
        this.subscriptions.push(orgId);
    }
}
  
  class Admin extends User {
    constructor(data) {
        super(data);
        this.role = 'admin';
        this.accessLevel = 'full';
    }
    
    setPermissions() {
        super.setPermissions();
        this.permissions.push(
            'manage_organizations',
            'view_reports',
            'manage_users',
            'edit_all_content'
        );
    }
}
  
class ContentManager extends User {
    constructor(data) {
        super(data);
        this.role = 'manager';
        this.managedOrganizations = [];
    }
    
    setPermissions() {
        super.setPermissions();
        this.permissions.push(
            'create_posts',
            'manage_events',
            'edit_organization_content'
        );
    }
    
    addManagedOrganization(orgId) {
      this.managedOrganizations.push(orgId);
    }
}
  
class OrganizationLeader extends User {
    constructor(data) {
        super(data);
        this.role = 'leader';
        this.leadOrganizations = [];
    }
    
    setPermissions() {
        super.setPermissions();
        this.permissions.push(
            'manage_team',
            'view_organization_stats',
            'generate_qr_codes'
        );
    }
    
    addLeadOrganization(orgId) {
        this.leadOrganizations.push(orgId);
    }
  }
  
class DeputyLeader extends User {
    constructor(data) {
        super(data);
        this.role = 'deputy';
        this.deputyForOrganizations = [];
    }
    
    setPermissions() {
        super.setPermissions();
        this.permissions.push(
            'manage_team',
            'view_organization_stats'
        );
    }
    
    addDeputyOrganization(orgId) {
        this.deputyForOrganizations.push(orgId);
    }
}
  
// Использование:
const userFactory = new UserFactory();
  
const student = userFactory.createUser('student', {
    firstName: 'Ivan',
    lastName: 'Ivanov',
    email: 'ivanov@hse.edu.ru'
});
  
const admin = userFactory.createUser('admin', {
    firstName: 'Petr',
    lastName: 'Petrov',
    email: 'petrov@hse.edu.ru',
    phone: '+123456789'
});
  
const contentManager = userFactory.createUser('manager', {
    firstName: 'Kirill',
    lastName: 'Kirillov',
    email: 'kirillov@hse.edu.ru'
});
  
console.log(student);
console.log(admin);
console.log(contentManager);

// Пример использования созданных объектов
student.subscribeToOrganization(1);
admin.deactivate();
contentManager.addManagedOrganization(2);