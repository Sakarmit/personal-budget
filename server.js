// Budget API
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const mongoose = require('mongoose');
const categoryModel = require('./models/budgetCategory');
const url = "mongodb://localhost:27017/budget";

mongoose.connect(url)
.catch((error) => {
    console.log(`Failed to connect to db - ${error}`);
});

app.use(cors());

app.get('/hello', (req, res) => {
    res.send('Hello World');
});

app.get('/budget', (req, res) => {
    categoryModel.find({}, {__v:0})
        .then((result) => {
            res.status(200).send(result);
        }).catch((error) => {
            res.send(error);
        });
});

app.post('/budget', (req, res) => {
    const {title, value, color} = req.body;

    let newData = new categoryModel({title, value, color});
    categoryModel.insertMany(newData)
        .then((data) => {
            res.status(201).send("Successfully added entry.");
        })
        .catch((error) => {
            res.send(error);
        });
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});