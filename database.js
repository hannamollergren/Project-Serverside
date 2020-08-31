const { MongoClient, ObjectID } = require('mongodb')

const url = 'mongodb://localhost:27017';
const collectionName = 'boats';
const databaseName = 'boatDB';

console.log('About to connect to database.')
// GET
function get(filter, callback) {
	MongoClient.connect(
		url,
		{ useUnifiedTopology: true },
		async (error, client) => {
			if( error ) {
				callback('Error! Could not connect!');
				return; 
			}
			const col = client.db(databaseName).collection(collectionName);
			try {
				const cursor = await col.find(filter);
				const array = await cursor.toArray()
				callback(array);

			} catch(error) {
				console.log('Query error: ' + error.message);
				callback('Error! Bad query.');

			} finally {
				client.close();
			}
		}// connect callback - async
	)//connect - async
}
// GETALLBOATS
function getAllBoats(callback) {
	console.log('GET / getAllBoats')
	get({}, callback)
}

// ADDBOAT
function addBoat(requestBody, callback){
	console.log('POST / addBoat')
	const doc = requestBody;
	MongoClient.connect(
		url,
		{ useUnifiedTopology: true },
		async (error, client) => {
			if( error ) {
				callback('Error! Could not connect!');
				return;  // exit the callback function
			}
			const col = client.db(databaseName).collection(collectionName);
			try {
				// Wait for the resut of the query
				// If it fails, it will throw an error
				const result = await col.insertOne(doc);
				callback({
					result: result.result,
					ops: result.ops
				})

			} catch(error) {
				console.error('addBoat error: ' + error.message);
				callback('Error! Bad query.');

			} finally {
				client.close();
			}
		}
	)
} 

// GETBOAT
function getBoat(requestBody, callback){
	// / boat?id=x
}

module.exports = {
	get, getAllBoats, addBoat
}