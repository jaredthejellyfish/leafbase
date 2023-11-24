/// <reference types="cypress" />

describe('landing page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.viewport(1280, 720);
  });

  it('displays the cookie banner by default', () => {
    cy.get('#cookie-consent').should('have.length', 1);

    cy.get('#cookie-consent-accept').should('have.length', 1);
    cy.get('#cookie-consent-decline').should('have.length', 1);

    cy.get('#cookie-consent-accept').click();
  });

  it('displays the correct sections and content', () => {
    cy.get('#cookie-consent-accept').should('have.length', 1);
    cy.get('#cookie-consent-accept').click();

    const sections = cy.get('section');

    const firstSection = sections.should('have.length', 2).first();

    firstSection.should('contain.text', 'Welcome to Leafbase');

    const login = cy.get('#login').should('have.length', 1);
    login.should('contain.text', 'Log in');

    const signup = cy.get('#signup').should('have.length', 1);
    signup.should('contain.text', 'Sign up');

    firstSection
      .get('button')
      .should('have.length', 2)
      .eq(1)
      .click({ force: true });

    const secondSection = cy.get('section').eq(1);

    secondSection.should('contain.text', 'Top Strains:');

    secondSection
      .children()
      .get('#top-strain-cards')
      .children()
      .should('have.length', 8);
  });

  it('links to the login page', () => {
    cy.get('#cookie-consent-accept').should('have.length', 1);
    cy.get('#cookie-consent-accept').click();

    cy.get('#login').should('have.length', 1);
    cy.get('#login').click();

    cy.url().should('include', '/signin');
  });

  it('links to the signup page', () => {
    cy.get('#cookie-consent-accept').should('have.length', 1);
    cy.get('#cookie-consent-accept').click();

    cy.get('#signup').should('have.length', 1);
    cy.get('#signup').click();

    cy.url().should('include', '/signup');
  });

  it('takes a screenshot of the landing page in dark mode', () => {
    cy.get('#cookie-consent-accept').should('have.length', 1);
    cy.get('#cookie-consent-accept').click();

    cy.wait(100).then(() => {
      cy.scrollTo('top');
      cy.screenshot('landing-page-dark');
    });
  });

  it('takes a screenshot of the landing page in light mode', () => {
    cy.get('#cookie-consent-accept').should('have.length', 1);
    cy.get('#cookie-consent-accept').click();

    cy.visit('http://localhost:3000/', {
      onBeforeLoad: function (window) {
        window.localStorage.setItem('theme', 'light');
      },
    });

    cy.wait(100).then(() => {
      cy.scrollTo('top');
      cy.screenshot('landing-page-light');
    });
  });
});
