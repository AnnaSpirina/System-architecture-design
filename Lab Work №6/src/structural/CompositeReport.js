class ReportComponent {
    constructor(name) {
        this.name = name;
    }
  
    generate() {
        throw new Error('This method must be implemented');
    }
  
    add(component) {
        throw new Error('This method must be implemented');
    }
  
    remove(component) {
        throw new Error('This method must be implemented');
    }
  
    getChild(index) {
        throw new Error('This method must be implemented');
    }
}
  
class EventReport extends ReportComponent {
    constructor(event) {
        super(`Event Report: ${event.name}`);
        this.event = event;
    }
  
    generate() {
        return {
            title: this.name,
            details: {
            date: this.event.date,
            participants: this.event.participants.length,
            location: this.event.location || 'Online'
            },
            type: 'event'
        };
    }
}
  
class FinancialReport extends ReportComponent {
    constructor(organization, income, expenses) {
        super(`Financial Report: ${organization.name}`);
        this.organization = organization;
        this.income = income;
        this.expenses = expenses;
    }
  
    generate() {
        return {
            title: this.name,
            details: {
            income: this.income,
            expenses: this.expenses,
            profit: this.income - this.expenses
            },
            type: 'financial'
        };
    }
}
  
class CompositeReport extends ReportComponent {
    constructor(name) {
        super(name);
        this.children = [];
    }
  
    add(component) {
        this.children.push(component);
    }
  
    remove(component) {
        const index = this.children.indexOf(component);
        if (index !== -1) {
            this.children.splice(index, 1);
        }
    }
  
    getChild(index) {
        return this.children[index];
    }
  
    generate() {
        return {
            title: this.name,
            reports: this.children.map(child => child.generate()),
            type: 'composite'
        };
    }

    filterByType(type) {
        return this.children.filter(child => {
            const report = child.generate();
            return report.type === type;
        });
    }
}
  
// Использование:
const codingClub = { name: 'Coding Club' };
  
// Создаем отчеты
const hackathonReport = new EventReport({
    name: 'Annual Hackathon',
    date: '2025-10-20',
    participants: [1, 2, 3, 4, 5],
    location: 'Building A'
});
  
const workshopReport = new EventReport({
    name: 'React Workshop',
    date: '2025-09-15',
    participants: [1, 2, 3],
    location: 'Online'
});
  
const financialReport = new FinancialReport(codingClub, 1500, 800);

// Создаем составной отчет
const annualReport = new CompositeReport('Annual Report 2025');
annualReport.add(hackathonReport);
annualReport.add(workshopReport);
annualReport.add(financialReport);

// Генерируем полный отчет
console.log(annualReport.generate());

// Фильтрация отчетов
const eventReports = annualReport.filterByType('event');
console.log('Event reports:', eventReports);

// Удаление отчета
annualReport.remove(workshopReport);
console.log('After removal:', annualReport.generate());