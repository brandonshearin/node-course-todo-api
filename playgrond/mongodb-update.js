// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err){
		console.log('unable to connect to db server dawg');
	}
	console.log('connected to mongodb server dawg');

	// db.collection('Todos').findOneAndUpdate({
	// 	_id: new ObjectID('597faef91a2de6109ffc22d5')
	// },{
	// 	$set: {
	// 		completed: true
	// 	}
	// }, {
	// 	returnOriginal: false
	// }).then((result) => {
	// 	console.log(result);
	// });

	db.collection('Users').findOneAndUpdate({
		_id: new ObjectID('597f49bcb774ce5b46a596d6')
	},{
		$set: {
			name: 'Lisa'
		},
		$inc: {
			age: 30
		}
	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	});

	// db.close();
});