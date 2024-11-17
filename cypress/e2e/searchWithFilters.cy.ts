import AmenitiesDialog from 'cypress/pages/components/dialogs/AmenitiesDialog';
import SearchFilters from 'cypress/pages/components/SearchFilters';
import HomePage from 'cypress/pages/HomePage';
import PropertyPage from 'cypress/pages/PropertyPage';

describe('Search and verify results', () => {
  let today, oneWeekFromToday;
  let home: HomePage;
  let property: PropertyPage;
  const guestsValues = { adults: 2, children: 1 };
  const expectedMinResults = 2;
  const locationString = 'Rome, Italy';
  const amenities = ['Pool', 'Hot tub'];

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
    home.fullSearch.enterDestination(locationString);
    home.fullSearch.enterDates(today, oneWeekFromToday);
    home.fullSearch.openGuests();
    home.fullSearch.enterGuests(guestsValues);
    home.fullSearch.clickSearch();
    home.verifyPropertyResultsLoaded(expectedMinResults);
  });

  it('With filters - 5 bedrooms & pool', () => {
    home.openFilters();
    SearchFilters.selectBedrooms(5);
    SearchFilters.selectAmenities(amenities[0]);
    SearchFilters.openResults();
    home.verifyPropertyResultsLoaded(expectedMinResults);
    home.openResultItem(0);
    property = new PropertyPage();
    property.openAmenities();
    AmenitiesDialog.verifyItemInList('pool');
  });
});
