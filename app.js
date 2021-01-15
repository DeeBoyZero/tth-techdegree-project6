const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes/index');
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/static', express.static('public'));
app.use('/', router);

app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if(err.status === 404) {
      res.status = 404;
      res.send(`<h1>${err.message} ${err.status}</h1><p>${err.stack}</p>`);
    } else {
      err.message = err.message || `Oops! It looks like something went wrong on the server.`;
      res.status(err.status || 500) 
      res.send(`<h1>${err.message} ${err.status}</h1><p>${err.stack}</p>`);
    }
});

app.listen(`${port}`, () => {
    console.log(`The app is listening on port: ${port}`);
})