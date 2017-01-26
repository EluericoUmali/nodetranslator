var config = require('config');
// include the mongodb module
var mongo = require('mongodb');
// create a server instance
var serverInstance = new mongo.Server(config.get('Translate.dbConfig.host'), config.get('Translate.dbConfig.port'), {auto_reconnect: true});

var dbName = config.get('Translate.dbConfig.dbName');
// retrieve a database reference
var db = new mongo.Db(dbName, serverInstance);
// connect to database server
db.open(function(err, dbref) {
    if(!err) {
        console.log("Connected to "+ dbName +" database");
    }
});

var validateErr = function(err, callback) {
    callback(err);
}

exports.searchTranslate = function(data, callback) {
    db.collection('trans', function(err, dataCollection) { 
        dataCollection.findOne(data, function(err, item) {
            if (item) {
                var strJSON = '{"text":"' + item.text + '"}';
                callback("", JSON.parse(strJSON));
            } else {
                validateErr(err, callback);
            }
        });
    });
}

exports.addTranslate = function(data, callback) {
    db.collection('trans', function(err, dataCollection) { 
        dataCollection.insert(data, function (err, result) {
            if (!err) {
                var strJSON = '{"text":"' + result[0].text + '"}';
                callback("", JSON.parse(strJSON)); 
            } else {
                validateErr(err, callback);
            }
        });
    });
}
