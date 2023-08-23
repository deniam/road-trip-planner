describe("Log in then log out", () => {

    before(() => {
      cy.signup("user@email.com", "12345678", "username")
    })
  
    it("with valid credentials, redirects to '/planner', user logs out and logs in and taken to planner page again", () => {
  
      cy.wait(500).then(() => {
        cy.url().should("include", "/planner");
    })
    cy.contains('button','Logout').click();
    cy.url().should("include", "/login")
        
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.wait(500).then(() => {
        cy.url().should("include", "/planner");
    })
        
    

    });
})