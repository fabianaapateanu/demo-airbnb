import TranslationsDialog from './components/dialogs/TranslationsDialog';

class PropertyPage {
  constructor() {
    TranslationsDialog.closeIfVisible();
  }

  private get containerElem() {
    return cy.get('section').contains('What this place offers');
  }

  private get amenitiesSection() {
    return this.containerElem.parent('div').parent().parent('section');
  }

  private get amenitiesMoreBtn() {
    return this.amenitiesSection.find('button');
  }

  openAmenities = () => {
    this.amenitiesMoreBtn.click();
  };
}

export default PropertyPage;
