import TripList from './TripList';
const mockAttractions = require('../../mocks/mockPlaces');

const mockTrip1 = {
    tripName: "Mock Trip One",
    startLocation: "Leeds",
    endLocation: "London",
    attractions: mockAttractions
}

const mockTrip2 = {
    tripName: "Mock Trip Two",
    startLocation: "Belfast",
    endLocation: "Paris",
    attractions: [mockAttractions[2], mockAttractions[1], mockAttractions[0]]
}

describe("Trip list component", () => {
    describe("has a list of AttractionList components", () => {
        it("when rendered", () => {
            window.localStorage.setItem('token', 'abc' );
            cy.intercept('GET', '/users', (req) => {
                req.reply({
                  statusCode: 201,
                  body: {token: "fakeToken", 
                  username: 'Gary', 
                  trips: [mockTrip1, mockTrip2]
                }
            })
              }).as("getTrips")
            cy.mount(<TripList/>)
            cy.get(".attractionList").eq(0).within(() => {

                cy.get("#finalTripName").contains('Mock Trip One');
                cy.get(".startLocation").contains('Leeds');
                cy.get(".endLocation").contains('London');
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

            cy.get(".attractionList").eq(1).within(() => {

                cy.get("#finalTripName").contains('Mock Trip Two');
                cy.get(".startLocation").contains('Belfast');
                cy.get(".endLocation").contains('Paris');
                
                cy.get("#0").within(() => {
                    cy.get('.name').contains("London Dragon");
                    cy.get('.address').contains("City of London");
                    cy.get('.rating').contains("5");
                })

                cy.get("#1").within(() => {
                    cy.get('.name').contains("Broadgate Art Trail");
                    cy.get('.address').contains("175 Bishopsgate, Bishopsgate, London");
                    cy.get('.rating')
                })

                cy.get("#2").within(() => {
                    cy.get('.name').contains("Spitalfields Charnel House");
                    cy.get('.address').contains("Bishops Square, London");
                    cy.get('.rating').contains("4.5");
                })

                cy.wait('@getTrips').then( interception => {
                    expect(interception.request.headers.authorization).contains('abc');
                })

            })

        })
    })

    describe("displays no attraction list components", () => {
        it("when there are no trips stored for user", () => {
            window.localStorage.setItem('token', 'abc' );
            cy.intercept('GET', '/users', (req) => {
                req.reply({
                    statusCode: 201,
                    body:{
                        token: "fakeToken", 
                        username: 'Gary', 
                        trips: []
                    }
                })
            }).as("getTrips")
            cy.mount(<TripList/>)
            cy.get(".attractionList").should('not.exist');

            cy.wait('@getTrips').then( interception => {
                expect(interception.request.headers.authorization).contains('abc');
            })    
        })

        it("when there is an api error", () => {
            window.localStorage.setItem('token', 'abc' );
            cy.intercept('GET', '/users', (req) => {
                req.reply({
                  statusCode: 400
                })
              }).as("getTrips")
            cy.mount(<TripList/>)
            cy.get(".attractionList").should('not.exist');

            cy.wait('@getTrips').then( interception => {
                expect(interception.request.headers.authorization).contains('abc');
            })    
        })
    })
})