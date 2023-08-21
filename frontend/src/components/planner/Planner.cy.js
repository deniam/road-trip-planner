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

    describe("has an attractionListComponent with a list of attractions that are clickable and start and locations and has save button", () => {
        it("after journeyForm has been submitted", () => {
            cy.intercept('POST', '/attractions', { body: {token: "fakeToken", attractions: [mockAttractions[0], mockAttractions[1], mockAttractions[2]]}, statusCode: 201}).as("attractionsRequest");
            cy.mount(<Planner navigate ={navigate}/>)
            cy.get(".journeyForm").within(() => {
                cy.get("#startLocation").type("Leeds");
                cy.get("#endLocation").type("Glasgow");
                cy.get("#submit").click();
            })
            cy.get(".attractionList").within(() => {
                cy.get('.startLocation').contains("Leeds");
                cy.get('.endLocation').contains("Glasgow");
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
                cy.get('.saveButton').should('exist');
                cy.get('.tripname').should('exist');

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

    describe("submits trip data to /trips  ", () => {
        it("after journeyForm has been submitted, attractions have been selected and save button has been pressed", () => {
            cy.intercept('POST', '/attractions', { body: {token: "fakeToken", attractions: [mockAttractions[0], mockAttractions[1], mockAttractions[2]]}, statusCode: 201}).as("attractionsRequest");
            cy.intercept('POST', '/trips', { body: {token: "fakeToken"}, statusCode: 201}).as("handleSaveButtonClick");   
            cy.mount(<Planner navigate ={navigate}/>)
            cy.get(".journeyForm").within(() => {
                cy.get("#startLocation").type("Leeds");
                cy.get("#endLocation").type("Glasgow");
                cy.get("#submit").click();
            })
            cy.get(".attractionList").within(() => {
                cy.get('#0').click();
                cy.get('#2').click();
                cy.get('.tripname').type('My Awesome Trip');
                cy.get('.saveButton').click();
                cy.wait('@handleSaveButtonClick').then((interception) => {
                    expect(interception.response.body.token).to.eq("fakeToken");
                    expect(interception.request.body.tripName).to.eq("My Awesome Trip") ;
                    expect(interception.request.body.startLocation).to.eq("Leeds");
                    expect(interception.request.body.endLocation).to.eq("Glasgow");
                    expect(interception.request.body.attractions[0].name).to.eq( "Spitalfields Charnel House");
                    expect(interception.request.body.attractions[1].name).to.eq("London Dragon");
                    expect(interception.request.body.attractions.length).to.eq(2);
                })
            })

        })
    })



})