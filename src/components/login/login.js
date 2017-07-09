// react
import React from 'react';
// styles
import './login.css';

class Login extends React.Component{
	constructor(props){
		super(props);
		
		// bind methods
		this.Submit = this.Submit.bind(this);
		this.Retry = this.Retry.bind(this);
		this.Loading = this.Loading.bind(this);
	}
	
	componentDidMount(){
		// start with email field focused
		this.email.focus();
	}
	
	Submit(e){
		// prevent default, and use prop-set method for submission
		e.preventDefault();
		this.props.submit(this.email.value, this.password.value);
	}
	
	Retry(){
		// display message when login fails
		if(this.props.retry){
			return <h3 className='warn'>Username/Password not recognised. Please try again.</h3>;
		} else {
			return null;
		}
	}
	
	Loading(){
		// either show a log-in button or tell the user to wait
		if(this.props.loading){
			return <h3>Please Wait</h3>;
		} else {
			return <input type='submit' value='Log In' />;
		}
	}
	
	render(){
		return (
			<form onSubmit={this.Submit}>
				<h1>Campus Society</h1>
				{this.Retry()}
				<input type='text' ref={input => this.email = input} placeholder='Email Address' />
				<input type='password' ref={input => this.password = input} placeholder='Password' />
				{this.Loading()}
			</form>
		);
	}
}

export default Login;