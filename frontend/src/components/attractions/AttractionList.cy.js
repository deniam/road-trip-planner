import AttractionList from './AttractionList';
const mockAttractions = require('../../mocks/mockPlaces') 
const navigate = () => {}

describe("AttractionList component", () => {
    describe("has a list of Attraction components", () => {
        it("when rendered with attractions prop passed in", () => {
            cy.mount(<AttractionList navigate={navigate} attractions={mockAttractions} startLocation="Start place" endLocation="End place"/>)
            cy.get('.startLocation').contains("Start place");
            cy.get('.endLocation').contains("End place");
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

    

    describe("calls handleSaveButtonClick Function With Correct object", () => {
    });
        it("when save button is clicked on check a request", () => {
            cy.mount(<AttractionList navigate={navigate} attractions={mockAttractions} startLocation={'Start location'} endLocation={'End location'} />);
            cy.intercept('POST', '/trips', { body: {token: "fakeToken"}, statusCode: 201}).as("handleSaveButtonClick");    
            cy.get('.tripname').type('My Awesome Trip');
            cy.get('.saveButton').should('be.enabled');
            cy.get('#0').click();
            cy.get('#2').click();
            cy.get('.saveButton').click();
            cy.wait('@handleSaveButtonClick').then((interception) => {
                expect(interception.response.body.token).to.eq("fakeToken");
                expect(interception.request.body.tripName).to.eq("My Awesome Trip") ;
                expect(interception.request.body.startLocation).to.eq("Start location");
                expect(interception.request.body.endLocation).to.eq("End location");
                expect(interception.request.body.attractions[0].name).to.eq( "Spitalfields Charnel House");
                expect(interception.request.body.attractions[1].name).to.eq("London Dragon");
                expect(interception.request.body.attractions.length).to.eq(2);
            })
        
            
    });


    describe("save button is disabled if input field is empty", () => {
        it("when input field is empty", () => {
            cy.mount(<AttractionList navigate={navigate} attractions={mockAttractions} />);
            cy.get('.saveButton').should('be.disabled');
        });

        it("when input field is not empty", () => {
            cy.mount(<AttractionList navigate={navigate} attractions={mockAttractions} />);
            cy.get('.tripname').type('My Awesome Trip');
            cy.get('.saveButton').should('be.enabled');
        });
    });

    describe("save button does not exist,trip name title field does and attractions are not clickable", () => {
        it("when hideSave prop is passed in ", () => {
            cy.mount(<AttractionList navigate={navigate} attractions={mockAttractions} hideSave="Hello" savedTripName="My Trip" startLocation="Start place" endLocation="End place" />);
            cy.get('.startLocation').contains("Start place");
            cy.get('.endLocation').contains("End place");
            cy.get('.saveButton').should('not.exist');
            cy.get('.tripname').should('not.exist');
            cy.get('#0').should('be.disabled');
            cy.get('#2').should('be.disabled');
            cy.get('#finalTripName').contains("My Trip");
        });

        
    });
});