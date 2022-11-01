# Farm-app
Course project for the course [Full Stack Open](https://fullstackopen.com/). Inspired by [Solita's farm data exercise](https://github.com/solita/dev-academy-2022-exercise) for Solita Dev Academy 2022. 

The app is designed to store and display added farm data. Users can create farms, add data points to their own farms and browse data points across all farms, including other users' farms. Data points can be added by a form or a CSV file. CSV files should contain data points in the form of `[farm name],[date],[metric type],[metric value]`, for example "Noora's farm,2019-01-05T09:29:53.837Z,pH,6.26". A valid CSV file is provided in this repository for your convenience.

To run it locally, the app expects environment variables POSTGRES_PASSWORD, POSTGRES_USER, POSTGRES_DB, DB_HOST, DB_PORT, SERVER_PORT and JWT_SECRET to be defined. Create an .env file with the variables defined and place it in the project root. You can use the provided docker-compose file to start the database with `docker-compose -f docker-compose.dev.yml up` in the project root directory. To start the app, run `npm start` in the /backend directory. Command `npm test` runs the meagre number of tests I have so far mustered for this project.

The app is also running on Fly.io and can be accessed [here](https://farm-app.fly.dev/)
