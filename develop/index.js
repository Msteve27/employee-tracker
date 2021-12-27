// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
// const generateMarkdown = require('./utils/generateMarkdown');

// TODO: Create an array of questions for user input
// Here are the questions: 
// What would you like to do?
// What is the name of the department?
// have te CLI console log "Added service to the database"
// What is the name of the role?
// What is the salary of the role?
// Which department does the role belong to?
// have te CLI console log "Added Customer Service to the database"
// What is the employee's first name?
// What is the employee's last name?
// What is the employee's role?
// Who is the employee's manager?
// have te CLI console log "something has been added to the db"
// Which employee's role do you want to update?

const questions = [
    {
        type: 'checkbox',
        name: 'overview',
        message: 'What would you like to do?',
        choices: [
            {name: 'view all departments'},
            {name: 'view all roles'},
            {name: 'view all employees'},
            {name: 'add a department'},
            {name: 'add a role'},
            {name: 'add an employee'},
            {name: 'update an employee role'},
        ]
    },
    {
        type: 'input',
        name: 'depertmentName',
        message:'What is the name of the department?',
    },
    {
        type:'input',
        name:'roleName',
        message:'What is the name of the role?',
    },
    {
        type:'input',
        name: 'roleSalary',
        message:'What is the salary of the role?',
    },
    {
        type:'input',
        name: 'roleDepartment',
        message:'Which department does the role belong to?',
    },
    {
        type:'input',
        name: 'eployeeName',
        message:"What is the employee's first name?",
    },
    {
        type:'input',
        name: 'eployeeLastName',
        message:"What is the employee's last name?",
    },
    {
        type:'input',
        name: 'employeeRole',
        message:"What is the employee's role?",
    },
    {
        type:'input',
        name: 'employeeManager',
        message:"Who is the employee's manager?",
    },
    {
        type: 'checkbox',
        name: 'license',
        message: "Which employee's role do you want to update?",
        choices: [
            {name: ''},
            {name: ''},
            {name: ''},
            {name: ''},
            {name: ''},
        ]
    },
]


// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    return fs.writeFile('./dist/README.md', data, (err) => {
        if (err) {
            throw Error(err)
        }
    })
}

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions)
        .then(answers => {
            const markDown = generateMarkdown(answers)
            writeToFile('README.md', markDown)
        })
}
// Function call to initialize app
init();