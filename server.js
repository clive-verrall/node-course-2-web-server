/**
 * Created by Clive on 15/05/2017.
 */

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');



app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n');
    next();
});

/****
app.use((req, res, next) => {
   res.render('maintenance.hbs');
});
*****/

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return 'year: ' + new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'Howdy, welcome to y\'all!'
    });
});

app.get('/about', (req, res) => {
   res.render('about.hbs', {
       pageTitle: 'About page'
   });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects page'
    });
});

app.get('/bad', (req, res) => {
    res.send( {
        errorMessage: 'That was a bad request'
        }

    )
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});