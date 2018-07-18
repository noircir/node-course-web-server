const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// Middleware to create server log
app.use((req, res, next) => {
	var now = new Date().toString();

	var log = `${now}: ${req.method} ${req.originalUrl}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log.');
		}
	})
	next();
});

// Middleware for server maintenance (no 'next()')
// app.use((req, res, next) => {
// 	res.render('maintenance');
// });

// Public directory should be under the maintenance middleware
app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	// res.send("<h1>Hello Express! We meet again!</h1>");
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		pageHeading: 'Welcome to Home Page!!!',
		name: 'Nellie',
		likes: [
			'Biking',
			'Cities'
		]
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About page',
		pageHeading: 'About this website'
	});
});

app.get('/bad', (req, res) => {
	// res.send('Whatever you are looking for does not exist :(');
	res.send({
		error: 404,
		message: 'Whatever you are looking for does not exist :( '
	});
});

app.listen(3000, () => {
	console.log('Server is up on port 3000...');
});