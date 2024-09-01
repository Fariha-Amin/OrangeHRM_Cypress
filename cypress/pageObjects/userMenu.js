class UserMenu{

       getUserMenu(){
          return cy.get('.oxd-userdropdown');
       }
       getLogoutOption(){
        
           return cy.get("a[role='menuitem']").contains('Logout');
       }
       getUserNameText(){
        
           return cy.get(".oxd-userdropdown-tab p[class='oxd-userdropdown-name']");
       }
}

export default UserMenu;