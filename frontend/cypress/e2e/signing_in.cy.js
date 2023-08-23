describe("Signing in", () => {

  before(() => {
    cy.signup("someone@example.com", "password1", "username")
  })

  it("with valid credentials, redirects to '/planner'", () => {
    cy.get("#logoutbutton").click();
    cy.wait(5000).then(() => {
      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("password1");
      cy.get("#submit").click();
  })

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