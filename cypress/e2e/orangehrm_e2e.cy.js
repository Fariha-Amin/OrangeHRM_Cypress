const { faker } = require('@faker-js/faker');
import MainMenu from '../pageObjects/mainMenu';
import AddEmployee from '../pageObjects/addEmployee';
import Directory from '../pageObjects/directory';
import UserMenu from '../pageObjects/userMenu';

describe('OrangeHRM End to End Testing', () => {

  let adminCredentials;
  let lastUrl;
  let adminUser = true;
  let newEmployeeCredentials;
  const employeeDataFile = "employeeData.json";
  const credentialsFile = "values.json";

  function generatePassword() {
    const upperCase = faker.internet.password(3, false, /[A-Z]/);
    const lowerCase = faker.internet.password(3, false, /[a-z]/);
    const numbers = faker.internet.password(3, false, /[0-9]/);
    const symbols = faker.internet.password(1, false, /[\W_]/);
    return upperCase + lowerCase + numbers + symbols;
  }

  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const username = firstName + lastName;
  const fullName = firstName + " " + lastName;
  const password = generatePassword();


  before(() => {
    // Load admin credentials
    cy.fixture("values").then((loadedValues) => {
      adminCredentials = loadedValues;
    });
  });

  beforeEach(() => {
    if (adminUser) {
      Cypress.config('pageLoadTimeout', 10000);
      cy.session('Login as Admin', () => {
        cy.visit('/');
        cy.title().should("eq", "OrangeHRM");
        cy.login(adminCredentials);
      });
    } else if (!adminUser) {
      cy.fixture(employeeDataFile).then((employee) => {
        newEmployeeCredentials = {
          username: employee.username,
          password: employee.password
        };
        cy.session('Login as New Employee', () => {
          cy.visit('/');
          cy.login(newEmployeeCredentials);
        });

      });
    }
  });


  it('Creating a New Employee', () => {
    const mainMenu = new MainMenu();
    const addEmployee = new AddEmployee();

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
    addEmployee.getEmployeeId().invoke('val').then(employeeId => {
      cy.writeFile(`cypress/fixtures/${employeeDataFile}`, {
        username,
        password,
        employeeId
      });

    })
    addEmployee.getSaveButton().click({ force: true });
    addEmployee.getToastMessage().should("have.text", "Successfully Saved");
    cy.waitTillElementIsVisible('h6');
    cy.get('h6').should("contain.text", fullName);

  });

  /*it('Search by Employee ID', () => {
    const mainMenu = new MainMenu();
    const addEmployee = new AddEmployee();
    cy.visit(lastUrl)
    mainMenu.getPIM().click()
    cy.waitTillElementIsVisible('h6');
    cy.get('h6').should("contain.text", 'PIM');

    cy.fixture(employeeDataFile).then((employee) => {
      addEmployee.getEmployeeId().type(employee.employeeId)
      addEmployee.getSearchEmployeeButton().click({ force: true })
      addEmployee.getTableCell().contains(employee.employeeId).should('be.visible')
    })
  })

  it('Search in Directory by Employee Name', () => {
    cy.visit(lastUrl)
    const mainMenu = new MainMenu();
    const directory = new Directory();
    mainMenu.getDirectory().click()
    cy.waitTillElementIsVisible('h6');
    cy.get('h6').should("contain.text", 'Directory');

    cy.fixture(employeeDataFile).then((employee) => {
    directory.getEmployeeNameField().type(firstName)
    directory.getAutoCompleteDropdown().click()
    directory.getSearchButton().click()
    directory.getEmployeeCardHeader()
    .invoke('text')
    .then((text) => {
      const normalizedText = text.replace(/\s+/g, ' ').trim(); 
      expect(normalizedText).to.eq(fullName);
    });

    })

    
  })*/

  it('Logout', () => {

    cy.visit(lastUrl)
    const userMenu = new UserMenu()
    userMenu.getUserMenu().click({ force: true })
    userMenu.getLogoutOption().click({ force: true })
    adminUser = false;
    cy.clearCookies();
    cy.clearLocalStorage();
  })

  it('Login with New Employee Credentials', () => {
    cy.visit('/');
    const userMenu = new UserMenu()
    cy.waitTillElementIsVisible('h6');
    cy.get('h6').should("have.text", "Dashboard");
    userMenu.getUserNameText().should('contain.text',fullName)
    
  });



  afterEach(() => {
    cy.url().then((url) => {
      lastUrl = url;
    })
  })
  after(() => {
    // Cleanup code if needed
  });
});