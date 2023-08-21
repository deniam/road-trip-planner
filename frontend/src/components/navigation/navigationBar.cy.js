// cypress/integration/navigationBar.spec.js
describe('Navigation Bar', () => {

  it('should navigate to Sign Up when on /login', () => {
    cy.get('login')  
    cy.click();
    cy.contains('Sign Up');
  });

  // it('should navigate to Login when on /signup', () => {
  //     cy.visit('/signup');
  //     cy.contains('Login').should('exist');
  // });

  // it('should show Planner and My Trips when on /planner', () => {
  //     cy.visit('/planner');
  //     cy.contains('Planner').should('exist');
  //     cy.contains('My Trips').should('exist');
  // });

  // it('should show Planner and My Trips when on /trips', () => {
  //     cy.visit('/trips');
  //     cy.contains('Planner').should('exist');
  //     cy.contains('My Trips').should('exist');
  // });

  // it('should show Logout when logged in', () => {
  //     // Log in first
  //     cy.visit('/login');
  //     // Fill in login form and submit
  //     cy.get('input[name="username"]').type('your_username');
  //     cy.get('input[name="password"]').type('your_password');
  //     cy.contains('Login').click();

  //     cy.visit('/planner'); // You can test this on other routes as well
  //     cy.contains('Logout').should('exist');
  // });

  // it('should show Login and Sign Up when not logged in', () => {
  //     cy.visit('/'); // Assuming visiting the homepage redirects to /login
  //     cy.contains('Login').should('exist');
  //     cy.contains('Sign Up').should('exist');
  // });
});
