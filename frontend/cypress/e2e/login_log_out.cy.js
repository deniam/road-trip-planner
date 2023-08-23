describe("Checks for user logging in and out", () => {

    before(() => {
      cy.exec("mongosh tripPlanner_test --eval 'db.dropDatabase()'");
      cy.signup("user@email.com", "12345678", "username")
    })
  
    it("with valid credentials, redirects to '/planner', user logs out and logs in and taken to planner page again", () => {
  
      cy.wait(500).then(() => {
        cy.url().should("include", "/planner");
    })
    cy.contains('button','Logout').click();
    cy.url().should("include", "/login")
      
    cy.login("user@email.com", "12345678");
    cy.wait(500).then(() => {
        cy.url().should("include", "/planner");
    })
    });
})