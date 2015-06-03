var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multer = require('multer');
var done=false;



var Applicant = require('./server/models/applicants.js');

var app = express();
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.set('view engine', 'jade');
app.set('views', __dirname + '/server/views');
app.use(express.static(__dirname + '/client'));

// Needed to add the route in order to view the associated pdf.
app.use(express.static(__dirname + '/client/uploads'));
// Adding path for ViewerJS plugin
app.use('/server/ViewerJS', express.static('ViewerJS'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


// Multer configuration
app.use(multer({ dest: './client/uploads/', rename: function (fieldname, filename) {
    return filename+Date.now();
	},
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...');
	},

onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path);
  done=true;
}
}));

var Item = require('./server/models/items.js');

// Multer configuration for food item image upload
app.use(multer({ dest: './client/imageuploads/', rename: function (fieldname, filename) {
    return filename+Date.now();
	},
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...');
	},

onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path);
  done=true;
}
}));
// DB cloud connectivty
mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/resumeproject");

app.post('/api/document', function(req, res){
	if(done===true){
		console.log(req.files);
		res.end("File uploaded");
	}
});

app.get('/', function(req, res){
  res.sendfile('./client/index.html');
});

// displays a list of applicants
app.get('/applicants', function(req, res){

	Applicant.find({}, function(err, result){
		res.send(result);
	});

});

// displays list of menu items
app.get('/items', function(req, res){

	Item.find({}, function(err, result){
		res.send(result);
	});

});

// creates a new applicant
app.post('/applicant', function(req, res){
  console.log(req.body);
	var	bodyData = req.body;
	bodyData.skills = bodyData.skills.split(',');
  // bodyData.documentPath= req.files.userDocument.name;
	var newApplicant = new Applicant(bodyData);

	newApplicant.save(function(err, result){
    if(err){
      res.send(err);
    }
		res.send('success');
	});

});

app.get('/applicant/:ID', function(req, res){
	var user = req.params.ID;
	console.log(user);
	Applicant.findById(user, function(err, result){
		res.send(result);
	});
});

app.delete('/applicant/:ID', function(req, res){
	var user = req.params.ID;
	console.log(user);
	Applicant.findByIdAndRemove(user, function(err, result){
		res.send(result);
	});
});

// creates a new menu Item
app.post('/item', function(req, res){
  console.log(req.body);
	var	bodyData = req.body;
	// bodyData.skills = bodyData.skills.split(',');
  // bodyData.documentPath= req.files.userDocument.name;
	var newItem = new Item(bodyData);

	newItem.save(function(err, result){
    if(err){
      res.send(err);
    }
		res.send(result);
	});

});

app.delete('/item/:itemID', function(req, res){
	var itemID = req.params.itemID;

	Item.remove({_id : itemID}, function(err, result){
		res.send('success');

	});
});

app.get('/item/:ID', function(req, res){
	var user = req.params.ID;
	console.log(user);
	Item.findById(user, function(err, result){
		res.send(result);
	});
});

var port = process.env.PORT || 8441;
var server = app.listen(port, function() {
	console.log('Express server listening on port ' + server.address().port);
});
