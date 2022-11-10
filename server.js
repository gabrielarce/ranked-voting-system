const express = require('express');
const app = express();
const PORT = process.env.PORT || 9000;
require("dotenv").config();

connectDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//ROUTES
app.get("/", (request, response) => {
    response.render('index')
})

app.listen(PORT, () => {
    console.log('listening on port 9000')
})