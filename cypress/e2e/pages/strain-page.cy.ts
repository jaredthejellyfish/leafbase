/// <reference types="cypress" />

describe('strains page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/strains/original-glue'); // <- /strain
    cy.viewport(1280, 720);
    cy.get('#cookie-consent-accept').should('have.length', 1);
    cy.get('#cookie-consent-accept').click();
  });

  it('should have no strain options', () => {
    cy.get('#strain-options').should('have.length', 0);
  });

  it('should have a title and subtitle', () => {
    cy.get('h1').should('have.text', 'GG4');
    cy.get('h2').should(
      'have.text',
      'aka Gorilla Glue, Original Glue, Gorilla Glue #4, Glue, Sticky Glue'
    );
  });

  it('should have a strain image', () => {
    cy.get('#strain-image').should('have.length', 1);
  });

  it('should have a strain star-rating', () => {
    cy.get('#strain-star-rating').should('have.length', 1);
  });

  it("should have a strain's description", () => {
    cy.get('#strain-description').should(
      'contain.text',
      'Original Glue, also known as'
    );
  });

  it('should have a strain soma', () => {
    cy.get('#strain-soma').should('have.length', 1).as('soma');
    cy.get('@soma').get('h3').should('have.text', 'Strain soma');

    cy.get('@soma').children().should('have.length', 6);
    cy.get('@soma')
      .children()
      .eq(1)
      .should('have.text', 'Feelings:relaxedsleepyhungry');

    cy.get('@soma')
      .children()
      .eq(2)
      .should('have.text', 'Negatives:lethargicdistractedunimaginative');

    cy.get('@soma')
      .children()
      .eq(3)
      .should('have.text', 'Helps with:anxietyinsomnialoss of appetite');
  });

  it('takes a screenshot of the strain page in dark mode', () => {
    cy.wait(1000).then(() => {
      cy.screenshot('strain-page-dark');
    });
  });

  it('takes a screenshot of the strain page in light mode', () => {
    cy.visit('http://localhost:3000/strains/original-glue', {
      // <- /strain
      onBeforeLoad: function (window) {
        window.localStorage.setItem('theme', 'light');
      },
    });

    cy.wait(1000).then(() => {
      cy.screenshot('strain-page-light');
    });
  });
});
