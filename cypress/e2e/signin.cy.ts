/// <reference types="cypress" />

describe("SigninForm", () => {
  beforeEach(() => {
    // Visit the sign-in page
    cy.visit("http://localhost:5173/signin");
  });

  it("successfully signs in with valid credentials", () => {
    // Fill in the email and password fields
    cy.get("#userEmail").type("admin2003@gmail.com");
    cy.get("#userPassword").type("edulearn2003");

    // Submit the form
    cy.get("form").submit();

    // Assert that the user is redirected to the home page after successful sign-in
    cy.url().should("eq", "http://localhost:5173/"); // Adjust this URL according to your application's redirect after sign-in
  });

  it("displays error message for invalid credentials", () => {
    // Fill in the email and password fields with invalid credentials
    cy.get("#userEmail").type("invalid@example.com");
    cy.get("#userPassword").type("invalidpassword");

    // Submit the form
    cy.get("form").submit();

    // Assert that the error message is displayed
    cy.get(".text-red-500").should("contain", "Invalid email or password");
  });
});
