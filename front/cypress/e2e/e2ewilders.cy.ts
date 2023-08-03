describe("template spec", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("passes", () => {
    cy.get('[data-cy="addBtn"]').type("Coucou les jaunes");
    cy.get('[test-id="submitBtn"]').click();
  });
  it("verify new wilder", () => {
    // contain text john
    // exist
    cy.contains("Coucou les jaunes").should("exist");
  });
  it(" verify copyrigth", () => {
    cy.contains("2023 Wild Code School").should("exist");
  });
});
