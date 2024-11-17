import 'cypress-network-idle';
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      hoverElem(): Chainable<JQuery<HTMLElement>>;
      hoverMouseEnter(): void;
      clickOutside(): void;
      hoverClose(): void;
      waitForLoading(): void;
      waitForLoadingElements(): void;
      waitForLoadingRequests(): void;
    }
  }
}

//=============================== Elements commands ==================================================//
Cypress.Commands.add('hoverMouseEnter', { prevSubject: 'element' }, (subject) => {
  cy.wrap(subject).trigger('mouseenter', { force: true, timeout: 500 });
});

Cypress.Commands.add('clickOutside', { prevSubject: 'element' }, () => {
  return cy.get('body').click(0, 0);
});

Cypress.Commands.add('hoverElem', { prevSubject: 'element' }, (subject) => {
  cy.wrap(subject).scrollIntoView();
  cy.wrap(subject).trigger('mouseenter', { timeout: 500 });
  cy.wrap(subject).trigger('mouseenter', { timeout: 500 });
  return cy.wrap(subject);
});

Cypress.Commands.add('hoverClose', { prevSubject: 'element' }, (subject) => {
  cy.wrap(subject).trigger('mouseleave', { force: true });
});

//=============================== Loading commands ==================================================//
Cypress.Commands.add('waitForLoadingElements', () => {
  cy.get('body').find('[aria-label="Loading"]', { timeout: 10000 }).should('have.length.lte', 1);
  cy.get('body').find('.spinner', { timeout: 10000 }).should('have.length.lte', 1);
  cy.get('body').find('.loading', { timeout: 10000 }).should('have.length.lte', 1);
});

Cypress.Commands.add('waitForLoadingRequests', () => {
  cy.waitForNetworkIdle(`**/tracking/**`, 250);
  cy.waitForNetworkIdle(`**/collect/**`, 250);
  cy.waitForNetworkIdle('**/api/v2/**', 250);
  cy.waitForNetworkIdle('**/api/v3/**', 250);
});

Cypress.Commands.add('waitForLoading', () => {
  cy.waitForLoadingRequests();
  cy.waitForLoadingElements();
});

//=============================== Other commands ==================================================//
