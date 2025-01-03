import HomePage from 'cypress/pages/HomePage';

describe('Search and verify results', () => {
  let today, oneWeekFromToday;
  let home: HomePage;
  const guestsValues = { adults: 2, children: 1 };
  const expectedMinResults = 2;
  const locationString = 'Rome, Italy';

  before(() => {
    today = new Date();
    oneWeekFromToday = new Date();
    oneWeekFromToday.setDate(today.getDate() + 7);
  });

  beforeEach(() => {
    cy.visit(`${Cypress.env('WEB_URL')}`);
    cy.waitForLoading();
    home = new HomePage();
    cy.scrollTo('bottom');
    cy.waitForLoading();
    home.smallSearch.verifyVisible();
    home.smallSearch.openFullSearch();
    home.fullSearch.verifyVisible();
  });

  it('Result info on map', () => {
    home.fullSearch.enterDestination(locationString);
    home.fullSearch.enterDates(today, oneWeekFromToday);
    home.fullSearch.openGuests();
    home.fullSearch.enterGuests(guestsValues);
    home.fullSearch.clickSearch();
    home.verifyPropertyResultsLoaded(expectedMinResults);
    cy.then(() => {
      home.verifyPropertyHoverOnMap(0);
      home.verifyItemMapDetails(0);
    });
  });
});
