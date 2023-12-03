/// <reference types="cypress" />

describe('like a strain', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/auth/signin');

    cy.get('#cookie-consent-accept').should('have.length', 1);
    cy.get('#cookie-consent-accept').click();

    cy.get('input[name="email"]').type('ger.almenara+testing@gmail.com');
    cy.get('input[name="password"]').type('password');
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
  });

  it('likes a strain in the strains page', () => {
    cy.visit('http://localhost:3000/strains');
    cy.get('#strain-card-loader')
      .as('strainCardLoader')
      .children()
      .should('have.length', 12);
    cy.get('@strainCardLoader').children().first().as('firstStrainCard');

    cy.get('@firstStrainCard').find('button').click();
    cy.get('@firstStrainCard')
      .find('button')
      .children()
      .first()
      .should('have.class', 'text-green-600/75');
  });

  it('checks if the strain is in the profile page', () => {
    cy.visit('http://localhost:3000/profile');
    cy.get('#liked-strains-accordion')
      .as('likedStrains')
      .children()
      .should('have.length', 1);
    cy.get('@likedStrains').children().first().as('firstLikedStrain');
    cy.get('@firstLikedStrain').click();
    cy.url().should('include', '/strains/'); // <- /strain
  });

  it('unlikes a strain in the strain page', () => {
    cy.visit('http://localhost:3000/strains');
    cy.get('#strain-card-loader')
      .as('strainCardLoader')
      .children()
      .should('have.length', 12);
    cy.get('@strainCardLoader').children().first().as('firstStrainCard');

    cy.get('@firstStrainCard').find('button').click();
    cy.get('@firstStrainCard')
      .find('button')
      .children()
      .first()
      .should('not.have.class', 'text-green-600/75');
  });
});
