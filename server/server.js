var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

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






app.listen(3000, () => {
	console.log('started on port 3000');
})



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





