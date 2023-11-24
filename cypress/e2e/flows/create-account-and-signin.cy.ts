/// <reference types="cypress" />

describe('create account and sign in', () => {
  it('creates a new user', () => {
    cy.visit('http://localhost:3000/auth/signup');
    cy.viewport(1280, 720);

    cy.get('#cookie-consent-accept').should('have.length', 1);
    cy.get('#cookie-consent-accept').click();

    cy.get('form').should('have.length', 1);
    cy.get('input[name="name"]').should('have.length', 1);
    cy.get('input[name="username"]').should('have.length', 1);
    cy.get('input[name="email"]').should('have.length', 1);
    cy.get('input[name="password"]').should('have.length', 1);

    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="email"]').type('ger.almenara+testing@gmail.com');
    cy.get('input[name="password"]').type('password');
    cy.get('input[id="terms"]').check();
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
    //check if the url contains /auth/verify
    cy.url().should('include', '/auth/verify');
  });

  it('logs in a user', () => {
    cy.visit('http://localhost:3000/auth/signin');
    cy.viewport(1280, 720);

    cy.get('#cookie-consent-accept').should('have.length', 1);
    cy.get('#cookie-consent-accept').click();

    cy.get('a[href="/auth/signup"]').should('have.length', 1);
    cy.get('form').should('have.length', 1);
    cy.get('input[name="email"]').should('have.length', 1);
    cy.get('input[name="password"]').should('have.length', 1);
    cy.get('button[type="submit"]').should('have.length', 1);

    cy.get('input[name="email"]').type('ger.almenara+testing@gmail.com');
    cy.get('input[name="password"]').type('password');
    cy.get('button[type="submit"]').click();

    cy.wait(1000);

    cy.url().should('include', '/profile');
    cy.contains('Welcome to Leafbase!').should('be.visible');
  });
});
