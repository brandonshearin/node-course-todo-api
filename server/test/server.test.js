const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server.js');
const {Todo} = require('../models/todo.js');


const todos = [{
	_id: new ObjectID(),
	text: 'first test todo'
}, {
	_id: new ObjectID(),
	text: 'second test todo',
	completed: true,
	completedAt: 333
}];


beforeEach((done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => {
		done();
	})
});


describe('POST /todos', () => {
	it('should create a new todo', (done) => {
		var text = 'Test todo text';

		request(app)
			.post('/todos')
			.send({
				text: text
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.text).toBe(text);
			})
			.end((err, res) => {
				if(err){
					return done(err);
				}

				Todo.find().then((todos) => {
					expect(todos.length).toBe(3);
					expect(todos[2].text).toBe(text);
					done();
				}).catch((err) => {
					done(err);
				});
			});
	});

	it('should not create todo with invalid body data', (done) => {
		request(app)
			.post('/todos')
			.send({})
			.expect(400)
			.end((err, res) => {
				if(err){
					return done(err);
				}
			})

			Todo.find().then((todos) => {
				expect(todos.length).toBe(2);
				done();
			}).catch((err) => {
				done(err);
			});
	});
});


describe('GET /todos route', () => {
	it('shuld get all todos', (done) => {
		request(app)
			.get('/todos')
			.expect(200)
			.expect((res) => {
				expect(res.body.todos.length).toBe(2);
			})
			.end(done);
	});

});



describe('GET /todos/:id', () => {
	it('should return todo doc', (done) => {
		request(app)
			.get(`/todos/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(todos[0].text);
			})
			.end(done);
	});
	it('should return 404 if todo not found', (done) => {
		var idee = new ObjectID();
		request(app)
		.get(`/todos/${idee}.toHexString()`)
		.expect(404)
		.end(done);
	});

	it('should return 404 for non-objcet ids', (done) => {
		var idee2 = 123;
		request(app)
		.get(`/todos/${idee2}`)
		.expect(404)	
		.end(done);
	});

});


describe('DELETE /todos/:id', () => {
	it('should remove a todo', (done) => {
		var hexId = todos[1]._id.toHexString();

		request(app)
		.delete(`/todos/${hexId}`)
		.expect(200)
		.expect((res) => {
			expect(res.body._id).toBe(hexId);
		})
		.end((err, res) => {
			if(err){
				return done(err);
			}
			//query database using findById
			Todo.findById(hexId).then((todo) => {
				expect(todo).toNotExist();
				done();
			}).catch((err) => {done(err)});
		});
	});

	it('should return 404 if todo not found', (done) => {
		var idee = new ObjectID();
		request(app)
		.delete(`/todos/${idee}.toHexString()`)
		.expect(404)
		.end(done);
	});

	it('should return 404 if object id is invalid', (done) => {
		var idee2 = 123;
		request(app)
		.delete(`/todos/${idee2}`)
		.expect(404)	
		.end(done);
	});

});


describe('PATCH /todos/:id', () => {
	it('should update the todo', (done) => {
		//grab id of first item
		//update text, set completed true
		//assert 200 back, text changed, commpleted is true, completed at is a number .toBeA

		var id = todos[0]._id.toHexString();
		request(app)
		.patch(`/todos/${id}`)
		.send({
			text: 'heres the first test',
			completed: true
		})
		.expect(200)
		.expect((res) => {
			expect(res.body.todo.text).toBe('heres the first test');
			expect(res.body.todo.completed).toBe(true);
			expect(res.body.todo.completedAt).toBeA('number');
		})
		.end(done)

	});


	it('should clear completedAt when todo is not completed', (done) => {
		//grab id of second id
		//update text, set completed to false
		//200
		//text is changed, completed is now false, completedAT is null toNotXist
		var id = todos[1]._id.toHexString();
		request(app)
		.patch(`/todos/${id}`)
		.send({
			text: 'heres the second test',
			completed: false
		})
		.expect(200)
		.expect((res) => {
			expect(res.body.todo.text).toBe('heres the second test');
			expect(res.body.todo.completed).toBe(false);
			expect(res.body.todo.completedAt).toNotExist();
		})
		.end(done)
	});
});





















