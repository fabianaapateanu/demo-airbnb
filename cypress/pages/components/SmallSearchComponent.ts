class SmallSearchComponent {
  private get containterElem() {
    return cy.get('[aria-labelledby="search-block-tab-STAYS"]');
  }

  private get searchContainerElem() {
    return cy.get('[aria-labelledby="littleSearchLabel"]');
  }

  private get anywhereBtnElem() {
    return this.searchContainerElem.find('button').eq(0);
  }

  openFullSearch = () => {
    this.searchContainerElem.should('be.visible');
    this.anywhereBtnElem.click();
  };

  verifyVisible = () => {
    cy.get('[data-searchbar-open="false"]').should('be.visible');
    this.searchContainerElem.should('be.visible');
  };
}

export default SmallSearchComponent;
