# demo-airbnb

Automated tests with Cypress for airbnb website (demo) (without using test ids)

# Installation

Pre-requisite:
MacOS - Install `node`, preferably with `brew` - [link](https://formulae.brew.sh/formula/node)

Run the following command in the repo root directoy (directory package.json is found):

`$npm install`

# Local execution

Command defined in `package.json` - opens Cypress in open mode for development of tests and local execution.

`$ npm run cy:open`

Upon

# Command line execution

Command defined in `package.json` - should be used for specific execution in CI pipelines, uses cypress run which executes the tests in headless mode

`$ npm run cy:chrome`

`$ npm run cy:ff`

# Reports

Reports are generated in folder `cypress/reports` only for cypress run commands.

HTML and junit reports are generated, together with screenshot and videos.

`cypress/reports/local/junit`
`cypress/reports/local/videos`
`cypress/reports/local/index.html`
