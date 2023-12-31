import SignUpForm from './SignUpForm'
const navigate = () => {}

describe("Signing up", () => {
  it("calls the /users endpoint", () => {
    cy.mount(<SignUpForm navigate={navigate}/>)

    cy.intercept('POST', '/users', { message: "OK" }).as("signUpRequest")

    cy.get("#email").type("someone@example.com");
    cy.get("#username").type("test_username");
    cy.get("#password").type("password1");
    cy.get("#confirmpassword").type("password1");
    cy.get("#submit").click();
    cy.wait('@signUpRequest').then( interception => {
      expect(interception.response.body.message).to.eq("OK");
      expect(interception.request.body.email).to.eq("someone@example.com");
      expect(interception.request.body.password).to.eq("password1");
      expect(interception.request.body.username).to.eq("test_username");
    })
  })
})
