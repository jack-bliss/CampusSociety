// react
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
// styles
import './post-list.css';
// components
import Post from '../post/post.js';
// services
import GetJSON from '../../services/GetJSON.js';

class PostList extends React.Component{
	constructor(props){
		super(props);
		
		// bind methods
		this.getPage = this.getPage.bind(this);
		
		this.state = {
			hasMore: true,
			page: 1,
			items: []
		}
		
		// automatically load the first page
		this.getPage(1);
	}
	
	// 'loading' message for infinite scrolling
	Loader(){
		return <div className='loading'>. . . Loading . . .</div>
	}
	
	// loads in a page of posts and adds it to the list
	getPage(){
		var self = this;
		GetJSON('/posts/'+self.state.page).then((response) => {
			self.setState((prev, props) => {
				return {
					items: prev.items.concat(response.results),
					hasMore: typeof(response.next) === 'string',
					page: prev.page+1
				}
			});
		});
	}
	
	// render list using infinte scroll
	render(){
		return (
			<div className='post_list'>
				<InfiniteScroll
					next={this.getPage}
					hasMore={true}
					loader={this.Loader()}>
				
					{this.state.items.map((item, key) => {
						return <Post key={key} post={item} />
					})}
				
				</InfiniteScroll>
			</div>
		);
	}
}

export default PostList;