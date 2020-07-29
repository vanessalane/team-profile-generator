const Employee = require('./Employee');

class Manager extends Employee {
    constructor(name, email, id, office) {
        super(name, email, id, 'Manager');
        this.office = office;
    }
}

module.exports = Manager;