var express = require('express');
var app = express();
var cors = require('cors');
var dal = require('./dal');
const { response } = require('express');

// serve static files from public directory
app.use(express.static('public'));
app.use(cors());

// create user account
app.get('/account/create/:name/:email/:password', (req, res) => {
    dal.create(req.params.name, req.params.email, req.params.password)
        .then((user) => {
            console.log(user);
            res.send(user);
        })
});

// all accounts
app.get('/account/all', (req, res) => {
    dal.all()
        .then((docs) => {
            console.log(docs);
            res.send(docs);
        })
})

// log in 
app.get('/account/login/:email/:password', (req, res) => {
    dal.login(req.params.email, req.params.password)
        .then((user) => {
            console.log(user);
            res.send(user);
        })
})

// withdraw
app.get('/account/withdraw/:email/:amount', (req, res) => {
    dal.withdraw(req.params.email, req.params.amount)
        .then((balance) => {
            console.log('express balance: ' + balance);
            res.send({balance: balance});
        })
})

// deposit
app.get('/account/deposit/:email/:amount', (req, res) => {
    dal.deposit(req.params.email, req.params.amount)
        .then(balance => {
            console.log('express: balance: ' + balance);
            res.send({balance: balance});
        })
})

// give admin
app.get('/account/giveadmin/:email', (req, res) => {
    dal.giveAdmin(req.params.email)
        .then(response => {
            console.log(response);
            res.send(response)
        })
})

// remove admin
app.get('/account/removeadmin/:email', (req, res) => {
    dal.removeAdmin(req.params.email)
        .then(response => {
            console.log(response);
            res.send(response)
        })
})

// edit balance of user
app.get('/account/adjust/:email/:amount', (req, res) => {
    dal.adjustBalance(req.params.email, req.params.amount)
        .then(response => {
            console.log(response);
            res.send(response);
        })
})

let port = 3000;
app.listen(port, () => console.log('Running on port', port))