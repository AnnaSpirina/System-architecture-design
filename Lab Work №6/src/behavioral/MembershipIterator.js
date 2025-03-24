class OrganizationMembers {
    constructor(members) {
        this.members = members;
    }
    
    [Symbol.iterator]() {
        let index = 0;
        const members = this.members;
        
        return {
            next() {
                if (index < members.length) {
                    return { value: members[index++], done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }
  }
  
// Использование:
const members = new OrganizationMembers([
    { name: 'Alice', role: 'leader' },
    { name: 'Bob', role: 'member' },
    { name: 'Charlie', role: 'member' }
]);
  
for (const member of members) {
    console.log(member);
}