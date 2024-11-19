class AmenitiesDialog {
  private get containerElem() {
    return cy.get('[aria-label="What this place offers"]');
  }

  private get listItems() {
    return this.containerElem.find('section').find('li');
  }

  verifyItemInList = (itemName: string) => {
    const regex = new RegExp(itemName, 'i');
    this.listItems.contains(regex).should('exist').scrollIntoView().should('be.visible');
  };
}

export default new AmenitiesDialog();
