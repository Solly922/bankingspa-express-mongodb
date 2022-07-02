const MongoClient = require('mongodb').MongoClient;
const uri = require('./mongocreds').uri


MongoClient.connect(uri, {useUnifiedTopology: true}, function(err, client){
    console.log('Connected!')

    //database name
    const dbName = 'customers';
    const db = client.db(dbName);

    //new user
    var name = 'user' + Math.floor(Math.random()*10000);
    var email = name + '@email.com';

    // insert into customer table
    var collection = db.collection('customers');
    var doc = {name, email};
    collection.insertOne(doc, {w: 1}, function(err, result){
        console.log('document insert')
    });

    var customers = db
        .collection('customers')
        .find()
        .toArray(function(err, docs){
            console.log("Collection", docs);

            // clean up 
            client.close();
        })
})

