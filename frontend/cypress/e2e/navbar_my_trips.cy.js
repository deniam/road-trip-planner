describe("Checking for user logging and trips", () => {

    before(() => {
      cy.exec("mongosh tripPlanner_test --eval 'db.dropDatabase()'");
      cy.signup("user@email.com", "12345678", "username")
    })
  
    it("with valid credentials, redirects to '/planner', user clicks on my trips and shows empty trip list", () => {
      
      cy.wait(500).then(() => {
        cy.url().should("include", "/planner");
    })
    cy.contains('My Trips').click();
    cy.url().should("include", "/myTrips")
    cy.get('.AttractionsList').should('not.exist'); 

        
    

    });
})


