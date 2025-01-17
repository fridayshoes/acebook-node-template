describe("Timeline", function() {
  it("can can view comments on post", function() {
    
    cy.task('emptyPosts', 'emptyUsers').then(() => {

    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#name").type("name");
    cy.get("#surname").type("surname");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("Create New Post").click();
    cy.get("#new-post-form").find('#message').type("Hello, world!");
    cy.get("#new-post-form").submit();
  
    // comment on post
    cy.get('#comment-button:last').click();
    cy.get('#comment-post-form').find('#comments').type('This is a comment');
    cy.get('#comment-post-form').submit();

    // check if the comment appears in the correct div class
    cy.get(".Comment-List").should("contain", 'This is a comment');
  });
});
})


