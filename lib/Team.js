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
            'Engineer': {
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
           'Intern': {
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
            'Manager': {
                type: 'text',
                name: 'office',
                message: "Which office is theirs?",
                validate: officeNumberInput => {
                    if (officeNumberInput) {
                        return true;
                    }
                    else {
                        return 'Please specify an office.';
                    }
                }
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
                break;
            case 'Manager':
                const office = employeeDetails.office;
                this.manager = new Manager(name, email, id, office);
                break;
            case 'Intern':
                const school = employeeDetails.school;
                const intern = new Intern(name, email, id, school);
                this.interns.push(intern);
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
                choices: this.manager ? ['Engineer', 'Intern'] : ['Engineer', 'Intern', 'Manager']  // if there's no manager defined, prompt the user.
            })
            // ask for information about the employee
            .then(({type}) => {
                console.log(`  Got it. Tell me about the ${type}!
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
        ----------- Let's build a team! -----------
        `);
        console.log(`  We'll start with the manager.
        `)
        inquirer
            // get info about the employee, then create them
            .prompt(this.getEmployeePrompts('Manager'))
            .then((answers) => {this.createEmployee('Manager', answers)})
            .then(() => {
                console.log(`  Now let's add some team members.
                `)
                this.promptForEmployee();
            });
    }
}

module.exports = Team;

