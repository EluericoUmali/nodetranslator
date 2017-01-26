var express = require('express'),
	app = express(),
	request = require('./routes/request'),
	config = require('config'),
	port = config.get('Translate.port');

app.use('/trans', express.static(__dirname + '/public'));

app.get('/translate', function(req, res){
	var params = req.query;
	request.getRequest(params, function(req, data){
		var response = JSON.stringify(data);
		console.log(response);
		res.send(response);
	});
});

app.listen(port, function() { 
	console.log('Listening on port '+ port);
});