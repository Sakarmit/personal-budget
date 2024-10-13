/*
*
* This files is for development purposes only it creates the database in mongo
* and loads the starting data.
*
*/

const mongoose = require("mongoose");
const categoriesModel = require("./models/budgetCategory");

let url = "mongodb://localhost:27017/budget";

let data = [
  {
    title: "Eat out",
    budget: 25,
    color: "#ffcd56",
  },
  {
    title: "Rent",
    budget: 275,
    color: "#ff6380",
  },
  {
    title: "Grocery",
    budget: 110,
    color: "#36a2eb",
  },
  {
    title: "Gas",
    budget: 120,
    color: "#fd6b19",
  },
  {
    title: "Maintenance",
    budget: 100,
    color: "#800000",
  },
  {
    title: "Digital Ocean",
    budget: 10,
    color: "#9A6324",
  },
  {
    title: "Insurance",
    budget: 145,
    color: "#fabed4",
  },
  {
    title: "Pets",
    budget: 220,
    color: "#ffd8b1",
  },
  {
    title: "Subscription",
    budget: 25,
    color: "#3cb44b",
  },
  {
    title: "Other",
    budget: 200,
    color: "#aaffc3",
  },
];

//Connects to the budget database if it doesn't exist its created
mongoose
  .connect(url)
  .then(() => {
    //Clear data in collection if any exists
    categoriesModel
      .deleteMany({})
      .then(() => {
        let newData = data.map((item) => {return {title: item.title, value: item.budget, color: item.color}});
        categoriesModel.insertMany(newData)
            .then(() => {
                mongoose.connection.close();
            })
            .catch((error) => {
                console.log(error);
            });
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.log(`Failed to connect to/create database - ${error}`);
  });
