const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const handlebars = require('handlebars');
const exphps = require('express-handlebars');
const bodyparser = require('body-parser');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const path = require('path');
const PORT = process.env.PORT || 3001;




dotenv.config();

const User = require('./models/Users.js');
const { REPL_MODE_STRICT } = require('repl');

const app = express();
app.engine('handlebars',
    exphps.engine({
        defaultLayout: "main",
        handlebars: allowInsecurePrototypeAccess(handlebars),
    }));
app.set('view engine', 'handlebars');
app.use(
    bodyparser.urlencoded({
        extended: false,
    })
);

app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, 'public')));


app.listen(process.env.PORT, () => {
    console.log("server starterd at 3000")
});

app.get('/', (req, res) => {
    res.render('index', {
        title: 'home'
    });
});

app.get('/aboutus', (req, res) => {
    res.render('about', {
        title: 'aboutus'
    });
});


app.get('/services', (req, res) => {
    res.render('services', {
        title: 'services'
    });
});

app.get('/signup', (req, res) => {
    res.render('signup', {
        title: 'signup'
    });
});

app.post('/api/signup', (req, res) => {

    User.create({
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_password: req.body.user_password,
        user_phonenumber: req.body.user_phonenumber

    }).catch((error) => {
        console.log(error);
    }).then((data) => {
        res.send("user is registerd");
    })
});

app.post('/api/signin', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    User.findOne({
        where: {
            user_email: email,
            user_password: password
        }
    }).then((data) => {
        if (data == null || data == false) {
            res.send("invalid email or password");
        } else {
            res.send("loged in");
        }
    });
});

