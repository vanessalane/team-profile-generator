const inquirer = require('inquirer');
const Manager = require('./Manager');
const Engineer = require('./Engineer');
const Intern = require('./Intern');

class Team {
    constructor() {
        this.manager;
        this.engineers = [];
        this.interns = [];
    }

    getEmployeePrompts(type) {

        // define prompts for all employees
        const prompts = [
            {
                type: 'text',
                name: 'name',
                message: "What's their name?"
            },
            {
                type: 'text',
                name: 'email',
                message: "What's their email?"
            },
            {
                type: 'text',
                name: 'id',
                message: "What's their employee ID?"
            }
        ]

        // define prompts for specific employee types
        const typeSpecificPrompts = {
            'Engineer': {
                type: 'text',
                name: 'github',
                message: "What's their github username?"
            },
           'Intern': {
                type: 'text',
                name: 'school',
                message: "What school do they attend?"
            },
            'Manager': {
                type: 'text',
                name: 'office',
                message: "What's the manager's office?"
            }
        };

        // add the specific prompt to the prompts that should be used for this type of employee
        prompts.push(typeSpecificPrompts[type]);
        return prompts;
    }

    createEmployee(type, employeeDetails) {

        // get the shared attributes
        const name = employeeDetails.name;
        const email = employeeDetails.email;
        const id = employeeDetails.id;

        // create the relevant object and store it on the team.
        switch(type){
            case 'Engineer':
                const github = employeeDetails.github;
                const engineer = new Engineer(name, email, id, github);
                this.engineers.push(engineer);
                console.log(`
                Added ${engineer.name}, an engineer, to the team!
                `);
                break;
            case 'Manager':
                const office = employeeDetails.office;
                this.manager = new Manager(name, email, id, office);
                console.log(`
                Added ${this.manager.name}, the manager, to the team!
                `);
                break;
            case 'Intern':
                const school = employeeDetails.school;
                const intern = new Intern(name, email, id, school);
                this.interns.push(intern);
                console.log(`
                Added ${intern.name}, an intern, to the team!
                `);
                break;
            default:
                break;
        }
    }

    promptForEmployee() {
        return inquirer
            // get the type of employee
            .prompt({
                type: 'list',
                message: 'What type of employee would you like to add?',
                name: 'type',
                choices: this.manager ? ['Engineer', 'Intern'] : ['Engineer', 'Intern', 'Manager']  // if there's a manager defined, don't let the user add one
            })
            // ask for information about the employee
            .then(({type}) => {
                console.log(`
                Got it. Tell me about the ${type}!
                `)
                inquirer
                    // get info about the employee, then create them
                    .prompt(this.getEmployeePrompts(type))
                    .then((answers) => {this.createEmployee(type, answers)})
                    .then(() => {
                        // see if they want to add another employee
                        inquirer
                            .prompt({
                                type: 'confirm',
                                name: 'addAnotherEmployee',
                                message: 'Would you like to add another person?',
                                default: true
                            })
                            // continue adding employees or create the HTML
                            .then(({addAnotherEmployee}) => {
                                if (addAnotherEmployee) {
                                    this.promptForEmployee();
                                } else {
                                    console.log("Generate the HTML");
                                }
                            })
                    });
            })
    }

    buildTeam() {
        console.log(`
        ===================
        Let's build a team!
        ===================
        `);
        this.promptForEmployee()
    }
}

module.exports = Team;

