import ResultItemComponent from './ResultItemComponent';

class ResultsListComponent {
  list: Array<ResultItemComponent> = [];

  constructor() {
    this.list = [];
  }

  get resultsLength() {
    return cy.get('[itemprop="itemListElement"]').its('length');
  }

  loadResults = () => {
    cy.scrollTo('top', { duration: 650 });
    this.resultsLength.then((size) => {
      this.list = Array.from({ length: size }, (_, index) => new ResultItemComponent(index));
    });
  };
}

export default ResultsListComponent;
