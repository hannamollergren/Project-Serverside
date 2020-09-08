const { MongoClient, ObjectID } = require('mongodb')

const url = "mongodb+srv://dbBerras:höst2020@hanna.qo8ls.gcp.mongodb.net/boatDB?retryWrites=true&w=majority"
const collectionName = 'boats';
const databaseName = 'boatDB';

console.log('About to connect to database.')

// GET
function get(filter, callback) {
	MongoClient.connect(
		url,
		{ useUnifiedTopology: true },
		async (error, client) => {
			if(error) {
				callback('"Error! Could not connect!"');
				return; 
			}
			const col = client.db(databaseName).collection(collectionName);
			try {
				
				const cursor = await col.find(filter);
				const array = await cursor.toArray()
				callback(array);

			} catch(error) {
				console.log('"Query error: "' + error.message);
				callback('"Error! Bad query."');

			} finally {
				client.close();
			}
		}
	)
}
// GET ALL BOATS
function getAllBoats(callback) {
	console.log('GET / getAllBoats')
	get({}, callback)
}

// ADD BOAT
function addBoat(requestBody, callback){
	console.log('POST / addBoat')
	const doc = requestBody;

	MongoClient.connect(
		url,
		{ useUnifiedTopology: true },
		async (error, client) => {
			if(error) {
				callback('Error! Could not connect!');
				return; 
			}
			const col = client.db(databaseName).collection(collectionName);
			try {
				const result = await col.insertOne(doc);
				callback({
					result: result.result,
					ops: result.ops
				})

			} catch(error) {
				callback('Error! Bad query.');

			} finally {
				client.close();
			}
		}
	)
} 

// GET BOAT
function getBoat(id, callback){
	console.log('GET / getBoat')
	get({_id: new ObjectID(id._id)}, array => callback(array[0]))
}

// SEARCH
function search(query, callback){
	const filter = {};

	if( query.word ){
		filter.model={ "$regex": `.*${query.word}.*`,"$options":"i"};
	}
	if( query.maxprice ){
		let price = Number(query.maxprice);
		filter.price = {$lt: price}
	}
	if( query.madebefore ){
		let year = Number(query.madebefore);
		filter.year = {$lt: year}
	}
	if( query.madeafter ){
		let year = Number(query.madeafter);
		filter.year = {$gt: year}
	}

	MongoClient.connect(
		url,
		{ useUnifiedTopology: true },
		async (error, client) => {
			if(error) {
				callback('"Error!! Could not connect"');
				return;  
			}
			const col = client.db(databaseName).collection(collectionName);
			try {
				const cursor = await col.find(filter);
				const array = await cursor.toArray()
				callback(array);

			} catch(error) {
				console.log('Query error: ' + error.message);
				callback('"Error!! Query error"');

			} finally {
				client.close();
			}
		}
	)
}

// DELETE
function deleteBoat(param, callback){
	console.log('DELETE / deleteBoat')
	const doc = {_id: new ObjectID(param._id)};

	MongoClient.connect(
		url,
		{ useUnifiedTopology: true },
		async (error, client) => {
			if(error) {
				callback('"Error! Could not connect!"');
				return; 
			}
			const col = client.db(databaseName).collection(collectionName);
			try {
				const result = await col.deleteOne(doc);
				callback({
					result: result.result,
					ops: result.ops
				})

			} catch(error) {
				callback('"Error! Bad query."');

			} finally {
				client.close();
			}
		}
	)

}

// RESET
function reset(req, callback) {
	console.log('POST / reset')

	MongoClient.connect(
		url,
		{ useUnifiedTopology: true },
		async (error, client) => {
			if(error) {
				callback('Error! Could not connect!');
				return; 
			}
			client.db(databaseName).collection(collectionName).drop();
			try {
				/* reset.drop(); */
				const col = client.db(databaseName).collection(collectionName);
				const result = await col.insertMany(req);
				callback({
					result: result.result,
					ops: result.ops
				})

			} catch(error) {
				callback('Error! Bad query.');

			} finally {
				client.close();
			}
		}
	)
}


module.exports = {
	get, getAllBoats, addBoat, getBoat, search, deleteBoat, reset
}