const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const handlebars = require('handlebars');
const exphps = require('express-handlebars');
const bodyparser = require('body-parser');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const path = require('path');

dotenv.config();

const conn = require("./db/db.js");

const app = express();
app.engine('handlebars', 
exphps.engine({
    defaultLayout:"main",
    handlebars: allowInsecurePrototypeAccess(handlebars),
})); 
app.set('view engine','handlebars');
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

app.get('/',(req,res)=>{
    res.render('index',{
        title:'home'
    });
});

app.get('/aboutus',(req,res)=>{
    res.render('about',{
        title:'aboutus'
    });
});

app.get('/contactus',(req,res)=>{
    res.render('contact',{
        title:'contact'
    });
});

app.get('/services',(req,res)=>{
    res.render('services',{
        title:'services'
    });
});

app.get('/signup',(req,res)=>{
    res.render('signup',{
        title:'signup'
    });
});

