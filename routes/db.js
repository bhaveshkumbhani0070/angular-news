var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var mongoUrl = "mongodb://rodonguser:rodonguser@db.laonresources.com/rodong?authSource=admin";
//process.env.MONGODB_URI;
if (!mongoUrl) {
    console.log('Please export mongoUrl');
    console.log('Use following commmand');
    console.log('*********');
    console.log('export MONGODB_URI=YOUR_MONGO_URL');
}

exports.connect = function(callback) {
    MongoClient.connect(mongoUrl, function(err, db) {
        if (err) {
            console.log('err', err);
            callback(false);
        } else {
            callback(db);
            // db.close();
        }
    });
};