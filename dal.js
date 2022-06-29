const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
var db = null;

// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
    console.log('Connected!')

    //database name
    const dbName = 'myproject';
    db = client.db(dbName);
})

// create new user
function create(name, email, password){
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 100, isAdmin: false};
        collection.insertOne(doc, {w: 1}, function(err, result){
            err ? reject(err) : resolve(doc);
        })
    })
}

// all users
function all(){
    return new Promise((resolve, reject) => {
        const users = db.collection('users').find({}).toArray(function(err, docs){
            err ? reject(err) : resolve(docs)
        })
    })
}

// log in
function login(email, password){
    return new Promise(async (resolve, reject) => {
        const query = db.collection('users').find({}).toArray();
        // get users form database
        let users = await query;
        let loginSuccessful = false;
        // to do: handle if account doesn't exist

        try {
            users.forEach((user) => {
                if (email == user.email && password == user.password){
                    loginSuccessful = true;
                    resolve(user)
                }
            })
        }
        catch(error){
            console.log(error.message);
            reject(error)
        }
    })
}

// withdraw
function withdraw(email, amount) {
    return new Promise(async (resolve, reject) => {
        const query = db.collection('users').findOne({email: email})
        let user = await query;

        let balance = parseInt(user.balance);
        amount = parseInt(amount);

        try {
            if (amount > user.balance) {
                resolve('Not enough money')
            }
            else {
                let newBalance = balance - amount;
                console.log('DAL: new balance is: ' + newBalance);
                const result = await db.collection('users').updateOne({email: email}, { $set : {balance: newBalance}}).then(async () => {
                    let updatedUser = await query;
                    console.log('DAL: queried balance: ' + updatedUser.balance);
                    // the queried value is one step behind the real value so newBalanced is resolved instead
                    resolve(newBalance)
                });
            }
        }
        catch(error){
            reject(error)
        }

    })
}

// deposit
function deposit(email, amount) {
    return new Promise(async (resolve, reject) => {
        const query = db.collection('users').findOne({email: email})
        let user = await query;

        let balance = parseInt(user.balance);
        amount = parseInt(amount);

        try {
            if (amount <= 0) {
                resolve('Positive amounts only')
            }
            else {
                let newBalance = balance + amount;
                console.log('DAL: new balance is: ' + newBalance);
                const result = await db.collection('users').updateOne({email: email}, { $set : {balance: newBalance}}).then(async () => {
                    let updatedUser = await query;
                    console.log('DAL: queried balance: ' + updatedUser.balance);
                    // the queried value is one step behind the real value so newBalanced is resolved instead
                    resolve(newBalance)
                });
            }
        }
        catch(error){
            reject(error)
        }
    })
}

module.exports = {create, all, login, withdraw, deposit};