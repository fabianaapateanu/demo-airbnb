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
}

export default HomePage;
