const express = require('express');
const request = require('request');				// for fetching info from server
const cookieParser = require('cookie-parser');  // cookie parser middle-ware
const path = require('path');
const app = express();
app.use(cookieParser());

const port = process.env.PORT || 8080;
app.set('port', port);

app.use(express.static(path.join(__dirname, './dist')));

// perform login
app.get('/email_auth/:email/:password', (req, res) => {
	request({
		url: 'https://stage.0cs.io/api/2/email-auth/',
		method: 'POST',
		json: {
			'email': req.params.email,
			'password': req.params.password
		}
	}, (err, response, body) => {
		if(body.success){
			// store auth token as a secure cookie
			res.cookie('token', body.token, {
				httpOnly: true,
				secure: true
			});
			res.send('{"success": true}');
		} else {
			res.send('{"success": false}');
		}
	});
});

app.get('/posts/:page/', (req, res) => {
	// fetch posts using secure token
	request({
		url: 'http://stage.0cs.io/api/3/posts/?page='+req.params.page,
		method: 'GET',
		headers: {
			'Authorization': 'Token '+req.cookies.token
		}
	}, (err, response, body) => {
		res.send(body);
	});
});

app.get('/comments/:post/:page/', (req, res) => {
	// fetch comments using secure token
	request({
		url: 'http://stage.0cs.io/api/3/posts/'+req.params.post+'/comments/?ordering=-created_date&amp;page='+req.params.page,
		method: 'GET',
		headers: {
			'Authorization': 'Token '+req.cookies.token
		}
	}, (err, response, body) => {
		res.send(body);
	});
});	

app.get('*', (req, res) => {
	res.sendFile(__dirname + '/dist/app.html');
});

app.listen(port, () => console.log('Listening on port', port));