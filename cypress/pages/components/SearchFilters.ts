class SearchFilters {
  private get containerElem() {
    return cy.get('[aria-label="Filters"]');
  }

  private get amenitiesContainerElem() {
    return this.containerElem.find(
      '[aria-labelledby="filter-section-heading-id-FILTER_SECTION_CONTAINER:MORE_FILTERS_AMENITIES_WITH_SUBCATEGORIES"]'
    );
  }

  private get showPropertiesBtn() {
    return this.containerElem.find('footer > button').siblings('div').first();
  }

  private getAmenityBtn = (name: string) => {
    return this.amenitiesContainerElem.find('span').contains(name).parent('button');
  };

  selectBedrooms(targetValue: number) {
    // define alias for parent elem
    this.containerElem.find('#stepper-filter-item-min_bedrooms').as('bedroomStepper');
    cy.get('@bedroomStepper')
      .find('[data-testid="stepper-filter-item-min_bedrooms-stepper-value"]')
      .invoke('text')
      .then((currentValue) => {
        const currentBedrooms =
          currentValue.trim() === 'Any' ? 0 : parseInt(currentValue.trim(), 10);
        // diff steps
        const difference = targetValue - currentBedrooms;
        if (difference > 0) {
          for (let i = 0; i < difference; i++) {
            cy.get('@bedroomStepper')
              .find('[data-testid="stepper-filter-item-min_bedrooms-stepper-increase-button"]')
              .click();
          }
        } else if (difference < 0) {
          for (let i = 0; i < Math.abs(difference); i++) {
            cy.get('@bedroomStepper')
              .find('[data-testid="stepper-filter-item-min_bedrooms-stepper-decrease-button"]')
              .click();
          }
        }
        // verify final value
        cy.get('@bedroomStepper')
          .find('[data-testid="stepper-filter-item-min_bedrooms-stepper-value"]')
          .should('contain.text', targetValue === 0 ? 'Any' : targetValue.toString());
      });
  }

  selectAmenities = (name: string) => {
    this.getAmenityBtn(name)
      .invoke('attr', 'aria-pressed')
      .then((attrVal) => {
        if (attrVal === 'true') {
          cy.log(`Amenity=${name} is already selected`);
        } else {
          this.getAmenityBtn(name).click();
        }
      });
    this.getAmenityBtn(name).should('have.attr', 'aria-pressed', 'true');
  };

  openResults = () => {
    this.showPropertiesBtn.click();
    cy.waitForLoading();
  };

  verifyIsDisplayed = () => {
    this.containerElem.should('be.visible');
  };
}

export default new SearchFilters();
