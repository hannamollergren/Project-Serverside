const express = require('express')
const app = express()

const port = 1234; // Port number

// MIDDLEWARE 
app.use(express.static(__dirname + '/public')) 

// DATA
let boat = [
	{
	id: '',
	model: 'Marin',
	year: 2010,
	price: 134000.77,
	is_sail: 'Yes',
	has_motor: 'No',
	image: ''
	},
	{
	id: '',
	model: 'Aquador',
	year: 2014,
	price: 18888000.88,
	is_sail: 'Yes',
	has_motor: 'No',
	image: ''
	},
	{
	id: '',
	model: 'Nimbus',
	year: 2099,
	price: 14555500.99,
	is_sail: 'No',
	has_motor: 'Yes',
	image: ''
	},
	{
	id: '',
	model: 'Black Pearl',
	year: 1890,
	price: 18888000.89,
	is_sail: 'Yes',
	has_motor: 'No',
	image: ''
	},
	{
	id: '',
	model: 'Buster',
	year: 1990,
	price: 155550.99,
	is_sail: 'Yes',
	has_motor: 'No',
	image: ''
	}
];

// REQUEST
app.get('/', (req, res) => {
	console.log('GET / index.html')
	res.sendFile(__dirname + '/public/index.html')
})

app.get('/boats/', (req, res) => {
	console.log('GET / boats')
	res.send(boat)
	/* res.sendFile(__dirname + '/public/boats.html') //denna ska byta till denna filen och skriva ut datan */
})

app.listen(port, () => {
	console.log('Web server listening on port ' + port)
})