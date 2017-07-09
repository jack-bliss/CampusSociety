// modules
import React from 'react';
import ReactDOM from 'react-dom';
// services
import GetJSON from './services/GetJSON.js';
// components
import Login from './components/login/login.js';
import Post from './components/post/post.js';
import PostList from './components/post-list/post-list.js';

// collect DOM nodes
var NodeIDs = ['login', 'posts'];
var Nodes = {};
NodeIDs.forEach((id) => {
	Nodes[id] = document.getElementById(id);
});

ReactDOM.render(<Login submit={getToken} loading={false} retry={false} />, Nodes.login);

function getToken(email, password){

	// tell the user to wait
	ReactDOM.render(<Login submit={getToken} loading={true} retry={false} />, Nodes.login);

	// attempt login
	GetJSON('/email_auth/'+email+'/'+password).then((response) => {
		
		if(response.success === true){
		
			// hide login
			Nodes.login.classList.add('hidden');
			
			// show posts
			ReactDOM.render(<PostList />, Nodes.posts);
			
		} else {
		
			// tell the user to try again
			ReactDOM.render(<Login submit={getToken} loading={false} retry={true} />, Nodes.login);
			
		}
		
	});
}