// First, we hook mongoose into the model with a require
const mongoose = require("mongoose");

// Then, we save the mongoose.Schema class as simply "Schema"
const Schema = mongoose.Schema;

// With our new Schema class, we instantiate an ExampleSchema object
// This is where we decide how our data must look before we accept it in the server, and how to format it in mongoDB
const RedditSchema = new Schema({
  title: String,
  link: String,
  comments: String,
  date: {
    type: Date,
    default: Date.now
  },
});

// This creates our model from the above schema, using mongoose's model method
const Reddit = mongoose.model("Reddit", RedditSchema);

// Finally, we export the module, allowing server.js to hook into it with a require statement
module.exports = Reddit;
