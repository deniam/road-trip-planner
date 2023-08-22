

describe("creating and then viewing a trip", () => {
    before ( () => {
        cy.exec("mongosh tripPlanner_test --eval 'db.dropDatabase()'");
    })

    it("login for valid trip with 3 valid waypoints", () => {
        cy.signup("user@email.com", "12345678", "username");
        cy.login("user@email.com", "12345678");
        cy.url().should("contain", "/planner").then(() => {
            //should start with form to input journey info
            cy.get("#startLocation").type("London");
            cy.get("#endLocation").type("Leeds");
            cy.get("#addWaypoint").click();
            cy.get("#addWaypoint").click();
            cy.get("#addWaypoint").click();
            cy.get("#addWaypoint").click();
            cy.get("#addWaypoint").click();
            cy.get("#1").type("Peterborough");
            cy.get("#2").type("Stevenage");
            cy.get("#3").type("Luton");
            cy.get("#submit").click();

            
            
        }).then(() => {
            //should now generate selectable attractions list
            cy.get(".attractionList").within(() => {
                cy.get('.startLocation').contains("London");
                cy.get('.endLocation').contains("Leeds");
                cy.get('.tripname').type('My Awesome Trip');

                cy.get('.Attraction').then(() => {
                    for (let i = 0; i < 3; i++) {
                        cy.get(`#${i}`).should('be.enabled');
                        // eslint-disable-next-line no-loop-func
                        cy.get(`#${i}`).within(() => {
                            cy.get('.name').should('not.be.empty');
                            cy.get('.address').should('not.be.empty');
                            cy.get('.rating').should('exist');
                        })
                        cy.get(`#${i}`).click();
                    }
                });
                cy.get('.saveButton').click();
            })
        }).then(()=> {
            cy.wait(1000);  
        })
        cy.url().should("contain", "/myTrips").then(() => {
            cy.get(".myTrips").within(() => {
                cy.get(".attractionList").eq(0).within(() => {
                    cy.get("#finalTripName").contains('My Awesome Trip');
                    cy.get(".startLocation").contains('London');
                    cy.get(".endLocation").contains('Leeds');
                    cy.get('.saveButton').should('not.exist');
                    cy.get('.tripname').should('not.exist');
                    cy.get('.Attraction').then(count => {
                        for (let i = 0; i < count; i++) {
                            cy.get(`#${i}`).should('be.disabled');
                            // eslint-disable-next-line no-loop-func
                            cy.get(`#${i}`).within(() => {
                                cy.get('.name').should('not.be.empty');
                                cy.get('.address').should('not.be.empty');
                                cy.get('.rating').should('exist');
                            })
                        }
                    });
                })
            })

        });   
        
    });

    it("signup for valid trip with 3 valid waypoints", () => {
        cy.signup("user@email.com", "12345678", "username");
        cy.url().should("contain", "/planner").then(() => {
            //should start with form to input journey info
            cy.get("#startLocation").type("London");
            cy.get("#endLocation").type("Leeds");
            cy.get("#addWaypoint").click();
            cy.get("#addWaypoint").click();
            cy.get("#addWaypoint").click();
            cy.get("#addWaypoint").click();
            cy.get("#addWaypoint").click();
            cy.get("#1").type("Peterborough");
            cy.get("#2").type("Stevenage");
            cy.get("#3").type("Luton");
            cy.get("#submit").click();

        }).then(() => {
            //should now generate selectable attractions list
            cy.get(".attractionList").within(() => {
                cy.get('.startLocation').contains("London");
                cy.get('.endLocation').contains("Leeds");
                cy.get('.tripname').type('My Awesome Trip');

                cy.get('.Attraction').then(() => {
                    for (let i = 0; i < 3; i++) {
                        cy.get(`#${i}`).should('be.enabled');
                        // eslint-disable-next-line no-loop-func
                        cy.get(`#${i}`).within(() => {
                            cy.get('.name').should('not.be.empty');
                            cy.get('.address').should('not.be.empty');
                            cy.get('.rating').should('exist');
                        })
                        cy.get(`#${i}`).click();
                    }
                });
                cy.get('.saveButton').click();
            })
        }).then(()=> {
            cy.wait(1000);  
        })
        cy.url().should("contain", "/myTrips").then(() => {
            cy.get(".myTrips").within(() => {
                cy.get(".attractionList").eq(0).within(() => {
                    cy.get("#finalTripName").contains('My Awesome Trip');
                    cy.get(".startLocation").contains('London');
                    cy.get(".endLocation").contains('Leeds');
                    cy.get('.saveButton').should('not.exist');
                    cy.get('.tripname').should('not.exist');
                    cy.get('.Attraction').then(count => {
                        for (let i = 0; i < count; i++) {
                            cy.get(`#${i}`).should('be.disabled');
                            // eslint-disable-next-line no-loop-func
                            cy.get(`#${i}`).within(() => {
                                cy.get('.name').should('not.be.empty');
                                cy.get('.address').should('not.be.empty');
                                cy.get('.rating').should('exist');
                            })
                        }
                    });
                })
            })

        });   
        
    });
});
