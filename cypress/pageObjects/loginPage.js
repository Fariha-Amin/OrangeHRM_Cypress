class LoginPage {

    getLoginUsername() {
        return cy.get("input[name='username']");
    }

    getLoginPassword() {
        return cy.get("input[name='password'");
    }

    getLoginButton() {
        return cy.get("[type='submit']");
    }
}
cy.get(".oxd-main-menu").find('span').contains('PIM')
export default LoginPage;