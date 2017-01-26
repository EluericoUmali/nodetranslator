var config = require('config'),
    mongo = require('mongodb'), // include the mongodb module
    host,
    port,
    dbName,
    strJSON; 

// retrieve a database reference and server instance
switch(config.get('Translate.envi')) {
    case 'test':
        dbName = config.get('Translate.testDBConfig.dbName');
        host = config.get('Translate.testDBConfig.host');
        port = config.get('Translate.testDBConfig.port');
        break;
    case 'prod':
        dbName = config.get('Translate.prodDBConfig.dbName');
        host = config.get('Translate.prodDBConfig.host');
        port = config.get('Translate.prodDBConfig.port');
        break;
    default:
        dbName = config.get('Translate.devDBConfig.dbName');
        host = config.get('Translate.devDBConfig.host');
        port = config.get('Translate.devDBConfig.port');
        break;
}
// create a server instance
var serverInstance = new mongo.Server(host, port, {auto_reconnect: true});
var db = new mongo.Db(dbName, serverInstance);

// connect to database server
db.open(function(err, dbref) {
    if(!err) {
        console.log("Connected to "+ dbName +" database");
    } else {
        console.log("Please run mongo db to connect to the database");
    }
});

var validateErr = function(err, callback) {
    callback(err);
}

var validateValue = function(val) {
    return !val;
}

exports.searchTranslate = function(data, callback) {
    db.collection('trans', function(err, dataCollection) { 
        dataCollection.findOne(data, function(err, item) {
            if (!err) {
                strJSON = '';
                if (!validateValue(item)) {
                    strJSON = JSON.parse('{"text":"' + item.text + '"}');
                }
                callback("", strJSON);
            } else {
                validateErr(err, callback);
            }
        });
    });
}

exports.addTranslate = function(data, callback) {
    db.collection('trans', function(err, dataCollection) { 
        dataCollection.insert(data, function (err, item) {
            if (!err) {
                strJSON = '';
                if (!validateValue(item)) {
                    strJSON = JSON.parse('{"text":"' + item[0].text + '"}');
                }
                callback("", strJSON);
            } else {
                validateErr(err, callback);
            }
        });
    });
}
