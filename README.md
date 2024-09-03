# budgethack## Description

BudgetHack (A performant budgetting system).

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Contributing to Source Code

```bash
# pull the dev branch
$ git pull dev

# run migrations (if any)
$ npm run migration:run

# Create a branch for your feature/fix/issue
$ git checkout dev
$ git checkout -b ＜new-branch＞

- Make your changes

# Generate Migrations (if needed)
$ npm run migration:generate -- src/database/migrations/<migration-name＞

# Generate Migrations (if needed)
$ npx typeorm -d dist/data-source.js migration:generate src/database/migrations/<migration-name>

- Commit your changes

- Push your changes to your branch

- Create a pull request to the dev branch
```