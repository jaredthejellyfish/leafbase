/// <reference types="cypress" />

describe('signup page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/auth/signup');
    cy.viewport(1280, 720);
    cy.get('#cookie-consent-accept').should('have.length', 1);
    cy.get('#cookie-consent-accept').click();
  });

  it("should have a form with the following fields: 'name', 'username', 'email', 'pasword'", () => {
    cy.get('form').should('have.length', 1);
    cy.get('input[name="name"]').should('have.length', 1);
    cy.get('input[name="username"]').should('have.length', 1);
    cy.get('input[name="email"]').should('have.length', 1);
    cy.get('input[name="password"]').should('have.length', 1);
  });

  it('creates a new user', () => {
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

  it('takes a screenshot of the signup page in dark mode', () => {
    cy.wait(100).then(() => {
      cy.scrollTo('top');
      cy.screenshot('signup-page-dark');
    });
  });

  it('takes a screenshot of the signup page in light mode', () => {
    cy.visit('http://localhost:3000/auth/signup', {
      onBeforeLoad: function (window) {
        window.localStorage.setItem('theme', 'light');
      },
    });

    cy.wait(100).then(() => {
      cy.scrollTo('top');
      cy.screenshot('signup-page-light');
    });
  });
});
