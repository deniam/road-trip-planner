import JourneyForm from './JourneyForm'

const navigate = () => {}

describe("submitting journey", () => {
    describe("calls the /attractions endpoint", () => {
        it("with only start and end location filled in", () => {
            cy.mount(<JourneyForm navigate={navigate} submitLocations = {cy.stub().as('stubsubmitLocations')}/>)
            cy.intercept('POST', '/attractions', { body: {token: "fakeToken", attractions: ["cinema", "museum"]}, statusCode: 201}).as("attractionsRequest");    
            
            cy.get("#startLocation").type("Leeds");
            cy.get("#endLocation").type("Glasgow");
            cy.get("#submit").click();
            cy.wait('@attractionsRequest').then( interception => {
                expect(interception.response.body.token).to.eq("fakeToken")
                expect(interception.request.body.locations[0]).to.eq("Leeds");
                expect(interception.request.body.locations[1]).to.eq("Glasgow");
                cy.get('@stubsubmitLocations').should('be.calledWith', "Leeds", "Glasgow",["cinema", "museum"]); 
            })
        })

        it("with the start and end location and 3 waypoints filled in", () => {
            cy.mount(<JourneyForm navigate={navigate}/>)
            cy.intercept('POST', '/attractions', { token: "fakeToken" }).as("attractionsRequest");    
            
            cy.get("#startLocation").type("Leeds");
            cy.get("#endLocation").type("Glasgow");
            for (let i = 0; i < 5; i++) {
                cy.get("#addWaypoint").click();
            }
            cy.get("#1").type("Peterborough");
            cy.get("#2").type("Liverpool");
            cy.get("#3").type("London");
            cy.get("#submit").click();
            cy.wait('@attractionsRequest').then( interception => {
                expect(interception.response.body.token).to.eq("fakeToken")
                expect(interception.request.body.locations[0]).to.eq("Leeds");
                expect(interception.request.body.locations[1]).to.eq("Peterborough");
                expect(interception.request.body.locations[2]).to.eq("Liverpool");
                expect(interception.request.body.locations[3]).to.eq("London");
                expect(interception.request.body.locations[4]).to.eq("Glasgow");
            })
        })

        it("with the start and end location and all 10 waypoints filled in", () => {
            cy.mount(<JourneyForm navigate={navigate}/>)
            cy.intercept('POST', '/attractions', { token: "fakeToken" }).as("attractionsRequest");    
            
            cy.get("#startLocation").type("Leeds");
            cy.get("#endLocation").type("Glasgow");
            for (let i = 0; i < 10; i++) {
                cy.get("#addWaypoint").click();
            }
            cy.get("#1").type("Peterborough");
            cy.get("#2").type("Liverpool");
            cy.get("#3").type("London");
            cy.get("#4").type("Swansea");
            cy.get("#5").type("Cardiff");
            cy.get("#6").type("Boston");
            cy.get("#7").type("Manchester");
            cy.get("#8").type("Plymouth");
            cy.get("#9").type("Exeter");
            cy.get("#10").type("Newcastle");
            cy.get("#submit").click();
            cy.wait('@attractionsRequest').then( interception => {
                expect(interception.response.body.token).to.eq("fakeToken")
                expect(interception.request.body.locations[0]).to.eq("Leeds");
                expect(interception.request.body.locations[1]).to.eq("Peterborough");
                expect(interception.request.body.locations[2]).to.eq("Liverpool");
                expect(interception.request.body.locations[3]).to.eq("London");
                expect(interception.request.body.locations[4]).to.eq("Swansea");
                expect(interception.request.body.locations[5]).to.eq("Cardiff");
                expect(interception.request.body.locations[6]).to.eq("Boston");
                expect(interception.request.body.locations[7]).to.eq("Manchester");
                expect(interception.request.body.locations[8]).to.eq("Plymouth");
                expect(interception.request.body.locations[9]).to.eq("Exeter");
                expect(interception.request.body.locations[10]).to.eq("Newcastle");
                expect(interception.request.body.locations[11]).to.eq("Glasgow");
            })
        })
    })
    describe("does not call fetch", () => {  
        it("when the start location is not input but the submit button is still clicked", () => {
            cy.mount(<JourneyForm navigate={navigate}/>)
            cy.intercept('/attractions', cy.spy().as('attractionsRequest'));     
            cy.get("#endLocation").type("Glasgow");
            cy.get("#submit").click();
            cy.get('@attractionsRequest').should('not.have.been.called');
        })

        it("when the a end location is not input but the submit button is still clicked", () => {
            cy.mount(<JourneyForm navigate={navigate}/>)
            cy.intercept('/attractions', cy.spy().as('attractionsRequest'));    
            cy.get("#startLocation").type("Glasgow");
            cy.get("#submit").click();
            cy.get('@attractionsRequest').should('not.have.been.called');
        })

    })

})