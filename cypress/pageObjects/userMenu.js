class UserMenu{

       getUserMenu(){
          return cy.get('.oxd-userdropdown');
       }
       getLogoutOption(){
        
           return cy.get("a[role='menuitem']").contains('Logout');
       }
}

export default UserMenu;