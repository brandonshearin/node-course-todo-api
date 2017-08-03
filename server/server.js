var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
//if PORT is defined  express uses that variable, if not then localhost 3000
const port = process.env.PORT || 3000;


app.use(bodyParser.json());

app.post('/todos', (req, res) =>{
	var todo = new Todo({
		text: req.body.text
	});

	todo.save().then((doc) => {
		res.send(doc);
	}, (err) => {
		res.status(400).send(err);
	});
});

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos});
	}, (err) => {
		res.status(400).send(err);
	});
});

app.get('/todos/:id', (req, res) => {
	var id = req.params.id;

	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	Todo.findById(id).then((todo) => {
	if(!todo){
		return res.status(404).send('id not found');
	}
	res.send({todo});
}).catch((err) => res.status(400).send());
});

app.delete('/todos/:id', (req, res) => {

	var id = req.params.id;
	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}
	Todo.findByIdAndRemove(id).then((todo) => {
	if(!todo){
		return res.status(404).send('id not found');
	}
	res.send(todo);
	}).catch((err) => res.status(400).send());
});








app.listen(port, () => {
	console.log(`started up at port ${port}`);
});


module.exports = {app: app};



// var secondTodo = new Todo({
// 	text: 'eat some chicken',
// 	completed: false,
// 	completedAt: 123
// });

// secondTodo.save().then((doc) =>{
// 	console.log('saved todo', doc);
// }, (err)=>{
// 	console.log('unable to save todo')	
// });

// var user = new User({
// 	email: 'bshearin15@gmail.com   '
// });

// user.save().then((doc) => {
// 	console.log('User saved', doc);
// }, (err) => {
// 	console.log('unable to save user', err);
// });





