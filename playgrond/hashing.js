var {SHA256} = require('crypto-js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var password = 'password69';

// bcrypt.genSalt(10, (err, salt) => {
// 	bcrypt.hash(password, salt, (err, hash) => {
// 		console.log(hash);
// 	});
// });

var hashedPassword = '$2a$10$MS1/2OK4rDrJjUBflMF1V.1IwuNw99Gw5kgWTpF.Dqoh7tKAxruMm';
bcrypt.compare(password, hashedPassword, (err, result) => {
	console.log(result);
});





// jwt.sign;
// jwt.verify;


// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
// 	id: 4
// };
// var token = {
// 	data: data,
// 	hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }


// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if(resultHash === token.hash){
// 	console.log('data wasnt changed')
// }else{
// 	console.log('data was indeed changed, dont trust')
// }