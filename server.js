const express = require('express');
const app = express();
const path = require("path");
const PORT = process.env.PORT || 9999;
const connectDB = require('./config/database');
const Vote = require("./models/Votes");
require("dotenv").config();

connectDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//ROUTES
app.get("/", async(req, res) => {
    const votes = await Vote.find({})
    const winner = calculateMost(votes)
    res.render('index', { votes, winner })
})

app.get("/createform", (req, res) => {
    res.render("newElection")
})

app.post("/vote", async(req, res) => {
    try {
        await Vote.create({
            name: req.body.name,
            rank1: req.body.rank1,
            rank2: req.body.rank2,
            rank3: req.body.rank3
        })
        res.redirect("/")
    } catch (error) {
        console.log(error)
    }
})



app.listen(PORT, () => {
    console.log('listening on port 9999')
})

// Calculate the winner of the Election
function calculateMost(votes) {

    //Object that keeps count of the candidates and count of votes.
    let candidates = {
        fire: 0,
        grass: 0,
        water: 0,
    };

    //Object that holds the candidate with over 50% of the vote. Winner will be held here. 
    let highest = {};

    //Object that holds the rank1 candidate with the least amount of votes.
    let lowest = {};

    //Tally the rank1 votes and add to the candidates object. 
    for (i = 0; i < votes.length; i++) {
        candidates[votes[i]["rank1"]]++
    };

    //Loop through the candidates object, if any candidate has more than half the votes, add them to the highest object
    for (const key in candidates) {
        if (candidates[key] >= votes.length / 2) {
            highest[key] = candidates[key]
        }
    };

    //What was the lowest number of votes.
    let low = [...Object.values(candidates)].sort((a, b) => a - b)[0];

    //Loop through the candidates object, if any candidate votes matches the lowest value, add them to lowest object
    for (const key in candidates) {
        if (candidates[key] == low) {
            lowest[key] = candidates[key]
        }
    };

    // Select all the vote objects where the the rank1 choice got the least amount of votes. This array will be used to add the rank2 vote to the candidates object. 
    let secondChoice = votes.filter(vote => Object.keys(lowest).includes(vote["rank1"]));

    //If there is only one key/value pair in the highest object, return that object(winner!)
    if (Object.keys(highest).length == 1) {
        return highest
    } else {
        //If no one has more than 50% of the vote yet, add the rank2 votes to candidates object.
        for (i = 0; i < secondChoice.length; i++) {
            candidates[secondChoice[i]["rank2"]]++
        }

        //Loop through the candidates object, if any candidate has more than half the votes, add them to the highest object
        for (const key in candidates) {
            if (candidates[key] >= votes.length / 2) {
                highest[key] = candidates[key]
            }
        }
        console.log(highest)
        if (Object.keys(highest).length == 1) {
            return highest;
        }

        let newHighest = {}
        for (const key in candidates) {
            if (highest[key] >= Object.values(highest).reduce((acc, curr) => acc + curr) / 2) {
                newHighest[key] = highest[key]
            }
        }
        return newHighest;
    };
}