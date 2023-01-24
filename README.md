## Description
A REST API application by Nest.js that handles the artist API from the endpoint [artist.search](https://github.com/nestjs/nest).

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```



## Endpoints
```bash
# searh for a artist by name and return a list of all matching artist.
# when there is no results from the endpoint, it retrieves a random artist name from the data/artists.json.
GET localhost:3000/artist/:name

# save the searching result as a csv file named by the user.
# the csv files will be saved in data folder.
POST localhost:3000/csv/:name


```



## License

[MIT licensed](LICENSE).
