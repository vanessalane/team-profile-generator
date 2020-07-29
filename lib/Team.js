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

    getEmployeePrompts(employeeType) {

        // define prompts for all employees
        const prompts = [
            {
                type: 'text',
                name: 'name',
                message: "What's their name?",
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } 
                    else {
                        return 'Please enter a name.';
                    }
                }
            },
            {
                type: 'text',
                name: 'email',
                message: "What's their email?",
                validate: emailInput => {
                    if (!emailInput) {
                        return 'Please enter an email';
                    }
                    else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput)) {
                        return true;
                    } else {
                        return 'Please enter a valid email address.';
                    }
                }
            },
            {
                type: 'text',
                name: 'id',
                message: "What's their employee ID?",
                validate: idInput => {
                    if (idInput) {
                        return true;
                    } 
                    else {
                        return 'Please enter an employee ID.';
                    }
                }
            }
        ]

        // define prompts for specific employee types
        const typeSpecificPrompts = {
            'engineer': {
                type: 'text',
                name: 'github',
                message: "What's their github username?",
                validate: githubInput => {
                    if (githubInput) {
                        return true;
                    } 
                    else {
                        return 'Please enter a github username.';
                    }
                }
            },
           'intern': {
                type: 'text',
                name: 'school',
                message: "What school do they attend?",
                validate: schoolInput => {
                    if (schoolInput) {
                        return true;
                    } 
                    else {
                        return 'Please enter a school.';
                    }
                }
            },
            'manager': {
                type: 'text',
                name: 'office',
                message: "What's their office number?",
                validate: officeNumberInput => {
                    if (officeNumberInput) {
                        return true;
                    }
                    else {
                        return 'Please specify an office number.';
                    }
                }
            }
        };

        // add the specific prompt to the prompts that should be used for this type of employee
        prompts.push(typeSpecificPrompts[employeeType]);
        return prompts;
    }

    createEmployee(employeeType, employeeDetails) {

        // get the shared attributes
        const name = employeeDetails.name;
        const email = employeeDetails.email;
        const id = employeeDetails.id;

        // create the relevant object and store it on the team.
        switch(employeeType){
            case 'engineer':
                const github = employeeDetails.github;
                const engineer = new Engineer(name, email, id, github);
                this.engineers.push(engineer);
                break;
            case 'manager':
                const office = employeeDetails.office;
                this.manager = new Manager(name, email, id, office);
                break;
            case 'intern':
                const school = employeeDetails.school;
                const intern = new Intern(name, email, id, school);
                this.interns.push(intern);
                break;
            default:
                break;
        }
        console.log(`
  The ${employeeType} ${name} was added to the team!
        `)
    }

    promptForEmployee() {
        return inquirer
            // get the type of employee
            .prompt({
                type: 'list',
                message: 'What would you like to do next?',
                name: 'nextAction',
                choices: ['Add an engineer', 'Add an intern', 'Finish building my team']
            })
            // ask for information about the employee
            .then(({nextAction}) => {
                if (nextAction === 'Finish building my team') {
                    console.log('Generate HTML');
                } else {
                    const employeeType = nextAction.replace('Add an ', '');
                    console.log(`
  Got it. Let's add an ${employeeType}.
  `)
                    inquirer
                        .prompt(this.getEmployeePrompts(employeeType))
                        .then((answers) => {this.createEmployee(employeeType, answers)})
                        .then(() => {
                            this.promptForEmployee();
                        });
                }
            })
    }

    buildTeam() {
        console.log(`
        ----------- Let's build a team! -----------
        `);
        console.log(`  We'll start with the manager.
        `)
        inquirer
            // get info about the employee, then create them
            .prompt(this.getEmployeePrompts('manager'))
            .then((answers) => {this.createEmployee('manager', answers)})
            .then(() => {
                this.promptForEmployee();
            });
    }
}

module.exports = Team;
