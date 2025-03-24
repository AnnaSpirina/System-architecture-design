class Organization {
    constructor(name) {
        this.name = name;
        this.basicInfo = {
            createdAt: new Date(),
            status: 'pending'
        };
    }
  
    getInfo() {
        return {
            name: this.name,
            ...this.basicInfo
        };
    }
  
    approve() {
        this.basicInfo.status = 'approved';
        console.log(`${this.name} has been approved`);
    }
}
  
class OrganizationDecorator {
    constructor(organization) {
        this.organization = organization;
    }
  
    getInfo() {
        return this.organization.getInfo();
    }
  
    approve() {
        this.organization.approve();
    }
}
  
class VerifiedOrganizationDecorator extends OrganizationDecorator {
    constructor(organization, verifiedBy) {
        super(organization);
        this.verifiedBy = verifiedBy;
        this.verificationDate = new Date();
    }
  
    getInfo() {
        const info = super.getInfo();
        return {
            ...info,
            isVerified: true,
            verifiedBy: this.verifiedBy,
            verificationDate: this.verificationDate
        };
    }
}
  
class PopularOrganizationDecorator extends OrganizationDecorator {
    constructor(organization, membersCount) {
        super(organization);
        this.membersCount = membersCount;
        }
  
    getInfo() {
        const info = super.getInfo();
        return {
            ...info,
            membersCount: this.membersCount,
            isPopular: this.membersCount > 100
        };
    }
}
  
class AwardedOrganizationDecorator extends OrganizationDecorator {
    constructor(organization, awards) {
        super(organization);
        this.awards = awards;
    }
  
    getInfo() {
        const info = super.getInfo();
        return {
            ...info,
            awards: this.awards,
            hasAwards: this.awards.length > 0
        };
    }
  
    addAward(award) {
        this.awards.push(award);
        console.log(`Award "${award}" added to ${this.organization.name}`);
    }
}
  
// Использование:
const basicOrg = new Organization('Dance Club');

// Простое декорирование
const verifiedOrg = new VerifiedOrganizationDecorator(basicOrg, 'admin@hse.edu.ru');
console.log(verifiedOrg.getInfo());

// Цепочка декораторов
const popularOrg = new PopularOrganizationDecorator(basicOrg, 150);
const awardedOrg = new AwardedOrganizationDecorator(popularOrg, ['Best New Club 2022']);
const fullyDecoratedOrg = new VerifiedOrganizationDecorator(awardedOrg, 'admin@hse.edu.ru');

console.log(fullyDecoratedOrg.getInfo());

// Использование методов
fullyDecoratedOrg.approve();
fullyDecoratedOrg.addAward('Most Active Club 2023');

// Получение информации после изменений
console.log(fullyDecoratedOrg.getInfo());