import React from "react";
import AddWilderForm from "./AddWilderForm";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

describe("<AddWilderForm />", () => {
  beforeEach(() => {
    cy.intercept("POST", "http://localhost:5000/graphql", (req) => {
      if (req.body.operationName === "CREATE_WILDER") {
        req.alias = "gqlCreateWilderQuery";
      }
      if (req.body.operationName === "GetAllWilders") {
        req.alias = "gqlGetWilderQuery";
      }
    });
  });
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <ApolloProvider client={client}>
        <AddWilderForm />
      </ApolloProvider>
    );
    cy.get('[data-cy="name"]').type("John Doe");
    cy.get('[data-cy="submitBtn"]').click();
    cy.wait("@gqlCreateWilderQuery")
      .its("response.body.data.createWilder")
      .should("have.property", "name")
      .and("eq", "John Doe");
    cy.wait("@gqlGetWilderQuery")
      .its("response.body.data.getAllWilders")
      // have legnth more than 0
      .should("have.length.greaterThan", 0);
  });
});
