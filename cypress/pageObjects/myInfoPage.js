class MyInfo {

    getFemaleGenderRadioButton() {

        return cy.get('label').contains("Female").find("input[type='radio']");
    }

    getBloodGroupDropdown() {

        return cy.get("label").contains('Blood Type').parent('div').siblings('div').find(".oxd-select-text--arrow")
    }

    SelectBloodGroup(group) {
        return cy.get("div[role='listbox']").contains(group)
    }

    getPersonalDetailsSaveButton() {

        return cy.get("h6").contains('Personal Details').parent('div').find("button[type='submit']")
    }

    getCustomDetailsSaveButton() {

        return cy.get("h6").contains('Custom Fields').parent('div').find("button[type='submit']")
    }

    getSuccessToastMessage() {

        return cy.get('.oxd-text--toast-message')
    }

}

export default MyInfo;