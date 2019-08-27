import React, { Component } from 'react';

export default class Form extends React.Component {
    state = { comment: '', name: ''};

    handleCommentChange = (e) => {
        this.setState({comment : e.target.value});
    };

    handleNameChange = (e) => {
        this.setState({name: e.target.value});
    };

    onSubmit = (e) => {
        e.preventDefault();
        let comment = this.state.comment.trim();
        let name = this.state.name.trim();
        if (!comment ) {
            return;
        }
        this.props.commentHandler(comment,name );
        this.setState({comment: '', name: ''});
    };

    render() {
        return (
            <form  style={{marginTop: '30px'}}>
                <h3>Add a new comment</h3>

                <div className="form-group">
                    <input type="text"  className="form-control"
                        placeholder="Comment" value={this.state.comment}
                        onChange={this.handleCommentChange} ></input>
                </div>     
                <div className="form-group">
                    <input type="text"  className="form-control"
                        placeholder="Your name" value={this.state.name}
                        onChange={this.handleNameChange} ></input>
                </div>
                <button type="submit" className="btn btn-primary"
                    onClick={this.onSubmit}>Submit</button>
            </form>
        );
    }
}