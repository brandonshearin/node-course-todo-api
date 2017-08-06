var {SHA256} = require('crypto-js');
var jwt = require('jsonwebtoken');

// jwt.sign;
// jwt.verify;





var data = {
	id: 10
};

var token = jwt.sign(data, 'secret');

console.log(token);

var decoded = jwt.verify(token, 'secret');

console.log(decoded);

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