// Setup the express app variable
const express = require('express');
// Intialize the express router
const router = express.Router();
// Import the projects data
const { projects } = require('../data.json');

// Root route handler
router.get('/', (req, res) => {
    res.render('index', {projects});
});

// About route handler
router.get('/about', (req, res) => {
    res.render('about');
});

// Projects dynamics route handler
router.get('/project/:id', (req, res, next) => {
    if (projects[req.params.id]) {
        const projectId = req.params.id;
        const project = projects.find(({id}) => id === +projectId);
        res.render('project', {project});
    } else {
        const err = new Error();
        err.status = 404;
        err.message = 'Looks like the page you requested does not exist';
        console.log(`${err.message} - Error: ${err.status}`);
        next(err);
    }
});

// Projects dynamics route handler ( accept both project and projects )
router.get('/projects/:id', (req, res) => {
    if (projects[req.params.id]) {
        const projectId = req.params.id;
        const project = projects.find(({id}) => id === +projectId);
        res.render('project', {project});
    } else {
        const err = new Error();
        err.status = 404;
        err.message = 'Looks like the page you requested does not exist';
        console.log(`${err.message} - Error: ${err.status}`);
        next(err);
    }
});

// export the router module
module.exports = router;