'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const util = require('util');

let network = require('./fabric/network.js');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

//get user info, create user object, and update state with their userId

app.post('/registerUser', async (req, res) => {
	console.log('req.body: ');
	console.log(req.body);
	let userId = req.body.userId;

	//first create the identity for the user and add to wallet
	let response = await network.registerUser(userId, req.body.location, req.body.firstName, req.body.lastName);
	console.log('response from registerUser: ');
	console.log(response);
	if (response.error) {
		res.send(response.error);
	} else {
		console.log('req.body.userId');
		console.log(req.body.userId);
		let networkObj = await network.connectToNetwork(userId);
		console.log('networkobj: ');
		console.log(networkObj);

		if (networkObj.error) {
			res.send(networkObj.error);
		}
		console.log('network obj');
		console.log(util.inspect(networkObj));


		req.body = JSON.stringify(req.body);
		let args = [req.body];

		//connect to network and update the state with userId  
		let invokeResponse = await network.invoke(networkObj, false, 'createUser', args);
		
		if (invokeResponse.error) {
			res.send(invokeResponse.error);
		} else {
			console.log('after network.invoke ');
			let parsedResponse = JSON.parse(invokeResponse);
			parsedResponse += '. Use userId to login above.';
			res.send(parsedResponse);
		}

  	}


});

//used as a way to login the user to the app and make sure they haven't voted before 
app.post('/validateUser', async (req, res) => {
	console.log('req.body: ');
	console.log(req.body);
	let networkObj = await network.connectToNetwork(req.body.userId);
	console.log('networkobj: ');
	console.log(util.inspect(networkObj));

	if (networkObj.error) {
		res.send(networkObj);
	}

	let invokeResponse = await network.invoke(networkObj, true, 'readDonation', req.body.userId);
	if (invokeResponse.error) {
		res.send(invokeResponse);
	} else {
		console.log('after network.invoke ');
		let parsedResponse = await JSON.parse(invokeResponse);
		res.send(parsedResponse);
	}

});



app.listen(process.env.PORT || 8081);