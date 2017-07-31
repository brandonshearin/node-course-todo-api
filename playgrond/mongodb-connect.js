// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err){
		console.log('unable to connect to db server dawg');
	}
	console.log('connected to mongodb server dawg');

	// db.collection('Todos').insertOne({
	// 	text: 'Something to do',
	// 	completed: false
	// }, (err, result) => {
	// 	if(err){
	// 		return console.log('unable to insert Todo')
	// 	}

	// 	console.log(JSON.stringify(result.ops, undefined, 2));
	// });

	//Insert new doc into the Users (name, age, location)

	db.collection('Users').insertOne({
		name: 'Brandon',
		age: 19,
		location: 'NC'
	}, (err, result) => {
		if(err){
			return console.log('unable to insert user');
		}

		console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
	});

	db.close();
});