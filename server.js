const express = require('express');
const app = express();
const path = require("path");
const connectDB = require('./config/database');
const Vote = require('./models/Vote');
require("dotenv").config();

connectDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//Routes
app.get('/', async(req, res) => {
    try {
        const votes = await Vote.find({})
        console.log(votes)
        res.render('index', { votes })
    } catch (error) {
        console.log(error)
    }
})

app.post('/vote', async(req, res) => {
    try {
        console.log('I voted!')
        console.log(req.body)
        await Vote.create({
            name: req.body.name,
            rank1: req.body.first,
            rank2: req.body.second,
            rank3: req.body.third,
        })
        res.redirect("/")
    } catch (error) {
        console.log(error)
    }
})


app.listen(3000, function() {
    console.log('listening on 3000')
})

console.log("test")