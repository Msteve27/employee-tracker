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
        type: 'input',
        name: 'title',
        message:'What is the title of your project? (required)',
        validate: titleInput => {
            if (titleInput) {
                return true;
            } else {
                console.log('Please enter your project title.');
                return false;
            }
        }
    },
    {
        type:'input',
        name:'description',
        message:'Give a description of your project: (required)',
        validate: descriptionInput => {
            if (descriptionInput) {
                return true;
            } else {
                console.log('Please enter a description of your project.');
                return false;
            }
        }
    },
    {
        type:'input',
        name: 'installation',
        message:'What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running. (required)',
        validate: installationInput => {
            if (installationInput) {
                return true;
            } else {
                console.log('Please enter installation instructions for your project.');
                return false;
            }
        }
    },
    {
        type:'input',
        name: 'screenshot',
        message:'Please upload screenshot to the images folder and copy relative path here. (required)',
        validate: screenshotInput => {
            if (screenshotInput) {
                return true;
            } else {
                console.log('Please enter a path to the screenshot.');
                return false;
            }
        }
    },
    {
        type: 'checkbox',
        name: 'license',
        message: 'Please select a license',
        choices: [
            {name: 'MIT'},
            {name: 'Apache'},
            {name: 'BSD'},
            {name: 'GNU'},
            {name: 'ISC'},
        ]
    },
    {
        type:'input',
        name: 'username',
        message:'What is your GitHub username?(required)',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('Please enter your GitHub username.');
                return false;
            }
        }
    },
    {
        type:'input',
        name: 'email',
        message:'What is your email?(required)',
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                console.log('Please enter your email.');
                return false;
            }
    
      }
    },
    {
        type: 'confirm',
        name: 'confirmContributors',
        message:'Did anyone else contribute to this project?',
        default: false
    },
    {
        type: 'input',
        name: 'contributors',
        message:'List the GitHub profile links to all contributors on this project',
        when: ({confirmContributors}) => confirmContributors
    },
    {
        type: 'confirm',
        name: 'confirmTests',
        message:'Do you have any tests written for this project?',
        default: false
    },
    {
        type: 'input',
        name: 'tests',
        message:'Go the extra mile and write tests for your application. Then provide examples on how to run them.',
        when: ({confirmTests}) => confirmTests
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