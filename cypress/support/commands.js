/// <reference types="cypress" />
import LoginPage from "../pageObjects/loginpage";

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

Cypress.Commands.add('login', (values) => {

  cy.log(values)
  const loginPage = new LoginPage()
  loginPage.getLoginUsername().type(values.username);
  loginPage.getLoginPassword().type(values.password);
  loginPage.getLoginButton().click({ force: true });


})

Cypress.Commands.add("waitTillElementIsVisible", (selector, timeout = 10000) => {
  cy.get(selector, { timeout }).should("be.visible")
});