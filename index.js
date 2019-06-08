const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const app = express();
const members = require('./Members');


// Handlebars Middlewares
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// body parser middle wares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Homepage route
app.get(('/'), (req, res) => {
    res.render('index', {
        title: 'Member App',
        members
    });
});
// set static folder server
// setting public as static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members', require('./routes/api/members'));


const port = process.env.PORT || 5000;

app.listen(port, ()=> {
    console.log('server successfully running on port: ', port);
});
