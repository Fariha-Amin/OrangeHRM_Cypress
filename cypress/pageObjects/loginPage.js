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

export default LoginPage;