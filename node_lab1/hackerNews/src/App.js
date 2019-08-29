import React, { Component } from 'react';
import NewsList from './components/newsList';
import Form from './components/newsForm';
import * as api from './api';
import _ from 'lodash';
import { Link } from 'react-router-dom';
 
let posts = api.getAll();
 
export default class App extends Component {
 
    state = {posts: [{}]};

 
    async componentDidMount () {
        try{
              const resp = await api.getAll();
              this.setState({
                       posts: resp,
                       isHidden: false,
                     });
           } catch (e){
             this.setState({
                      isHidden: true
                    });
           }
      };
 
    addNewsItem = (title, link) => {
        api.add(title,link)
        .then(resp => {
                      const newPost = {"id":resp.id,"title":title,"link":link,"upvotes":0, "comments":[]};
                      this.setState({posts: this.state.posts.concat([newPost])});
        })
      };
 
      incrementUpvote = (_id) => {
        api.upvote(_id).then(resp=> {
                console.log("In response" + resp);
               var upvotedPost = _.find(this.state.posts, post=>post._id == _id);
               upvotedPost.upvotes++; 
               this.setState({})
             }) ;
      };
 
      render() {
          
        const posts = _.sortBy(this.state.posts, post =>
            post.upvotes);
            console.log("render12121" + JSON.stringify(posts)) ;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-9 col-md-offset-1">
                    {this.state.isHidden &&  <Link to={'/login' }><button type="button" class="btn btn-primary">Log In</button></Link>}
                    {!this.state.isHidden && <NewsList posts={posts} upvoteHandler={this.incrementUpvote} />}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-9 col-md-offset-1">
                        <Form handleAdd={ this.addNewsItem } />
                    </div>
                </div>
            </div>
        );
    }
}