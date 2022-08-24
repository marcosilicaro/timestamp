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

app.get("/api/:unix", function (req, res) {
  
  function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    let day=()=>{
      let day = a.getDay()
      if (day===0){
        return 'Sun'
      } else if (day===1){
        return 'Mon'
      } else if (day===2){
        return 'Tue'
      } else if (day===3){
        return 'Wed'
      } else if (day===4){
        return 'Thu'
      } else if (day===5){
        return 'Fri'
      } else if (day===6){
        return 'Sat'
      }
    }
    var time = day() +', '+ date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec + ' GMT' ;
    return time;
  }
  res.json({unix: parseInt(req.params.unix), utc: timeConverter(req.params.unix)});
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
