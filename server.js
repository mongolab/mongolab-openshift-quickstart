//  OpenShift sample Node application

var fs = require('fs');
var mongodb = require('mongodb');
var express = require('express');
var ejs = require('ejs');
var http = require('http');

var app = express();
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
        db.collection('example').find().toArray(function (err, items) {
		if (err) {
		    res.send(500, { error: 'Could not fulfill request.' });
		} else {
		    res.render('index', {results: items});
		}
        });
});

var serverIp = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var serverPort = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var dbUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/test';
var db;
var server;
mongodb.MongoClient.connect(dbUri, { server: { auto_reconnect: true }}, function (err, database) {
	db = database;
	seedDatabase(function(err){
		if (err) {
		    console.error('Failed to seed database:\n' + err);
		} else {
		    server = http.createServer(app);
		    server.listen(serverPort, serverIp, function(err) {
			    if (err) {
				console.error('Failed to start listening at %s:%d:\n' + err, serverIp, serverPort);
			    } 
		    });
		}
	});
});

function seedDatabase(cb){
    var collection = db.collection('example');
    collection.remove(function(err){
	    if (err) {
		console.error('Failed to clean example collection from database:\n' + err);
	    } else {
		db.collection('example').insert([{'salutation': 'Congrats from MongoLab. Thanks for using our OpenShift Quickstart!'},
						 {'tip': 'If you don\'t want to use EJS for dynamic content, replace it with your chosen template engine.'},
						 {'tip': 'There\'s not much query logic here. Better add some features and forms!'},
						 {'tip': 'Choose your DB by changing the MONGOLAB_URI env variable on your app gear.'},
						 {'salutation': 'Congrats from MongoLab. Thanks for using our OpenShift Quickstart!'}],
						function (err, result) {
						    if (err){
							console.warn('Failed to insert seed data to example collection in database at dbUri=%s:\n' + err, dbUri);
						    }
						});
		cb();
	    }
	});
};







