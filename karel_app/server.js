const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");

// create express app
const app = express();
// Setup server port
const port = process.env.PORT || 5000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(express.static(__dirname + '/static',{index: 'index2.html'}));
// Require reporter routes
const reporterRoutes = require('./src/routes/reporter.routes')
const articleRoutes = require('./src/routes/article.routes')
const surveyRoutes = require('./src/routes/survey.routes')
// using as middleware
app.use('/api/v1/reporters', reporterRoutes)
app.use('/api/v1/articles', articleRoutes)
app.use('/api/v1/surveys', surveyRoutes)
// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
