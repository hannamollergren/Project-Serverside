const express = require('express')
const bodyParser = require('body-parser');	
const app = express()

const port = 1234; // Port number

// MIDDLEWARE 
app.use( (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
} )

app.use(express.static(__dirname + '/public')) 

app.use( bodyParser.urlencoded({ extended: true }) )
app.use( bodyParser.json() )

// DATA
let boats = [
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
	},
	{
		id: '',
		model: 'Buster',
		year: 1990,
		price: 155550.99,
		is_sail: 'Yes',
		has_motor: 'No',
		image: ''
	},
	{
		id: '',
		model: 'Sea Ray',
		year: 2020,
		price: 10000000.99,
		is_sail: 'No',
		has_motor: 'Yes',
		image: ''
	},
	{
		id: '',
		model: 'Princess',
		year: 2022,
		price: 178889999.99,
		is_sail: 'Yes',
		has_motor: 'No',
		image: ''
	},
	{
		id: '',
		model: 'X900S',
		year: 1986,
		price: 30000088.99,
		is_sail: 'No',
		has_motor: 'Yes',
		image: ''
	}
];

// REQUEST
app.get('/', (req, res) => {
	console.log('GET / index.html')
	res.sendFile(__dirname + '/public/index.html')
})

// GET /boats/
app.get('/boats/', (req, res) => {
	console.log('GET / boats')
	res.send(boats)
})

// GET /boat?id=x
app.get('/boat', (req, res) => {
    let id = Number(req.query.id)
    res.send( boats[id] )
}) 

// POST
app.post('/boat', (req, res) => {
	let newBoat = {model: req.body.model, year: req.body.year, price: req.body.price, is_sail: req.body.is_sail, has_motor: req.body.has_motor}
	console.log('newBoat', newBoat)
	boats.push(newBoat);
	res.send('New boat added.');
})


app.listen(port, () => {
	console.log('Web server listening on port ' + port)
})