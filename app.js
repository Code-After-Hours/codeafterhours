var express = require('express')
  , path = require('path')
  , routes = require('./routes')
  , sendgrid = require('sendgrid')(process.env.SENGRID_USERNAME, process.env.SENDRID_PASSWORD);

var app = express();


app.configure(function(){
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride()); 
  app.use(express.static(__dirname + '/public'));
});


app.get('/', routes.index);

app.post('/send_email', function(req, res) {  
      sendgrid.send({
      to:       'info@ens-labs.com',
      from:     req.body.email,
      subject: 'Code After Hours',
      text:     req.body.message

},    function(err, json) {
      if (err) { return console.error(err); }
      console.log(json);
}); res.redirect('done.html');
});

///////////////////////////////////Server//////////////////////////////////////////////////////////////////////////////////

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});