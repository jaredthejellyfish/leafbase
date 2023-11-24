/// <reference types="cypress" />

describe('strains page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/strains');
    cy.viewport(1280, 720);
    cy.get('#cookie-consent-accept').should('have.length', 1);
    cy.get('#cookie-consent-accept').click();
  });

  it('should have a title and subtitle', () => {
    cy.get('h1').should('have.text', 'All strains');
    cy.get('h3').should(
      'have.text',
      'Browse the most comprehensive weed strain library on the web. Browse weed strains by cannabis type (indica, sativa, or hybrid), effects, or number of comments.'
    );
  });

  it('takes a screenshot of the strains page in dark mode', () => {
    cy.wait(100).then(() => {
      cy.scrollTo('top');
      cy.screenshot('strains-page-dark');
    });
  });

  it('takes a screenshot of the strains page in light mode', () => {
    cy.visit('http://localhost:3000/strains', {
      onBeforeLoad: function (window) {
        window.localStorage.setItem('theme', 'light');
      },
    });

    cy.wait(100).then(() => {
      cy.scrollTo('top');
      cy.screenshot('strains-page-light');
    });
  });
});
