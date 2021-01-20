// Set the express app variable
const express = require('express');
const app = express();
// Path module used in settings the views and templating engine
const path = require('path');
// Import the router module
const router = require('./routes/index');
// Set the port for the app
const port = 3000;

// Setting the path for the views and templating engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Setting a static route for the static server
app.use('/static', express.static('public'));

// Setup the app to use the router module
app.use('/', router);

// 404 error handler
app.use((req, res, next) => {
    const err = new Error('Looks like the page you requested does not exist');
    err.status = 404;
    console.log(`${err.message} - Error: ${err.status}`);
    next(err);
});

// General errors hanler
app.use((err, req, res, next) => {
    if(err.status === 404) {
      res.status = 404;
      res.render('page-not-found', {err});
    } else {
      err.message = err.message || `Oops! Something went wrong on the server`;
      res.status(err.status || 500)
      console.log(`${err.message} - Error: ${err.status}`); 
      res.render('error', {err});
    }
});

// Setup the listening port for the app
app.listen(process.env.PORT || `${port}`, () => {
    console.log(`The app is listening on port: ${port}`);
});