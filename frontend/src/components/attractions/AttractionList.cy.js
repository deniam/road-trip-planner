import AttractionList from './AttractionList';
const mockAttractions = require('../../mocks/mockPlaces') 
const navigate = () => {}

describe("AttractionList component", () => {
    describe("has a list of Attraction components", () => {
        it("when rendered with attractions prop passed in", () => {
            cy.mount(<AttractionList navigate={navigate} attractions={mockAttractions}/>)
            
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

    describe("has a list of Attraction components that are not clickable", () => {
        it("when disableClicks prop is passed in", () => {
            cy.mount(<AttractionList navigate={navigate} attractions={mockAttractions} disableClicks={"hello"}/>)
            cy.get('#0').should('be.disabled');
            cy.get('#1').should('be.disabled');
            cy.get('#2').should('be.disabled');
        })
    })

    describe("has a list of Attraction components that are clickable", () => {
        it("when disableClicks prop is passed in", () => {
            cy.mount(<AttractionList navigate={navigate} attractions={mockAttractions}/>)
            cy.get('#0').should('be.enabled');
            cy.get('#1').should('be.enabled');
            cy.get('#2').should('be.enabled');
        })
    })

    describe("has a clickable and present next button", () => {
        it("when no disableNextButton prop is present", () => {
            cy.mount(<AttractionList navigate={navigate} attractions={mockAttractions}/>)
            cy.get('.nextButton').should('be.enabled');
        })
    })

    describe("has no next button", () => {
        it("when disableNextButton prop is present", () => {
            cy.mount(<AttractionList navigate={navigate} attractions={mockAttractions} disableNextButton={"goodbye"}/>)
            cy.get('.nextButton').should('not.exist');
        })
    })

    describe("calls submitAttractions Function With Correct Array Of Attraction Objects", () => {
        it("when next button is clicked on", () => {
            cy.mount(<AttractionList navigate={navigate} attractions={mockAttractions} submitAttractions={cy.stub().as('stubSubmitAttractions')} />)
            cy.get('#0').click();
            cy.get('#1').click().click();
            cy.get('#2').click().click().click();
            cy.get('.nextButton').click();
            cy.get('@stubSubmitAttractions').should('be.calledWith', [mockAttractions[0], mockAttractions[2]]);
        })
    })

    
    

})