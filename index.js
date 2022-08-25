// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", function (req, res) {

  // transforms URL param to date object
  let dateInput = new Date(parseInt(req.params.date))
  
  // is the URL param unix?
  if (req.params.date.length>10){
    res.json({unix: parseInt(req.params.date), utc: dateInput.toUTCString()});
  }else {
    // it is a date. E.g. 2015-10-05
    newDate=new Date(req.params.date)
    res.json({unix: newDate.getTime(), utc: newDate.toUTCString()});
  } 
});

app.get("/api/", function (req, res) {

  let newDate= new Date()
  res.json({unix: newDate.getTime(), utc: newDate.toUTCString()});
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
