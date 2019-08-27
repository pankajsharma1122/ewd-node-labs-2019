import React, { Component } from 'react';
import NewsItem from '../newsItem';

export default class NewsList extends Component {
    render() {
        //let list = this.props.posts;
        let list = this.props.posts.map( 
            (post) => <NewsItem post={post} upvoteHandler={this.props.upvoteHandler} />);
        return (
            <div>{list}</div>  
        );
    }
}