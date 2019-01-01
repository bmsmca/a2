var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');

var expressValidator= require('express-validator');

var app = express();
var urlencodedParser = bodyParser.urlencoded({extended:false});
app.use(expressValidator());
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://127.0.0.2/2db", function(err,db)
{
	if(!err)
	{
		console.log("We are connected");
		app.get('/', function(req,res){
			res.send("Welcome");
		})
		app.get('/index2.html', function(req,res){
			res.sendFile(__dirname + '/' + 'index2.html')
		})
		app.post('/process_post', urlencodedParser, function(req,res){
			req.checkBody('name', 'Name should not empty').notEmpty();
			req.checkBody('usn', 'Usn should not empty').notEmpty();
			req.checkBody('sex', 'Sex should not empty').notEmpty();
			req.checkBody('sem', 'Sem should not empty').notEmpty();
			req.checkBody('branch', 'Branch should not empty').notEmpty();
			req.checkBody('college', 'College should not empty').notEmpty();
			req.checkBody('aadhar', 'Aadhar should not empty').notEmpty();
			req.checkBody('passport', 'Passport should not empty').notEmpty();
			req.checkBody('bank', 'Bank should not empty').notEmpty();

			req.checkBody('name', 'Name should contain only alphabets').isAlpha();
			req.checkBody('usn', 'Usn should contain only Integers').isInt();
			req.checkBody('sex', 'Sex should contain only alphabets').isAlpha();
			req.checkBody('sem', 'Sem should contain only Integers').isInt();
			req.checkBody('branch', 'Branch should contain only alphabets').isAlpha();
			req.checkBody('college', 'College should contain only alphabets').isAlpha();
			req.checkBody('aadhar', 'Aadhar should contain only Integer').isInt();
			req.checkBody('passport', 'Passport should contain only alphabets').isAlpha();
			req.checkBody('bank', 'Bank should contain only Integer').isInt();

			var errors = req.validationErrors();
			if(errors)
			{
				res.send(errors);
				return;
			}
			else
			{
				var USN=req.body.usn
				var NAME=req.body.name
				var SEX=req.body.sex
				var SEM=req.body.sem
				var BRANCH=req.body.branch
				var COLLEGE=req.body.college
				var PASSPORT=req.body.passport
				var AADHAR=req.body.aadhar
				var BANK=req.body.bank

				db.collection('stdRecord').insert({"usn":USN,"name":NAME,"sex":SEX,"sem":SEM,"branch":BRANCH,"college":COLLEGE,"passport":PASSPORT,"aadhar":AADHAR,"bank":BANK}, function(err,doc){
				if(err)

					return console.log(err)

				else

					res.status(201).json(doc.ops[1])
				})
					console.log("New Record Inserted");
					res.send("<p>Name:"+NAME+"</p><p>USN:"+USN+"</p><p>Sex:"+SEX+"</p><p>Semester:"+SEM+"</p><p>Branch:"+BRANCH+"</p><p>College:"+COLLEGE+"</p><p>Aadhar Number:"+AADHAR+"</p><p>Passport Number:"+PASSPORT+"</p><p>Bank Account Number:"+BANK+"</p>");
			}
		})
		var server = app.listen(3700, function(){
			var host = server.address().address;
			var port = server.address().port;
			console.log("Listening at http://%s:%s",host,port);
		})
	}
	else
	{
		db.close();
	}
})
