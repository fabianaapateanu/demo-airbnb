import { generateBedRegex } from 'cypress/util/regexUtil';

class ResultItemComponent {
  private itemIdx: number;

  private get itemContainer() {
    return cy.get('[itemprop="itemListElement"]').eq(this.itemIdx);
  }

  private get infoContainer() {
    return this.itemContainer.find('[aria-labelledby*="title_"] > div > div').eq(1);
  }

  private get imageTileLink() {
    return this.infoContainer.parent().siblings('a').first();
  }

  private get imageTileContainer() {
    return this.itemContainer.find('[aria-labelledby*="title_"] > div > div').eq(0);
  }

  private get nameElem() {
    return this.infoContainer.find('> div').eq(0);
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
}

export default ResultItemComponent;
