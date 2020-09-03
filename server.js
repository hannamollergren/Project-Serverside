const express = require('express')
const bodyParser = require('body-parser');	
const app = express()
const port = 1234; // Port number

const { getAllBoats, addBoat, getBoat, search, deleteBoat, editBoat } = require('./database.js');

// MIDDLEWARE 
app.use( (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
} )

app.use(express.static(__dirname + '/public')) 

app.use( bodyParser.urlencoded({ extended: true }) )
app.use( bodyParser.json() )

// ROUTES

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
	getBoat(req.query.id, dataOrError => {
		console.log('GET / boat', req.query.id)
		console.log('getboat server dataorerror', dataOrError)
		res.send(dataOrError)
	})
}) 

// POST 
app.post('/boat?', (req, res) => {
	addBoat(req.body, param => {
		res.send(param)
	})
})

// SEARCH
app.get('/search', (req, res) => {
	console.log('GET / SEARCH')
	search(req.query, param => {
		res.send(param)
	})
})

// DELETE
app.delete('/boat/:_id', (req, res) => {
	console.log('DELETE / boat', req.params)
	deleteBoat(req.params, param => {
		console.log('deleteBoat param:', param)
		res.send(param)
	})
})

// PUT
app.put('/edit', (req, res) =>{
	console.log('PUT / edit')
	editBoat()
	res.send('Edit route')
})


// STARTAR WEBBSERVERN
app.listen(port, () => {
	console.log('Web server listening on port ' + port)
})