class AmenitiesDialog {
  private get containerElem() {
    return cy.get('[aria-label="What this place offers"]');
  }

  private get listItems() {
    return this.containerElem.find('section').find('li');
  }

  verifyItemInList = (itemName: string) => {
    this.listItems.contains(itemName).should('exist').scrollIntoView().should('be.visible');
  };
}

export default new AmenitiesDialog();
