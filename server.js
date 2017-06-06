const express = require("express");
const mongojs = require("mongojs");
const app = express();
const methodOverride = require("method-override");
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;
const exphbs = require("express-handlebars");
// Snatches HTML from URLs
const request = require("request");
// Scrapes our HTML
const cheerio = require("cheerio");

//Setting up the mongo database
const databaseUrl = "mongo_scraper";
const collections = ["reddit"];
const db = mongojs(databaseUrl, collections);

db.reddit.insert


// Making a request call for reddit's "webdev" board. The page's HTML is saved as the callback's third argument
request("https://www.reddit.com/r/webdev", function(error, response, html) {
  console.log("INITIALIZING SCRAPER");
  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(html);
  // An empty array to save the data that we'll scrape
  // var result = [];
  // With cheerio, find each p-tag with the "title" class
  // (i: iterator. element: the current element)
  console.log("GATHERING DATA");
  $("p.title").each(function(i, element) {
    // Save the text of the element (this) in a "title" variable
    var title = $(this).text();
    // In the currently selected element, look at its child elements (i.e., its a-tags),
    // then save the values for any "href" attributes that the child elements may have
    var link = $(element).children().attr("href");
    // Save these results in an object that we'll push into the result array we defined earlier
    console.log("PUSHING DATA");
    db.reddit.insert({
      title: title,
      link: link
    });
  });
    db.reddit.find({}, data => {
      if(data) {
        console.log(db.reddit.find({}))
      }
      else {
        console.log("ASYNC")
      }
  });
});


//================================================================================

/* Book Marker Warm Up (18.3.1)
 * backend
 * ==================== */

// // Dependencies
// var express = require("express");
// var bodyParser = require("body-parser");
// var logger = require("morgan");
// var mongojs = require("mongojs");
//
// // Initialize Express
// var app = express();
//
// // Configure our app for morgan and body parser
// app.use(logger("dev"));
// app.use(bodyParser.urlencoded({
//   extended: false
// }));
//
// // Static file support with public folder
// app.use(express.static("public"));
//
// // Mongojs configuration
// var databaseUrl = "week18day3";
// var collections = ["books"];
//
// // Hook our mongojs config to the db var
// var db = mongojs(databaseUrl, collections);
// db.on("error", function(error) {
//   console.log("Database Error:", error);
// });
//
//
// // Routes
// // ======
//
// // Post a book to the mongoose database
// app.post("/submit", function(req, res) {
//
//   // Save the request body as an object called book
//   var book = req.body;
//
//   // If we want the object to have a boolean value of false,
//   // we have to do it here, because the ajax post will convert it
//   // to a string instead of a boolean
//   book.read = false;
//
//   // Save the book object as an entry into the books collection in mongo
//   db.books.save(book, function(error, saved) {
//     // Show any errors
//     if (error) {
//       console.log(error);
//     }
//     // Otherwise, send the response to the client (for AJAX success function)
//     else {
//       res.send(saved);
//     }
//   });
// });
//
//
// // Find all books marked as read
// app.get("/read", function(req, res) {
//   // Go into the mongo collection, and find all docs where "read" is true
//   db.books.find({ "read": true }, function(error, found) {
//     // Show any errors
//     if (error) {
//       console.log(error);
//     }
//     // Otherwise, send the books we found to the browser as a json
//     else {
//       res.json(found);
//     }
//   });
// });
//
//
// // Find all books marked as unread
// app.get("/unread", function(req, res) {
//   // Go into the mongo collection, and find all docs where "read" is false
//   db.books.find({ "read": false }, function(error, found) {
//     // Show any errors
//     if (error) {
//       console.log(error);
//     }
//     // Otherwise, send the books we found to the browser as a json
//     else {
//       res.json(found);
//     }
//   });
// });
//
//
// // Mark a book as having been read
// app.get("/markread/:id", function(req, res) {
//   // Remember: when searching by an id, the id needs to be passed in
//   // as (mongojs.ObjectId(IDYOUWANTTOFIND))
//
//   // Update a doc in the books collection with an ObjectId matching
//   // the id parameter in the url
//   db.books.update({
//     "_id": mongojs.ObjectId(req.params.id)
//   }, {
//     // Set "read" to true for the book we specified
//     $set: {
//       "read": true
//     }
//   },
//   // When that's done, run this function
//   function(error, edited) {
//     // show any errors
//     if (error) {
//       console.log(error);
//       res.send(error);
//     }
//     // Otherwise, send the result of our update to the browser
//     else {
//       console.log(edited);
//       res.send(edited);
//     }
//   });
// });
//
//
// // Mark a book as having been not read
// app.get("/markunread/:id", function(req, res) {
//   // Remember: when searching by an id, the id needs to be passed in
//   // as (mongojs.ObjectId(IDYOUWANTTOFIND))
//
//   // Update a doc in the books collection with an ObjectId matching
//   // the id parameter in the url
//   db.books.update({
//     "_id": mongojs.ObjectId(req.params.id)
//   }, {
//     // Set "read" to false for the book we specified
//     $set: {
//       "read": false
//     }
//   },
//   // When that's done, run this function
//   function(error, edited) {
//     // Show any errors
//     if (error) {
//       console.log(error);
//       res.send(error);
//     }
//     // Otherwise, send the result of our update to the browser
//     else {
//       console.log(edited);
//       res.send(edited);
//     }
//   });
// });
//
//
// // Listen on port 3000
// app.listen(3000, function() {
//   console.log("App running on port 3000!");
// });
