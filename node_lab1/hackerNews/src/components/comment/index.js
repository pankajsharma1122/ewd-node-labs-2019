import React, { Component } from 'react';

export default class Comment extends Component {
    handleVote = () => {
        this.props.upvoteHandler(this.props.comment.id);
    };
    render() {
        return (
            <div>
                <span className="glyphicon glyphicon-thumbs-up ptr"
                    onClick={this.handleVote}></span>
                {this.props.comment.upvotes} - by {this.props.comment.author}
                <span className="newsitem" >
                    {this.props.comment.comment}
                </span>
            </div>                
        );
    }
}