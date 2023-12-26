/// <reference types="cypress" />

describe('edit profile', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/auth/signin');

    cy.get('#cookie-consent-accept').should('have.length', 1);
    cy.get('#cookie-consent-accept').click();

    cy.get('input[name="email"]').type('ger.almenara+testing@gmail.com');
    cy.get('input[name="password"]').type('password');
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
  });

  it('edits the test user profile', () => {
    cy.visit('http://localhost:3000/profile');

    cy.get('#edit-profile').should('have.length', 1).as('editProfileButton');
    cy.get('@editProfileButton').click();

    cy.get('input[type="file"]').should('have.length', 1).as('profilePicture');
    cy.get('@profilePicture').attachFile('test-profile-picture.jpg');

    cy.wait(1000);

    cy.get('input[name="name"]').should('have.length', 1).as('nameInput');
    cy.get('@nameInput').clear().type('Test User Edited');

    cy.get('input[name="username"]')
      .should('have.length', 1)
      .as('usernameInput');
    cy.get('@usernameInput').clear().type('testuseredited');

    cy.get('input[name="location"]')
      .should('have.length', 1)
      .as('locationInput');
    cy.get('@locationInput').clear().type('Test Location, Edited');

    cy.get('input[name="phone"]').should('have.length', 1).as('phoneInput');
    cy.get('@phoneInput').clear().type('+34 123 456 789');

    cy.get('#about-me-textarea').should('have.length', 1).as('aboutMeInput');
    cy.get('@aboutMeInput')
      .clear()
      .type(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl.',
      );

    cy.get('#submit-edit-profile').should('have.length', 1).click();

    // check the url is /profile
    cy.url().should('include', '/profile');

    // check the user name is Test User Edited
    cy.contains('Test User Edited').should('be.visible');
    cy.contains('testuseredited').should('be.visible');
    cy.contains('Test Location, Edited').should('be.visible');
    cy.contains('+34 123 456 789').should('be.visible');
    cy.contains(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc eu nisl.',
    ).should('be.visible');
    cy.get('img[alt="profile"]').should('have.length', 1);
  });

  it('resets the test user profile', () => {
    cy.visit('http://localhost:3000/profile');

    cy.get('#edit-profile').should('have.length', 1).as('editProfileButton');
    cy.get('@editProfileButton').click();

    cy.get('input[type="file"]').should('have.length', 1).as('profilePicture');
    cy.get('@profilePicture').attachFile('default-profile-picture.png');

    cy.wait(1000);

    cy.get('input[name="name"]').should('have.length', 1).as('nameInput');
    cy.get('@nameInput').clear().type('Test User');

    cy.get('input[name="username"]')
      .should('have.length', 1)
      .as('usernameInput');
    cy.get('@usernameInput').clear().type('testuser');

    cy.get('input[name="location"]')
      .should('have.length', 1)
      .as('locationInput');
    cy.get('@locationInput').clear().type('Test Location');

    cy.get('input[name="phone"]').should('have.length', 1).as('phoneInput');
    cy.get('@phoneInput').clear().type('+34 987 654 321');

    cy.get('#about-me-textarea').should('have.length', 1).as('aboutMeInput');
    cy.get('@aboutMeInput').clear().type('unedited bio');

    cy.get('#submit-edit-profile').should('have.length', 1).click();

    cy.url().should('include', '/profile');

    cy.contains('Test User').should('be.visible');
    cy.contains('testuser').should('be.visible');
    cy.contains('Test Location').should('be.visible');
    cy.contains('+34 987 654 321').should('be.visible');
    cy.contains('unedited bio').should('be.visible');
    cy.get('img[alt="profile"]').should('have.length', 1);
  });
});
