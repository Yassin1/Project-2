

// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
var path =  require ("path")
var exphbs = require ("express-handlebars")
const helpers = require('../utils/helpers');

// Requiring passport as we've configured it
//var passport = require("./config/passport");

// Setting up port and requiring models for syncing
var app = express();
var PORT = process.env.PORT || 8080;
//var db = require("./models");

const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};


// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//app.use(routes);
// Requiring our routes
require("../routes/html-routes.js")(app);
require("../routes/api-routes.js")(app);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
