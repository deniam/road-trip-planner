import Planner from './Planner';
const mockAttractions = require('../../mocks/mockPlaces') 
const navigate = () => {}


describe("Planner component", () => {
    
    describe("has a journeyForm component", () => {
        it("when rendered for the first time", () => {
            cy.mount(<Planner navigate ={navigate}/>)
            cy.get('.journeyForm').should('exist');   
        })
    })

    describe("has an attractionListComponent with a list of attractions that are clickable and start and locations", () => {
        it("after journeyForm has been submitted", () => {
            cy.intercept('POST', '/attractions', { body: {token: "fakeToken", attractions: [mockAttractions[0], mockAttractions[1], mockAttractions[2]]}, statusCode: 201}).as("attractionsRequest");
            cy.mount(<Planner navigate ={navigate}/>)
            cy.get(".journeyForm").within(() => {
                cy.get("#startLocation").type("Leeds");
                cy.get("#endLocation").type("Glasgow");
                cy.get("#submit").click();
            })

            
            cy.get(".planner").within(() => {
                cy.get('#startLocation').contains("Leeds");
                cy.get('#endLocation').contains("Glasgow");
            })

            cy.get(".attractionList").within(() => {
                cy.get('#0').should('be.enabled');
                cy.get('#1').should('be.enabled');
                cy.get('#2').should('be.enabled');
                cy.get("#0").within(() => {
                    cy.get('.name').contains("Spitalfields Charnel House");
                    cy.get('.address').contains("Bishops Square, London");
                    cy.get('.rating').contains("4.5");
                })
                cy.get("#1").within(() => {
                    cy.get('.name').contains("Broadgate Art Trail");
                    cy.get('.address').contains("175 Bishopsgate, Bishopsgate, London");
                    cy.get('.rating')
                })
                cy.get("#2").within(() => {
                    cy.get('.name').contains("London Dragon");
                    cy.get('.address').contains("City of London");
                    cy.get('.rating').contains("5");
                })

            })

        })
    })

    describe("continues to dislay the journey form if no attractions to display", () => {
        it("after journeyForm has been submitted", () => {
            cy.intercept('POST', '/attractions', { body: {token: "fakeToken", attractions: []}, statusCode: 201}).as("attractionsRequest");
            cy.mount(<Planner navigate ={navigate}/>)
            cy.get(".journeyForm").within(() => {
                cy.get("#startLocation").type("Leeds");
                cy.get("#endLocation").type("Glasgow");
                cy.get("#submit").click();
            })

            cy.get('.journeyForm').should('exist'); 

            

        })
    })



})