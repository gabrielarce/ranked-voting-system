const express = require('express');
const app = express();
const PORT = process.env.PORT || 9999;
const Vote = require("./models/Vote");
require("dotenv").config();

connectDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//ROUTES
app.get("/", async(req, res) => {
    const vote = await Vote.find({})
    res.render('index', { vote })
})

app.listen(PORT, () => {
    console.log('listening on port 9000')
})