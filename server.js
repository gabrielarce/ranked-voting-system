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
    const winner = await calculateMost(votes)
    console.log(votes)
    res.render('index', { votes, winner })
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
    let numberOfVoters = votes.length
    let rank = 1
    let candidates = {
        fire: 0,
        grass: 0,
        water: 0,
    }
    let highest = {};
    let lowest = {};

    for (i = 0; i < numberOfVoters; i++) {
        candidates[votes[i]["rank1"]] += 1
    }

    for (const key in candidates) {
        if (candidates[key] > numberOfVoters / 2) {
            highest[key] = candidates[key]
        }
    }

    let low = [...Object.values(candidates)].sort((a, b) => a - b)[0]

    for (const key in candidates) {
        if (candidates[key] == low) {
            lowest[key] = candidates[key]
        }
    }

    let secondChoice = votes.filter(vote => vote["rank1"] == Object.keys(lowest)[0])

    if (Object.keys(highest).length == 1) {
        return highest
    } else {
        for (i = 0; i < secondChoice.length; i++) {
            candidates[secondChoice[i]["rank2"]] += 1
        }
        for (const key in candidates) {
            if (candidates[key] > numberOfVoters / 2) {
                highest[key] = candidates[key]
            }
        }
        return highest
    }
}

// function calculateMost(votes) {
//     let choices = 3
//     const candidates = {
//         fire: 0,
//         grass: 0,
//         water: 0,
//     }
//     for (i = 0; i < votes.length; i++) {
//         let rank1 = votes[i].rank1
//         candidates[rank1] += 1
//     }
//     return candidates
// }