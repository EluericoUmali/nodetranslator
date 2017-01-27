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
                    lang: params.lang
                }
            }, set);
        };
        return {
            pullTranslate: pullTranslate
        };
    }

    // var arr = {};  
    params.oldtext = params.text;
    delete params.text;
    params.lang = params.from +'-'+params.to;
    dbModel.searchTranslate(params, function(err, data){
        if (!data) {
            var callTranslate = getDetails(config.get('Translate.Yandex.key'));
            callTranslate.pullTranslate(params, function(err, res) {
                if (res.code === 200) {
                    params.text = res.text.join();
                    dbModel.addTranslate(params, function(err, data){
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

