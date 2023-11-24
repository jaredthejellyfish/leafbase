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

  it('likes a strain in the strain page', () => {
    cy.visit('http://localhost:3000/strain/original-glue');

    cy.get('#strain-options').children().should('have.length', 3).eq(2).as('likeButton')

    cy.get('@likeButton').click();
    cy.get('@likeButton').children().first().should('have.class', 'text-green-600/75');
  });

  it('checks if the strain is in the profile page', () => {
    cy.visit('http://localhost:3000/profile');
    cy.get('#liked-strains-accordion')
      .as('likedStrains')
      .children()
      .should('have.length', 1);
    cy.get('@likedStrains').children().first().as('firstLikedStrain');
    cy.get('@firstLikedStrain').click();
    cy.url().should('include', '/strain/');
  });

  it('unlikes a strain in the strain page', () => {
    cy.visit('http://localhost:3000/strain/original-glue');

    cy.get('#strain-options').children().should('have.length', 3).eq(2).as('likeButton')

    cy.get('@likeButton').click();
    cy.get('@likeButton').children().first().should('not.have.class', 'text-green-600/75');
  });
});
