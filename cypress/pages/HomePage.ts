import FullSearchComponent from './components/FullSearchComponent';
import ResultsListComponent from './components/ResultsListComponent';
import SearchFilters from './components/SearchFilters';
import SmallSearchComponent from './components/SmallSearchComponent';

class HomePage {
  smallSearch: SmallSearchComponent;
  fullSearch: FullSearchComponent;
  resultList: ResultsListComponent;

  constructor() {
    this.smallSearch = new SmallSearchComponent();
    this.fullSearch = new FullSearchComponent();
    this.resultList = new ResultsListComponent();
  }

  private get filtersContainer() {
    return cy.get('[aria-label="Airbnb Categories"]').parent().siblings('div').first();
  }

  private get filtersBtn() {
    return this.filtersContainer.find('button').contains('Filters');
  }

  hoverOnProperty = (itemIdx: number) => {
    this.resultList.list[itemIdx].hoverOnTile();
  };

  verifyPropertyResultsLoaded = (noOfResults: number) => {
    this.resultList.resultsLength.should('be.gte', noOfResults);
    this.resultList.loadResults();
  };

  // will not work for other recommended results from other lanes
  // like 'Available for similar dates'
  verifyPropertySearchResults = (noOfGuests: number) => {
    const maxNo = this.resultList.list.length <= 6 ? this.resultList.list.length : 6;
    for (let i = 0; i < maxNo; i += 1) this.resultList.list[i].verifyNoOfBeds(noOfGuests);
  };

  openFilters = () => {
    this.filtersBtn.click();
    SearchFilters.verifyIsDisplayed();
  };

  openResultItem = (itemIdx: number) => {
    this.resultList.list[itemIdx].clickOnImageTile();
  };

  verifyPropertyHoverOnMap = (itemIdx: number) => {
    this.hoverOnProperty(itemIdx);
    this.resultList.list[itemIdx].getItemPricePerNight().then((priceValue) => {
      // Locate the parent div via the child span containing the given price value
      cy.contains('span[aria-hidden="true"]', `${priceValue}`)
        .closest('div')
        .parent('div')
        .as('parentDiv');
      // Verify the sibling <span> element appears, it contains the text 'selected'
      cy.get('@parentDiv').siblings('span').should('exist').and('have.text', 'selected');
      // Verify the parent <div>'s style attribute changes, background-color changes
      cy.get('@parentDiv')
        .should('have.attr', 'style')
        .and('include', 'background-color: var(--linaria-theme_palette-hof)');
    });
  };

  openPropertyMapDetails = (itemIdx: number) => {
    this.resultList.list[itemIdx].getItemPricePerNight().then((priceValue) => {
      cy.contains('span[aria-hidden="true"]', `${priceValue}`)
        .closest('div')
        .parent('div')
        .as('parentDiv');
      cy.get('@parentDiv').click();
    });
  };

  verifyItemMapDetails = (itemIdx: number) => {
    this.openPropertyMapDetails(itemIdx);
    this.resultList.list[itemIdx].getAttributeAriaLabeledBy().then((attrVal) => {
      // first one in the results, second in the map
      cy.get(`div[aria-labelledby=${attrVal}]`).should('have.length', 2);
      cy.get(`div[aria-labelledby=${attrVal}]`)
        .eq(1)
        .find(`> div > div`)
        .eq(1)
        .then(($elem) => {
          cy.wrap($elem)
            .find('> div')
            .eq(0)
            .invoke('text')
            .then((name) => {
              this.resultList.list[itemIdx].nameElem.invoke('text').then((expectedName) => {
                expect(expectedName.trim()).to.eq(name.trim());
              });
            });
          cy.wrap($elem)
            .find('> div')
            .eq(1)
            .invoke('text')
            .then((sub1) => {
              this.resultList.list[itemIdx].subtitleElem1.invoke('text').then((expectedSub1) => {
                expect(expectedSub1.trim()).to.eq(sub1.trim());
              });
            });
          cy.wrap($elem)
            .find('> div')
            .eq(2)
            .invoke('text')
            .then((sub2) => {
              this.resultList.list[itemIdx].subtitleElem2.invoke('text').then((expectedSub2) => {
                expect(expectedSub2.trim()).to.eq(sub2.trim());
              });
            });
          cy.wrap($elem)
            .find('> div')
            .eq(3)
            .invoke('text')
            .then((price) => {
              this.resultList.list[itemIdx].priceElem.invoke('text').then((expectedPrice) => {
                expect(expectedPrice.trim()).to.contain(price.trim());
              });
            });
          cy.wrap($elem)
            .find('> span > span')
            .invoke('text')
            .then((rating) => {
              this.resultList.list[itemIdx].ratingElem.invoke('text').then((expectedRating) => {
                expect(expectedRating.trim()).to.contain(rating.trim());
              });
            });
        });
    });
  };
}

export default HomePage;
