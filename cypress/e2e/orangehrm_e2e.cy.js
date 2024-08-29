const { faker } = require('@faker-js/faker');
import MainMenu from '../pageObjects/mainMenu';
import AddEmployee from '../pageObjects/addEmployee';

describe('OrangeHRM End to End Testing', () => {

  let adminCredentials;
  const employeeDataFile = "employeeData.json";

  function generatePassword() {
    const upperCase = faker.internet.password(3, false, /[A-Z]/);
    const lowerCase = faker.internet.password(3, false, /[a-z]/);
    const numbers = faker.internet.password(3, false, /[0-9]/);
    const symbols = faker.internet.password(1, false, /[\W_]/);
    return upperCase + lowerCase + numbers + symbols;
  }

  before(() => {
    // Load admin credentials
    cy.fixture("values").then((loadedValues) => {
      adminCredentials = loadedValues;
    });
  });

  beforeEach(() => {
    // Set page load timeout and login
    Cypress.config('pageLoadTimeout', 10000);
    cy.session('Login as Admin', () => {
      cy.visit('/');
      //cy.title().should("eq", "OrangeHRM");
      cy.login(adminCredentials);
    });
  });

  it('Creating a New Employee', () => {
    const mainMenu = new MainMenu();
    const addEmployee = new AddEmployee();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const username = firstName + lastName;
    const fullName = firstName + " " + lastName;
    const password = generatePassword();

    cy.visit('/');
    cy.waitTillElementIsVisible('h6');
    cy.get('h6').should("have.text", "Dashboard");
    mainMenu.getPIM().click();
    addEmployee.getAddButton().click();
    addEmployee.getFirstName().type(firstName);
    addEmployee.getLastName().type(lastName);
    addEmployee.getLoginDetailsToggleButton().click({ force: true });
    addEmployee.getUsername().type(username);
    addEmployee.getPassword().type(password);
    addEmployee.getConfirmPassword().type(password);
    addEmployee.getSaveButton().click({ force: true });
    addEmployee.getToastMessage().should("have.text", "Successfully Saved");
    cy.waitTillElementIsVisible('h6');
    cy.get('h6').should("contain.text", fullName);

    // Save employee data to a file
    cy.writeFile(`cypress/fixtures/${employeeDataFile}`, {
      username,
      password
    });
  });

  after(() => {
    // Cleanup code if needed
  });
});
