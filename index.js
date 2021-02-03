
require('dotenv').config()


// setup for express
const express = require("express");
const app = express();

const port = process.env.PORT;

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views')

const hbs = require('hbs')

//registering your partials
hbs.registerPartials(__dirname + '/views/partials')

// require some data form your data.js file
let {students, instructors, getStudents, getTeachers} = require('./data')

// just a simple middleware to show you how it works
// you will always see that console.log when you visit any page
app.use((req, res, next) => {
    console.log("Hello im the middleware");
    next();
});

// letting your middleware know where to find all static files
app.use(express.static(__dirname + "/public"));

app.set('views', __dirname + '/views')

// ROUTES DEFINED BELOW

app.get("/", (req, res) => {
    let myName = 'Manish'
    res.render('landing.hbs', {name: myName})
});

app.get("/students", (req, res) => {
    getStudents()
        .then((students)=>{
            res.render('students.hbs', {students, layout:false})
        })
        .catch(() => {

        })
});
//res.render('students.hbs', {students})

app.get("/instructors", (req, res) => {
    
    //fetching all the instructors when the user visits this url
    getTeachers()
        .then((instructors) => {
            //if successful show the page
            res.render('instructors.hbs', {instructors})
        })
        .catch(() => {

        })
    //res.render('instructors.hbs', {instructors})
});

// Express setup to listen for all client requests on a certain port
app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);