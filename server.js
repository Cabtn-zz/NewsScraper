const express = require("express");
const app = express();

const methodOverride = require("method-override");
const bodyParser = require('body-parser');

const mongojs = require("mongojs");
const PORT = process.env.PORT || 3000;
const exphbs = require("express-handlebars");
// Snatches HTML from URLs
const request = require("request");
// Scrapes our HTML
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const logger = require("morgan");
const Reddit = require("./redditModel.js");

//Setting up the mongo database
const databaseUrl = "mongo_scraper";
const collections = ["reddit"];
// const db = mongojs(databaseUrl, collections);

// db.reddit.insert

mongoose.Promise = Promise;
// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

mongoose.connect("mongodb://localhost/mongo_scraper");

const db = mongoose.connection;


db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

//ROUTES

app.get("/", (req,res) => {
  // Making a request call for reddit's "webdev" board. The page's HTML is saved as the callback's third argument
  request("https://www.reddit.com/r/webdev", function(error, response, html) {
    console.log("INITIALIZING SCRAPER");

    const results = [];
    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    const $ = cheerio.load(html);
    // With cheerio, find each p-tag with the "title" class
    console.log("GATHERING DATA");
    $("p.title").each(function(i, element) {
      // Save the text of the element (this) in a "title" variable
      const title = $(this).text();
      // In the currently selected element, look at its child elements (i.e., its a-tags),
      // then save the values for any "href" attributes that the child elements may have
      const link = $(element).children().attr("href");
      // Save these results in an object that we'll push into the result array we defined earlier
      console.log("PUSHING DATA: " + title );

      results.push({
        title: title,
        link: link,
        comment: "SAY SOMETHING!"
      })
    });
    const handlebars = {
      result: results
    }
    const scrapedData = new Reddit(results);
    scrapedData.save(results);
    console.log("Sup mofo")
    // res.send("SHIT WORKS")
    res.json(results)
  });
})

// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running on port 3000!");
});
