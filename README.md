# Farm-app
Course project for the course [Full Stack Open](https://fullstackopen.com/). Inspired by [Solita's farm data exercise](https://github.com/solita/dev-academy-2022-exercise) for Solita Dev Academy 2022.

The app is designed to store and display added farm data. Users can create farms, add data points to their own farms and browse data points across all farms, including other users' farms. Data points can be added by a form or a CSV file. CSV files should contain data points in the form of `[farm name],[date],[metric type],[metric value]`, for example "Noora's farm,2019-01-05T09:29:53.837Z,pH,6.26". A valid CSV file is provided in this repository for your convenience.

### Run the app locally
1. Clone the project with `git clone https://github.com/okkokuisma/farm-data-exercise.git`.
2. The app expects environment variables POSTGRES_PASSWORD, POSTGRES_USER, POSTGRES_DB, SERVER_PORT and JWT_SECRET to be defined. Create a .env file with the variables defined and place it in the project root.
3. You can use the provided docker-compose.dev.yml file to run a database and the backend and frontend processes in docker containers. To do so, run `docker-compose -f docker-compose.dev.yml up` in the project root directory.
4. To run backend tests, define environment variable TEST_DB_PORT in the same .env file you just created and start a test database with `docker-compose -f docker-compose.db.yml up` in the project root directory. Next, navigate to /backend and install dependencies with `npm install`. Finally, run the tests with `npm test`.

The app is also running on Fly.io for demoing purposes and can be accessed [here](https://farm-app.fly.dev/).
