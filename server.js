const express = require('express')
const app = express()

const port = 1234; // Port number

// MIDDLEWARE 
app.use(express.static(__dirname + '/public')) 

// DATA
let boat = {
	id: '',
	model: 'Marin',
	year: 2010,
	price: 134000.00,
	sail: 'Yes',
	motor: 'No',
	image: ''
}

// REQUEST
app.get('/', (req, res) => {
	console.log('GET / index.html')
	res.sendFile(__dirname + '/public/index.html')
})

app.get('/boats/', (req, res) => {
	// req.params
	console.log('GET / boats.html')
	/* res.send(boat) */
	res.sendFile(__dirname + '/public/boats.html') //denna ska byta till denna filen och skriva ut datan
})

app.listen(port, () => {
	console.log('Web server listening on port ' + port)
})