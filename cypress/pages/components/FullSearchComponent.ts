import { getDateObj } from 'cypress/util/dateUtil';

class FullSearchComponent {
  private adultsSelector: string = '[aria-describedby="searchFlow-title-label-adults"]';
  private childrenSelector: string = '[aria-describedby="searchFlow-title-label-children"]';
  private infantsSelector: string = '[aria-describedby="searchFlow-title-label-infants"]';

  private get containterElem() {
    return cy.get('[aria-labelledby="search-block-tab-STAYS"]');
  }

  private get whereInputElem() {
    return this.containterElem.find('input[name="query"]');
  }

  private get whoContainerElem() {
    return cy.get('[data-panel-bounds="true"] > div > div').eq(4);
  }

  private get searchBtn() {
    this.whoContainerElem.find('> div').eq(1).find('> div').should('have.length.gte', 2);
    return this.whoContainerElem
      .find('> div')
      .eq(1)
      .find('> div')
      .find('button')
      .contains('Search');
  }

  private get searchSuggestions() {
    return cy.get('div[aria-label="Search suggestions"]');
  }

  clickSearch() {
    this.searchBtn.click();
    cy.waitForLoading();
  }

  openGuests = () => {
    this.whoContainerElem.find('div').eq(2).hoverElem();
    this.whoContainerElem.find('div').eq(2).click();
  };

  enterDestination = (location: string) => {
    this.whereInputElem.hoverElem();
    this.whereInputElem.type(location);
    this.searchSuggestions.should('be.visible').within(() => {
      cy.contains(location).click({ force: true });
    });
  };

  /**
   * Simple form with current month and next month which are in calendar view
   * @param checkInDate
   * @param checkOutDate
   */
  enterDates = (checkInDate: Date, checkOutDate: Date) => {
    const checkInFormatted = getDateObj(checkInDate);
    const checkOutFormatted = getDateObj(checkOutDate);
    const currentMonthTableIdx = 1;
    let nextMonthTableIdx = 1;
    if (checkOutFormatted.month > checkInFormatted.month) {
      console.log('Checkout date is next month');
      nextMonthTableIdx = 2;
    }
    this.selectCalendarDay(currentMonthTableIdx, checkInFormatted.day);
    this.selectCalendarDay(nextMonthTableIdx, checkOutFormatted.day);
  };

  enterGuests = (guests: any) => {
    const adults = guests.adults ? guests.adults : 0;
    const children = guests.children ? guests.children : 0;
    const infants = guests.infants ? guests.infants : 0;
    this.selectGuests(this.adultsSelector, adults);
    this.selectGuests(this.childrenSelector, children);
    this.selectGuests(this.infantsSelector, infants);
  };

  /**
   * Select day in corresponding month
   * @param monthTableIdx 1 = curr month, 2 = next month
   * @param dayValue 1-31
   */
  private selectCalendarDay = (monthTableIdx: number, dayValue: string) => {
    cy.get('[aria-labelledby="tab--tabs--0"]')
      .find('table')
      .eq(monthTableIdx)
      .find('[data-is-day-blocked="false"]')
      .each(($el) => {
        const innerTxt = $el.text().trim();
        if (innerTxt && innerTxt.includes(dayValue)) {
          cy.wrap($el).click({ force: true });
          return false;
        }
      });
  };

  private selectGuests = (optionSelector: string, noOfGuests: number) => {
    const currentValElemSel = 'div > span[aria-hidden="true"]';
    cy.get(optionSelector)
      .parent()
      .within(() => {
        // Get the current value
        cy.get(currentValElemSel)
          .invoke('text')
          .then((currentValue) => {
            const currentGuests = parseInt(currentValue.trim(), 10);
            const difference = noOfGuests - currentGuests;
            // increase the value
            if (difference > 0) {
              for (let i = 0; i < difference; i++) {
                cy.get('button[aria-label="increase value"]').click();
              }
            }
            // decrease the value
            if (difference < 0) {
              for (let i = 0; i < Math.abs(difference); i++) {
                cy.get('button[aria-label="decrease value"]').click();
              }
            }
            // expected value
            cy.get(currentValElemSel).should('have.text', noOfGuests.toString());
          });
      });
  };

  verifyVisible = () => {
    cy.get('[data-searchbar-open="true"]').should('be.visible');
    this.containterElem.should('be.visible');
  };

  // TODO
  private getDiffInMonths = (targetDate: Date): Cypress.Chainable<number> => {
    return cy
      .get('[data-visible="true"] section > h2')
      .invoke('text')
      .then((currMonth) => {
        const currentMonthYear = new Date(currMonth);
        const diffInMonths =
          (targetDate.getFullYear() - currentMonthYear.getFullYear()) * 12 +
          (targetDate.getMonth() - currentMonthYear.getMonth());
        return diffInMonths;
      });
  };

  // TODO
  private selectCalendarMonth = (targetDate: Date) => {
    cy.get('[data-visible="true"] section > h2')
      .invoke('text')
      .then((currMonth) => {
        const currentMonthYear = new Date(currMonth);
        const diffInMonths =
          (targetDate.getFullYear() - currentMonthYear.getFullYear()) * 12 +
          (targetDate.getMonth() - currentMonthYear.getMonth());
        for (let i = 0 && diffInMonths > 1; i < diffInMonths; i++) {
          cy.get('button[aria-label="Move forward to switch to the next month."]').click();
        }
      });
  };
}

export default FullSearchComponent;
