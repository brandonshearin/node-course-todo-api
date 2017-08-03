const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

var id = '598391d617d94807e182b108';

if(!ObjectID.isValid(id)){
	console.log('ID not valid');
}

var userID = '598381ce224be60577c84716';

if(!ObjectID.isValid(userID)){
	console.log('userID not valid');
}

// Todo.find({
// 	_id: id
// }).then((todos) => {
// 	console.log('Todos: ', todos);
// });

// Todo.findOne({
// 	_id: id
// }).then((todo) => {
// 	console.log('Todo: ', todo);
// });

// Todo.findById(id).then((todo) => {
// 	if(!todo){
// 		return console.log('id not found');
// 	}
// 	console.log('Todo By Id: ', todo);
// }).catch((err) => console.log(err));



User.findById(userID).then((user) => {
	if(!user){
		return console.log('user not found');
	}
	console.log('User By Id: ', user);
}).catch((err) => console.log(err));


