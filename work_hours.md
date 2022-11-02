Date | Hours | What I did
----- | ------- | ---------
3.1. | 5h | initiated project, started on csv parsing and input validation
5.1. | 9h | started on database, added first endpoints for files and data
6.1. | 4h | initiated react and redux, researched React Table library
7.1. | 5h | implemented first React Table, added reducer and endpoints for farm data
8.1. | 5h | began adding styling, added new components
10.1. | 5h | added more React components and styling
11.1. | 7h | added filtering based on date, reducer for filtered data
12.1. | 7h | added the functionality to upload csv files, refactoring on components
13.1. | 6h | added the functionality to delete farms and their data and add single data points
27.1. | 7h | refactoring on form components, added better input validation
28.1. | 5,5h | added first tests for frontend, added better notifications
29.1. | 4h | more frontend input validation tests
30.1. | 1h | added some styling
6.7. | 3h | started working on authentication
7.7. | 5,5h | tinkered with cors and finally got cookie-based authentication working, started working on authentication components for frontend
8.7. | 3,5h | made restricted routing/rendering more elegant, did some refactoring on frontend
14.9. | 1,5h | researched different pagination schemes
15.9. | 2h | moved db initialization to migration files, moved to containerized database
15.9. | 2h | researched cursor based pagination further, started working on an implementation
21.9. | 3h | implemented data point filtering based on url parameters
22.9. | 4h | implemented data point sorting based on url parameters, refactored error handling, used too much time on a pesky eslint bug
24.9. | 1h | created a config module, started on api testing with SuperTest
26.9. | 5h | added more api tests, made data validation more robust
28.9. | 5,5h | ditched react-table library and started working on my own ugly table implementation
29.9. | 5h | refactored form and input components with Formik
1.10. | 2h | fixed broken csv upload, added some data point formatting, refactored table components
2.10. | 0,5h | added farm filtering to DataPointTable
3.10. | 4h | added some styling, refactored stuff and added datapoint filtering by date
4.10. | 4h | researched error boundaries in react and different libraries for data fetching and caching, including rtk-query and react-query
5.10. | 5h | made changes to Farm model, new routes to farm controller, added pagination to farms, sketched out a single farm view to frontend, improved notifications, etc
6.10. | 5h | added a new MyFarmsView, refactored forms and moved them around the ui, added some styles and finally wrestled with sequelize queries in an attempt to include data point counts to farm objects (to no avail)
10.10. | 4,5h | added the functionality to fetch farm specific stats by year, month or day through new stats endpoint, tried to make query param parsing a bit tidier (not fully content with the result)
11.10. | 3,5h | added a new fancy line chart in SingleFarmView
12.10. | 3,5h | added styles, tinkered with the database query for fetching single farms by id, added the functionality to change the time interval in the new stat chart
13.10. | 3h | added a line chart to DataView, fixed some bugs, did some refactoring on DataView and DataPointTable
14.10. | 2h | started to fix the buggy reducers, many bugs remain
25.10. | 5h | refactored frontend reducers and error handling, added statReducer, tinkered with styles and refactored some components
26.10. | 4h | deployed the app to fly.io, fixed backend tests and some bugs related to float values
27.10. | 6,5h | added a CD workflow with GitHub Actions, a form for signing up and some styling
28.10. | 3h | added styles, refactored frontend error handling
30.10. | 2,5h | refactored forms, made form errors prettier, fixed tests
31.10. | 1,5h | did some manual testing and fixed some bugs, made uploading files a bit more user-friendly
1.11. | 2,5h | switched to memory storage for file uploads to make things work on fly.io, added a better catch-all for backend for it to serve the static frontend content more reliably, updated readme, added small fixes
2.11. | 3 | added frontend and backend images to docker-compose.dev file for convenience, updated readme, made sure the config works out-of-the-box
sum | 176,5 |