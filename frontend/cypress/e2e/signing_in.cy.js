describe("Signing in", () => {

  before(() => {
    cy.exec("mongosh tripPlanner_test --eval 'db.dropDatabase()'");
    cy.signup("user@email.com", "12345678", "username")
    cy.get("#logoutbutton").click()
  })

  it("with valid credentials, redirects to '/planner'", () => {
    cy.visit("/login");
    cy.get("#email").type("user@email.com");
    cy.get("#password").type("12345678");
    cy.get("#submit").click();


    cy.wait(500).then(() => {
      cy.url().should("include", "/planner");
    })
  });

  it("with missing password, redirects to '/login'", () => {
    cy.visit("/login");
    cy.get("#email").type("someone@example.com");
    cy.get("#submit").click();

    cy.url().should("include", "/login");
  });

  it("with missing email, redirects to '/login'", () => {
    cy.visit("/login");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/login");
  });
});