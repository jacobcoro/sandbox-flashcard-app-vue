// https://docs.cypress.io/api/introduction/api.html
// example here:
// https://github.com/cypress-io/cypress-example-todomvc/blob/master/cypress/integration/app_spec.js

// type definitions for Cypress object "cy"
/// <reference types="cypress" />
// @ts-check

// on vuex persist version, leave the tab and check that its persisted when we come back

// does basic component render happen
// create a deck, does it appear
// create a card, does it appear
// edit a card, does popup show
// edit a card, does it change
// edit a card, cancel, does it close and not change.
// delet a card, does it work?
const routeNames = ['VanillaCRUD', 'VuexPersisted'];

const testRoute = (routeName) => {
  describe(routeName, () => {
    // beforeEach(() => {

    // });
    cy.visit('/' + routeName);
    it('Visits the app url', () => {
      cy.contains('h1', 'Welcome to Your Vue.js + TypeScript App');
    });
  });
};

routeNames.forEach(testRoute);
