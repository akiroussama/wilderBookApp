describe("template spec", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("add new wilder", () => {
    cy.get('[data-cy="name"]').type("John Doe");
    cy.get('[data-cy="submitBtn"]').click();
  });
  it("verify new wilder", () => {
    // contain text john
    // exist
    cy.contains("John Doe").should("exist");
  });
  it("delete wilder", () => {
    cy.get('[data-cy="delete-John Doe"]').click();
  });
  it(" verify copyrigth", () => {
    cy.contains("2022 Wild Code School").should("exist");
  });
});
