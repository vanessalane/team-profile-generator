const Employee = require('./Employee');

class Engineer extends Employee {
    constructor(name, email, id, github) {
        super(name, email, id, 'Engineer');
        this.github = github;
    }
}

module.exports = Engineer;