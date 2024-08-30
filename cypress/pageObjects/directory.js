class Directory {

    getEmployeeNameField(){
        return cy.get('label').contains("Employee Name").parent().siblings('div').find('input')
    }
    getSearchButton() {
        return cy.get("[type='submit']").contains('Search');
    }
    getAutoCompleteDropdown(){
         return cy.get('.oxd-autocomplete-option > span');
    }

    getEmployeeCardHeader(){

        return cy.get(".orangehrm-directory-card-header");
    }
}

export default Directory;