class OrganizationFactory {
    createOrganization(type, data) {
      let organization;
      switch (type) {
        case 'academic':
          organization = new AcademicOrganization(data);
          break;
        case 'sport':
          organization = new SportOrganization(data);
          break;
        case 'cultural':
          organization = new CulturalOrganization(data);
          break;
        case 'volunteer':
          organization = new VolunteerOrganization(data);
          break;
        default:
          organization = new Organization(data);
      }
      
      organization.type = type;
      organization.register();
      organization.initialize();
      return organization;
    }
}
  
class Organization {
    constructor({ name, description, logo }) {
      this.name = name;
      this.description = description;
      this.logo = logo;
      this.members = [];
      this.events = [];
      this.status = 'active';
    }
    
    register() {
      console.log(`Organization ${this.name} registered`);
    }
    
    initialize() {
      console.log(`Initializing ${this.name} organization`);
      this.createdAt = new Date();
    }
    
    addMember(user) {
      this.members.push(user);
    }
}
  
class AcademicOrganization extends Organization {
    constructor(data) {
      super(data);
      this.category = 'academic';
      this.faculty = data.faculty || 'General';
    }
    
    initialize() {
      super.initialize();
      console.log(`Academic organization for ${this.faculty} faculty`);
    }
}
  
class SportOrganization extends Organization {
    constructor(data) {
      super(data);
      this.category = 'sport';
      this.sportType = data.sportType || 'General';
    }
    
    initialize() {
      super.initialize();
      console.log(`Sport organization for ${this.sportType}`);
    }
}
  
class CulturalOrganization extends Organization {
    constructor(data) {
      super(data);
      this.category = 'cultural';
      this.artType = data.artType || 'General';
    }
    
    initialize() {
      super.initialize();
      console.log(`Cultural organization for ${this.artType}`);
    }
}
  
class VolunteerOrganization extends Organization {
    constructor(data) {
      super(data);
      this.category = 'volunteer';
      this.volunteerField = data.volunteerField || 'General';
    }
    
    initialize() {
      super.initialize();
      console.log(`Volunteer organization for ${this.volunteerField}`);
    }
}
  
// Использование:
const factory = new OrganizationFactory();
  
const codingClub = factory.createOrganization('academic', {
    name: 'Coding Club',
    description: 'Programming and algorithms',
    logo: 'coding.png',
    faculty: 'Computer Science'
});
  
const basketballTeam = factory.createOrganization('sport', {
    name: 'Basketball Team',
    description: 'University basketball team',
    logo: 'basketball.png',
    sportType: 'Basketball'
});
  
console.log(codingClub);
console.log(basketballTeam);