describe("SignupForm", () => {
  beforeEach(() => {
    cy.visit("https://edulearn-react.netlify.app/signup");
  });

  it("successfully signs up with valid credentials", () => {
    const baseEmail = "test"; // Base email address
    const timestamp = new Date().getTime(); // Get current timestamp
    const uniqueEmail = `${baseEmail}_${timestamp}@example.com`; // Unique email address

    cy.get("#userName").type("Test User");
    cy.get("#userEmail").type(uniqueEmail); // Use the unique email address
    cy.get("#userPassword").type("password123");
    cy.get("#role").select("student");

    cy.get("form").submit();

    cy.log("Form submitted successfully");

    cy.wait(5000); // Adjust the wait time as necessary

    cy.url().then((url) => {
      cy.log("Current URL:", url);
    });

    cy.url().should("eq", "https://edulearn-react.netlify.app/signin");
  });
});
