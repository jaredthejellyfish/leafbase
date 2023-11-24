/// <reference types="cypress" />

describe('signin page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/auth/signin');
    cy.viewport(1280, 720);
    cy.get('#cookie-consent-accept').should('have.length', 1);
    cy.get('#cookie-consent-accept').click();
  });

  it("should have a form with the following fields: 'name', 'username', 'email', 'pasword'", () => {
    cy.get('form').should('have.length', 1);
    cy.get('input[name="email"]').should('have.length', 1);
    cy.get('input[name="password"]').should('have.length', 1);
    cy.get('button[type="submit"]').should('have.length', 1);
  });

  it('logs in a user', () => {
    cy.get('input[name="email"]').type('ger.almenara+testing@gmail.com');
    cy.get('input[name="password"]').type('password');
    cy.get('button[type="submit"]').click();
    cy.wait(1000)
    cy.url().should('include', '/profile');
    cy.contains("Welcome to Leafbase!").should('be.visible');
  });

  it('should have a link to the signup page', () => {
    cy.get('a[href="/auth/signup"]').should('have.length', 1);
  });

  it('takes a screenshot of the signin page in dark mode', () => {

    cy.wait(100).then(() => {
      cy.scrollTo('top');
      cy.screenshot('signin-page-dark');
    });
  });

  it('takes a screenshot of the signin page in light mode', () => {
    cy.visit('http://localhost:3000/auth/signin', {
      onBeforeLoad: function (window) {
        window.localStorage.setItem('theme', 'light');
      },
    });

    cy.wait(100).then(() => {
      cy.scrollTo('top');
      cy.screenshot('signin-page-light');
    });
  });
});
