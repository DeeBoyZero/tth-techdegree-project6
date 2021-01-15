const express = require('express');
const router = express.Router();
const { projects } = require('../data.json');


router.get('/', (req, res) => {
    res.render('index', {projects});
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/project/:id', (req, res) => {
    res.render('project');
});

router.get('/projects/:id', (req, res) => {
    res.render('project');
});



module.exports = router;