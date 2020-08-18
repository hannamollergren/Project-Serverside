const express = require('express')
const app = express()

const port = 1234; // Port number

// MIDDLEWARE 
app.use(express.static(__dirname + '/public')) 

// REQUEST
app.get('/', (req, res) => {
	console.log('GET / index.html')
	res.sendFile(__dirname + '/public/index.html')
})

app.listen(port, () => {
	console.log('Web server listening on port ' + port)
})