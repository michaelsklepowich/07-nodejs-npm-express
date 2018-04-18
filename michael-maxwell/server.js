'use strict';

const express = require('express');
// assigning the result of the express method to a variable
let app = express();
const PORT = process.env.PORT || 3000;

// app methods are called "middleware; a function that takes a function"
//this makes a static server pointed at the './public' folder
// .static means there are actual physical files in this ./public folder
app.use(express.static('./public'));
//express servers our public folder by binding middleware to our instance of the app object

app.get('/new', (request, response) => {
  response.sendFile('new.html',{root:'./public'});
});
// REVIEW: POST route needs to parse the body passed in with the request. express.urlencoded() attaches "middleware" to do that
app.post('/articles', express.urlencoded(), function(request, response) {
  // REVIEW: This route will receive a new article from the form page, new.html, and log that form data to the console. We will wire this up soon to actually write a record to our persistence layer!
  console.log(request.body);
  response.send('Record posted to server!!');
})

app.use((req,res) => {
  res.status(404).send('Sorry, that route does not exist.');
});



//proof of life the server is running in the console
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
