// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err){
		console.log('unable to connect to db server dawg');
	}
	console.log('connected to mongodb server dawg');

	db.collection('Todos').find({
		_id: new ObjectID('597f474aea3c475ae881d6e8')}).toArray().then((docs) => {
		console.log('Todos');
		console.log(JSON.stringify(docs, undefined, 2));
	}, (err) => {
		console.log('unable to fetch todos', err)
	})

		db.collection('Todos').find().count().then((count) => {
		console.log(`Todos count: ${count}`);
	}, (err) => {
		console.log('unable to fetch todos', err)
	})

	// db.close();
});