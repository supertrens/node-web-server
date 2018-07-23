const fs = require('fs');
const express = require('express');
const hbs = require('hbs');
const app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials');

app.use((req, resp, next) => {
  let now = new Date().toString();
  let log = `${now} : ${req.method} ${req.url}`;

  fs.appendFile('server.log' , log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  console.log(log);
  next();
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', text => {
  return text.toUpperCase();
});

app.get('/', (req, resp) => {
  resp.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMsg: 'Welcome to the new me version. Coding everyday'
  });
});

app.get('/about', (req, resp) => {
  resp.render('about.hbs', {
    pageTitle: 'About Pitrens'
  });
});

app.get('/bad', (req, resp) => {
  resp.send({
    error: 'bad request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
