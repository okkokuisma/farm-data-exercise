# Farm-app
Course project for the course [Full Stack Open](https://fullstackopen.com/). Inspired by Solita's farm data exercise for Solita Dev Academy 2022. 

The app is designed to store and display added farm data. Data points can be added by a form or a CSV file. CSV files should contain data points in the form of <farm name, date, metric type, metric value>, for example "Noora's farm,2019-01-05T09:29:53.837Z,pH,6.26".

To run the app locally, start the database with `docker-compose -f docker-compose.dev.yml up` in project root and the app with `npm start` in the /backend directory. The app starts in port 3003.

The app is also running on Fly.io and can be accessed [here](https://farm-app.fly.dev/)
