const jwt = require('jsonwebtoken');
const secret = 'joey';

const token = jwt.sign({
	name: 123,
}, secret, {
	expiresIn: 10
});

console.log(token);

jwt.verify(token, secret, (err, decoded) => {
	if (!err) {
		console.log(decoded);
	}
});


setTimeout(() => {
	jwt.verify(token, secret, (err, decoded) => {
		if (!err) {
			console.log(decoded);
		} else {
			console.log(err)
		}
	});
}, 11000);