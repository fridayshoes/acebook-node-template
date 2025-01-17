describe("User can view others' Profile Page", function() {
  it('goes to the Profile Page', () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#name").type("name");
    cy.get("#surname").type("surname");
    cy.get("#submit").click();

    // log in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("Create New Post").click();

    cy.get("#new-post-form").find('#message').type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.get(".posts").should("contain", "Hello, world!");
    cy.get(".posts").should("contain", "someone@example.com");
    
    // log out
    cy.get("#sign-out-button").click();

    // sign up as second user
    cy.visit("/users/new");
    cy.get("#email").type("newperson@example.com");
    cy.get("#password").type("password");
    cy.get("#name").type("second name");
    cy.get("#surname").type("second surname");
    cy.get("#submit").click();

    // log in as second user
    cy.visit("/sessions/new");
    cy.get("#email").type("newperson@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // click to go through to the other person's page
    cy.get(".profile-link").first().submit();
    cy.get('.greeting').should("contain", "Welcome to someone@example.com");
  });

  it('checks for another users posts', () => {
    // sign up & log out
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#name").type("name");
    cy.get("#surname").type("surname");
    cy.get("#submit").click();

    // log in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("Create New Post").click();

    cy.get("#new-post-form").find('#message').type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.get(".posts").should("contain", "Hello, world!");
    cy.get(".posts").should("contain", "someone@example.com");

    // sign up as second user
    cy.visit("/users/new");
    cy.get("#email").type("newperson@example.com");
    cy.get("#password").type("password");
    cy.get("#name").type("second name");
    cy.get("#surname").type("second surname");
    cy.get("#submit").click();

    // log in as second user
    cy.visit("/sessions/new");
    cy.get("#email").type("newperson@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // click to go through to the other person's page
    cy.get(".profile-link").first().submit();
    cy.get('.greeting').should("contain", "Welcome to someone@example.com");

    // expect post
    cy.get(".post-container").should("contain", "Hello, world!");
  });
});