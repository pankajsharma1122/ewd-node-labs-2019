import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import _ from 'lodash'
import api from '../dataStore/stubAPI';
import CommentList from './commentList'
import Form from './commentForm'

class CommentPage extends Component {
    addComment = (comment, name) => {
        let pid =  this.getId() 
        api.addComment(pid,comment ,name );
        this.setState({});
    };

    incrementUpvote = (commentId) => {
        let pid =  this.getId() 
        api.upvoteComment(pid,commentId) ;
        this.setState({});
    };

    getId = () => parseInt( this.props.match.params.post_id, 10);

    render() {
        let pid = this.getId()
        let post = api.getPost(pid);
        let line = post.link ?
            <a href={post.link}>{post.title} </a> :
            <span>{post.title} </span> ;
        let comments = _.sortBy(post.comments, 
                (comment) => - comment.upvotes
        ); 
        return (  
          <div className="container">
            <div className="row">
            <div className="col-md-9 col-md-offset-1">
                <h3>{line} </h3>
                <CommentList comments={comments} 
                    upvoteHandler={this.incrementUpvote } />
                <Form post={post}  addCommentHandler={this.addComment} /> 
            </div>
            </div>
          </div>
        )
    }
}

export default withRouter(CommentPage);