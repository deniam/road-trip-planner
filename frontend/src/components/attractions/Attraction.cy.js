import Attraction from './Attraction'

const mockAttractions = require('../../mocks/mockPlaces') 

describe("rendering component", () => {
    describe("creates component ", () => {
        it("with attraction name, address and rating as fields", () => {
            cy.mount(<Attraction attraction={mockAttractions[0]}/>)
                        
            cy.get('.name').contains("Spitalfields Charnel House");
            cy.get('.address').contains("Bishops Square, London");
            cy.get('.rating').contains("4.5");
        })
    })
})

describe("handleClick", () => {
    describe("triggers and calls attractionClicked Function with ID and true", () => {
        it("when component is clicked once", () => {
            cy.mount(<Attraction id="4" attraction={mockAttractions[0]} attractionClicked={cy.stub().as('stubAttractionsClicked')}/>)
            cy.get('.name').contains("Spitalfields Charnel House");
            cy.get('.address').contains("Bishops Square, London");
            cy.get('.rating').contains("4.5");
            cy.get('.Attraction').click();
            cy.get('@stubAttractionsClicked').should('be.calledWith', "4", true);

        })
    })

    describe("triggers and calls attractionClicked Function with ID and true then false then true", () => {
        it("when component is clicked 3 times", () => {
            cy.mount(<Attraction id="4" attraction={mockAttractions[0]} attractionClicked={cy.stub().as('stubAttractionsClicked')}/>)
            cy.get('.name').contains("Spitalfields Charnel House");
            cy.get('.address').contains("Bishops Square, London");
            cy.get('.rating').contains("4.5");
            cy.get('.Attraction').click();
            cy.get('@stubAttractionsClicked').should('be.calledWith', "4", true);
            cy.get('.Attraction').click();
            cy.get('@stubAttractionsClicked').should('be.calledWith', "4", false);
            cy.get('.Attraction').click();
            cy.get('@stubAttractionsClicked').should('be.calledWith', "4", true);

        })
    })

})

describe("rendered component", () => {
    describe("is not clickable", () => {
        it("when control prop disableClick is passed in", () => {
            cy.mount(<Attraction id="4" attraction={mockAttractions[0]} attractionClicked={cy.stub().as('stubAttractionsClicked')} disableClick = {"hello"}/>)
            cy.get('button.Attraction').should('be.disabled')
        })
    })

})