class MainMenu {

    getPIM() {
        return cy.get(".oxd-main-menu").find('span').contains('PIM')
    }

    getDirectory() {
        return cy.get(".oxd-main-menu").find('span').contains('Directory')
    }

    getDashboard() {
        return cy.get(".oxd-main-menu").find('span').contains('Dashboard')
    }
}

export default MainMenu;