  const express = require('express');
  const exphbs = require('express-handlebars');
  const bodyParser = require('body-parser');
  const mongoose = require('mongoose');
  const app = express();


  const Waiter = require('./waiter');
  const models = require('./models/waiterSchemaModel');

  const waiter = Waiter(models);


  app.use(express.static('public'))

  app.engine('handlebars', exphbs({
      defaultLayout: 'main'
  }));
  app.set('view engine', 'handlebars');

  app.use(bodyParser.urlencoded({
      extended: false
  }));
  app.use(bodyParser.json());
  app.get('/', function(req, res){res.redirect('/waiters/')})
  // create a route
  app.get('/waiters/:username', function(req , res){
    res.render("add", {username: "Welcome " + req.params.username + ", Please select preferred working days"});
  });

  app.post('/waiters/:username', waiter.getName);
  app.get('/days', waiter.admin)

  //start the server
  const port = process.env.PORT || 8080;

  app.use(function(err, req, res, next) {
      console.error(err.stack)
      res.status(500).send('Something broke!')
  })

  app.listen(port, function() {
      console.log('app super ready to go:' + port);
  });
