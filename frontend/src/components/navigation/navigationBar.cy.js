import NavigationBar from "./navigationBar";
import { MemoryRouter } from "react-router-dom";
import SignUpForm from '../user/SignUpForm'
import LoginForm from "../auth/LoginForm";
const navigate = () => { }


describe("User not logged in", () => {
  it('should navigate to the Sign Up when the user clicks Sign Up on /login', () => {
    cy.mount(<MemoryRouter initialEntries={["/login"]}>
      <NavigationBar navigate={navigate}/>
    </MemoryRouter>)
    cy.contains('Sign Up').click();
    cy.contains('Login');
  });

  it('should navigate to the Login page when the user clicks Login on /signup', () => { 
    cy.mount(<MemoryRouter initialEntries={["/signup"]}>
      <NavigationBar navigate={navigate}/>
    </MemoryRouter>)
    cy.contains('Login').click();
    cy.contains('Sign Up');
  })

  it('should not contain links to Planner, My Trips or Logout', () => { 
    cy.mount(<MemoryRouter initialEntries={["/"]}>
      <NavigationBar navigate={navigate}/>
    </MemoryRouter>)
    cy.get('Planner').should('not.exist');
    cy.get('My Trips').should('not.exist');
    cy.get('Logout').should('not.exist');
  })
})


describe('Navigation Bar when a user is logged in', () => {
beforeEach(() => {
  cy.window().its('localStorage').invoke('setItem', 'token', 'fakeToken');
});

  it('should navigate to the my Trips page when the user clicks on My Trips on /planner', () => {
    cy.mount(<MemoryRouter initialEntries={["/planner"]}>
      <NavigationBar navigate={navigate}/>
    </MemoryRouter>)
    cy.contains('My Trips').click();
    cy.contains('Planner');
    cy.contains('Logout');
  })

  it('should navigate to the Planner page when the user clicks on Planner on /trips', () => {
    cy.mount(<MemoryRouter initialEntries={["/myTrips"]}>
      <NavigationBar navigate={navigate}/>
    </MemoryRouter>)
    cy.contains('Planner').click();
    cy.contains('My Trips');
    cy.contains('Logout');
  })
    
  
  it('when a user is logged in the navbar does not show the Log In or Sign Up buttons', () => {
    cy.mount(<MemoryRouter initialEntries={["/"]}>
      <NavigationBar navigate={navigate}/>
    </MemoryRouter>)
    cy.get('Login').should('not.exist');
    cy.get('Sign Up').should('not.exist');

  })
});


