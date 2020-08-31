const express = require('express')
const bodyParser = require('body-parser');	
const app = express()
const port = 1345; // Port number

const { get, getAllBoats, addBoat } = require('./database.js');

// MIDDLEWARE 
app.use( (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
} )

app.use(express.static(__dirname + '/public')) 

app.use( bodyParser.urlencoded({ extended: true }) )
app.use( bodyParser.json() )

// REQUEST

// GET / index.html
app.get('/', (req, res) => {
	console.log('GET / index.html')
	res.sendFile(__dirname + '/public/index.html')
})

// GET / boats
app.get('/boats', (req, res) => {
	console.log('GET / boats')
	getAllBoats(param => {
		res.send(param)
	});
})

// GET / boat?id=x 
app.get('/boat', (req, res) => {
	let id = Number(req.query.id)
	getAllBoats(param => {
		console.log('GET / boat?id=x ', id)
		res.send(param[id])
	})
}) 

// POST /boat
app.post('/boat', (req, res) => {
	addBoat(req.body, param => {
		res.send(param)
	})
})

// PUT

// DELETE


app.listen(port, () => {
	console.log('Web server listening on port ' + port)
})