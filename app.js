const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const path = require('path');
const PORT = process.env.PORT || 3001;
const User = require('./models/Users.js');
const Inventory = require('./models/Inventory.js');



dotenv.config();

const hbs = exphbs.create({});

const app = express();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(
    bodyparser.urlencoded({
        extended: false,
    })
);


app.use(
    session({
        key: '1111',
        secret: '1111',
        resave: false,
        saveUninitialized: false
    })

)
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



app.get('/addinventory', (req, res) => {
    if (
        req.session.user == undefined || req.session.user == null
    ) {
        res.redirect('/signup');
    }
    res.render('addinventory', {
        title: 'Add inventory'
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
            req.session.user = data.user_id;
            res.redirect("/addinventory");
        }
    });
});



app.post('/api/addinventory', (req, res) => {



    Inventory.create({
        inventory_shipping_date: req.body.date,
        inventory_productname: req.body.productname,
        inventory_sku: req.body.sku,
        inventory_qtyorderd: req.body.qtyordered,
        inventory_damages: req.body.damages,
        inventory_user_id: parseInt(req.session.user)
    }).catch((error) => {
        console.log(error);
    }).then((data) => {
        res.send("inventory updated");
    })
});
