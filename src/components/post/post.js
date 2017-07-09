// react
import React from 'react';
// styles
import './post.css';
// resources
import Months from '../../resources/months.js';
// services
import GetJSON from '../../services/GetJSON.js';

class Post extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			comment_page: 1,
			comments: [],
			more: false
		}
		this.Log = this.Log.bind(this);
		this.PrevComments = this.PrevComments.bind(this);
		this.NextComments = this.NextComments.bind(this);
		this.GetComments = this.GetComments.bind(this);
		this.ShowComments = this.ShowComments.bind(this);
		this.ShowAuthor = this.ShowAuthor.bind(this);
	}
	
	// load previous page of comments
	PrevComments(){
		this.setState((prev, props) => {
			return {
				comment_page: prev.comment_page-1
			}
		});
		this.GetComments();
	}
	
	// load next page of comments
	NextComments(){
		this.setState((prev, props) => {
			return {
				comment_page: prev.comment_page+1
			}
		});
		this.GetComments();
	}
	
	// load currently selected page of comments
	GetComments(){
		var self = this;
		var id = this.props.post.id;
		GetJSON('/comments/'+id+'/'+this.state.comment_page).then((comments) => {
			self.setState((prev, props) => {
				return {
					comments: comments.results,
					more: comments.next !== null
				}
			});
		});
	}
	
	// render comments list, or nothing if there are none
	ShowComments(){
		if(this.state.comments.length){
			return (
				<div className='comments_list'>
					{this.state.comment_page > 1 ? <a className='prev' onClick={this.PrevComments}>Previous</a> : null}
					{this.state.comments.map((comment, key) => {
						return (
							<div key={key} className='comment'>
								<h3>{comment.author.full_name}</h3>
								<p dangerouslySetInnerHTML={{'__html': comment.body_markup}} />
							</div>
						);
					})}
					{this.state.more === true ? <a className='next' onClick={this.NextComments}>Next</a> : null}
				</div>
			);
		} else {
			return null;
		}
	}
	
	// show author if there is one set
	ShowAuthor(){
		var p = this.props.post;
		if(p.author !== null){
			return (
				<div className='author'>
					<div className='picture_wrap'>
						<img src={p.author.picture && p.author.picture.small} />
					</div>
					<div className='author_data'>
						<h2>{p.author.full_name}</h2>
						<h3>{p.author.major.name}</h3>
						<h3>{p.author.university.longname}</h3>
					</div>
					<img className='settings' src='assets/elipsis-icon.png' />
				</div>
			);
		} else {
			return null;
		}
	}
	
	render(){
	
		var p = this.props.post;
		var posted_at = new Date(this.props.post.created_date);
		var now = Date.now();
		var ago = (now - posted_at)/1000;
		var minutes_ago = ago/60;
		var hours_ago = minutes_ago/60;
		var days_ago = hours_ago/24;
		var when = '';
		if(minutes_ago < 1){
			when = "Less than a minute ago";
		} else if(hours_ago < 0.9){
			when = Math.round(minutes_ago) + " minutes ago";
		} else if(hours_ago < 1.1){
			when = "An hour ago";
		} else if(days_ago < 0.9) {
			when = Math.round(hours_ago) + " hours ago";
		} else {
			when = Months[posted_at.getMonth()] + " " + posted_at.getDate();
		}
		return (
			<div className='post'>
				{this.ShowAuthor()}
				<h4 className='posted_at'>{when}</h4>
				<div className='body' dangerouslySetInnerHTML={{'__html': p.content_markup}} />
				<div className='interact'>
					<img className='like_icon' src='assets/rate-like-icon.png' />
					<img className='comment_icon' src='assets/comment-icon.png' />
					<img className='share_icon' src='assets/share-icon.png' />
				</div>
				<div className='comments'>
					<p className='add'>Add a comment...</p>
					<p className='existing' onClick={this.GetComments}>
						{p.comment_count} Comment{p.comment_count === 1 ? '' : 's'}
					</p>
					{this.ShowComments()}
				</div>
			</div>
		);
	}
}

export default Post;