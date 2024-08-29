class AddEmployee {

    getAddButton(){
        return cy.get("button[type='button']").contains("Add")
    }
    getFirstName() {
        return cy.get("input[name='firstName'")
    }

    getLastName() {
        return cy.get("input[name='lastName'")
    }

    getLoginDetailsToggleButton() {
        return cy.get("input[type='checkbox']")
    }

    getUsername(){
        return cy.get('label').contains("Username").parent().siblings('div').find('input')
    }
    getPassword(){
        return cy.get('label').contains("Password").parent().siblings('div').find('input')
    }

    getConfirmPassword(){
        return cy.get('label').contains("Confirm Password").parent().siblings('div').find('input')
    }

    getSaveButton(){
        return cy.get("button[type='submit']").contains("Save")
    }

    getToastMessage(){
        return cy.get('.oxd-text--toast-message')
    }
}

export default AddEmployee;