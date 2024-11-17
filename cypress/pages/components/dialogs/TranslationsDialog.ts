class TranslationDialog {
  private get containerElem() {
    return cy.get('[aria-label="Translation on"]');
  }

  private get closeBtn() {
    return this.containerElem.find('[aria-label="Close"]');
  }

  closeIfVisible = () => {
    this.containerElem.then(($el) => {
      if ($el.length > 0) {
        this.closeBtn.click();
        this.containerElem.should('not.exist');
      } else {
        cy.log('Translations on dialog is not visible');
      }
    });
  };
}

export default new TranslationDialog();
