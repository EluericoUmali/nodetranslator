var dbModel = require('../model/db');

exports.getRequest = function(params, callback) {
    var request = require('request');
    var config = require('config');

    var jsonRequest = function(url, params, set) {
        var handler = function(err, res) {
            if (err)
                return set(err);
            var obj;
            try {
                obj = JSON.parse(res.body);
            } catch(e) {
                set(e);
            }
            set(null, obj);
        };
        if (params.get) {
            request.get(url, handler);
        }
        else {
            request.post(url, params, handler);
        }
    };

    var getDetails = function(apiKey) {
        var pullTranslate = function pullTranslates(params, set) {
            jsonRequest(config.get('Translate.Yandex.url') + '/translate', {
                form: {
                    text: params.text,
                    key: apiKey,
                    format: 'text',
                    lang: params.from + '-' + params.to
                }
            }, set);
        };
        return {
            pullTranslate: pullTranslate
        };
    }

    var arr = {};    
    arr.oldtext = params.text;
    arr.lang = params.from +'-'+params.to;
    dbModel.searchTranslate(arr, function(err, data){
        if (!data) {
            var callTranslate = getDetails(config.get('Translate.Yandex.key'));
            callTranslate.pullTranslate(params, function(err, res) {
                if (res.code === 200) {
                    arr = {};
                    arr.text = res.text.join();
                    arr.oldtext = params.text;
                    arr.lang = params.from + '-' + params.to; 
                    dbModel.addTranslate(arr, function(err, data){
                        callback("", data);
                    });
                } else {
                    callback(res.message);
                }
            });
        } else {
            callback("", data);
        }
    });
}

