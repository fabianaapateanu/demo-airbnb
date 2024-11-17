import TranslationsDialog from './components/dialogs/TranslationsDialog';

class PropertyPage {
  constructor() {
    TranslationsDialog.closeIfVisible();
  }

  private get containerElem() {
    return cy.get('[data-pageslot="true"]');
  }

  private get amenitiesSection() {
    return this.containerElem.eq(13);
  }

  private get amenitiesMoreBtn() {
    return this.amenitiesSection.find('button');
  }

  openAmenities = () => {
    this.amenitiesMoreBtn.click();
  };
}

export default PropertyPage;
