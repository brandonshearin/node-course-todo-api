// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err){
		console.log('unable to connect to db server dawg');
	}
	console.log('connected to mongodb server dawg');

	// db.collection('Todos').deleteMany({text: 'eat dinner'}).then((result) => {
	// 	console.log(result)
	// });



	// db.collection('Todos').deleteOne({text: 'skate'}).then((result) => {
	// 	console.log(result);
	// });
	
	//find one and delete

	db.collection('Todos').findOneAndDelete({completed: false}).then((result) =>{
		console.log(result);
	});



	// db.close();
});