import { generateBedRegex } from 'cypress/util/regexUtil';

class ResultItemComponent {
  private divInfoSel = 'div[aria-labelledby*="title_"]';
  private itemIdx: number;

  private get itemContainer() {
    return cy.get('[itemprop="itemListElement"]').eq(this.itemIdx);
  }

  private get infoContainer() {
    return this.itemContainer.find(`${this.divInfoSel} > div > div`).eq(1);
  }

  private get imageTileLink() {
    return this.infoContainer.parent().siblings('a').first();
  }

  private get imageTileContainer() {
    return this.itemContainer.find(`${this.divInfoSel} > div > div`).eq(0);
  }

  get nameElem() {
    return this.infoContainer.find('> div').eq(0);
  }

  get subtitleElem1() {
    return this.infoContainer.find('> div').eq(1);
  }

  get subtitleElem2() {
    return this.infoContainer.find('> div').eq(2);
  }

  get priceElem() {
    return this.infoContainer.find('> div').eq(3);
  }

  get ratingElem() {
    return this.infoContainer.find('> div').eq(4);
  }

  get priceElemNight() {
    return this.infoContainer.find('> div').eq(3).find('div[aria-hidden="true"] > span').eq(1);
  }

  private get bedsElem() {
    return this.infoContainer.find('> div').eq(2).find('> span > span').eq(0);
  }

  constructor(itemIdx: number) {
    this.itemIdx = itemIdx;
  }

  verifyNoOfBeds = (noOfGuests: number) => {
    this.bedsElem
      .scrollIntoView()
      .invoke('text')
      .then((txtVal) => {
        const actual = txtVal.trim();
        const pattern = generateBedRegex(noOfGuests);
        expect(actual).to.match(pattern, `Expected "${actual}" to match the bed pattern.`);
      });
  };

  clickOnImageTile = () => {
    this.imageTileLink.invoke('removeAttr', 'target').click({ force: true });
    cy.waitForLoading();
  };

  hoverOnTile = () => {
    this.imageTileContainer.hoverElem();
  };

  getItemPricePerNight = (): Cypress.Chainable<string> => {
    return this.priceElemNight.invoke('text').then((value: string) => value.trim().match(/\d+/)[0]);
  };

  getAttributeAriaLabeledBy = (): Cypress.Chainable<string> => {
    return this.itemContainer.find(this.divInfoSel).invoke('attr', 'aria-labelledby');
  };
}

export default ResultItemComponent;
