  const express = require('express');
  const exphbs = require('express-handlebars');
  const bodyParser = require('body-parser');

var app = express();

app.use(express.static('public'))

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// create a route
app.get('/waiters', function (req, res) {
 res.render('add');
});

//start the server

 app.use(function (err, req, res, next) {
   console.error(err.stack)
   res.status(500).send('Something broke!')
 })


 const port = process.env.PORT || 8080;

 app.listen(port , function(){
   console.log('app super ready to go:' + port);
 });
