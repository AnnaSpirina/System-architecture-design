class LegacyOrganizationService {
    constructor() {
        this.legacyOrganizations = [
            {
            org_id: 1,
            org_name: 'Old Coding Club',
            org_desc: 'Programming since 2005',
            org_logo_url: '/legacy/logos/coding.png',
            org_members: 15,
            org_status: 'A'
            }
        ];
    }
  
    getLegacyOrganizationById(id) {
        return this.legacyOrganizations.find(org => org.org_id === id) || null;
    }
  
    getAllLegacyOrganizations() {
        return [...this.legacyOrganizations];
    }
}
  
class ModernOrganization {
    constructor({ id, name, description, logo, membersCount, status }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.logo = logo;
        this.membersCount = membersCount;
        this.status = status === 'A' ? 'active' : 'inactive';
        this.events = [];
    }
  
    addEvent(event) {
        this.events.push(event);
    }
  
    getInfo() {
        return `${this.name} (${this.membersCount} members) - ${this.status}`;
    }
}
  
class OrganizationAdapter {
    constructor(legacyService) {
        this.legacyService = legacyService;
    }
  
    getOrganizationById(id) {
        const legacyOrg = this.legacyService.getLegacyOrganizationById(id);
        if (!legacyOrg) return null;
    
        return new ModernOrganization({
            id: legacyOrg.org_id,
            name: legacyOrg.org_name,
            description: legacyOrg.org_desc,
            logo: legacyOrg.org_logo_url,
            membersCount: legacyOrg.org_members,
            status: legacyOrg.org_status
        });
    }
  
    getAllOrganizations() {
        return this.legacyService.getAllLegacyOrganizations().map(legacyOrg => 
            new ModernOrganization({
            id: legacyOrg.org_id,
            name: legacyOrg.org_name,
            description: legacyOrg.org_desc,
            logo: legacyOrg.org_logo_url,
            membersCount: legacyOrg.org_members,
            status: legacyOrg.org_status
            })
        );
    }
  
    convertToLegacyFormat(modernOrg) {
        return {
            org_id: modernOrg.id,
            org_name: modernOrg.name,
            org_desc: modernOrg.description,
            org_logo_url: modernOrg.logo,
            org_members: modernOrg.membersCount,
            org_status: modernOrg.status === 'active' ? 'A' : 'I'
        };
    }
}
  
// Использование:
const legacyService = new LegacyOrganizationService();
const adapter = new OrganizationAdapter(legacyService);

// Получение современного объекта из старой системы
const modernOrg = adapter.getOrganizationById(1);
console.log(modernOrg.getInfo());
modernOrg.addEvent({ name: 'Hackathon', date: '2025-10-15' });
console.log(modernOrg);

// Конвертация обратно в legacy формат
const legacyFormat = adapter.convertToLegacyFormat(modernOrg);
console.log(legacyFormat);

// Получение всех организаций
const allOrgs = adapter.getAllOrganizations();
console.log(allOrgs);