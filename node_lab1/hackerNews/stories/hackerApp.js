import React from 'react';
import { storiesOf } from '@storybook/react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Form from '../src/components/newsForm';
import NewsItem from '../src/components/newsItem';
import NewsList from '../src/components/newsList';
import { action } from '@storybook/addon-actions';

import CommentForm from '../src/components/commentForm';
import Comment from '../src/components/comment';
import CommentList from '../src/components/commentList';

const post = {
    id: 1 ,
    title : 'Post 1.',
    link : 'http://www.foo.bar',
    username : 'jbloggs',
    comments : [],
    upvotes: 10
};


storiesOf('Hacker App/News Item', module)
    .add('default', () => <NewsItem post= { post }  />
    )
    .add('No hyperlink', () => <NewsItem post= { { ...post, link: ''} }  />
    )


storiesOf('Hacker App/News Form', module)
       .add('default', () =>  <Form handleAdd={action("Form Submitted")} />
       )



      
storiesOf('Hacker App/News List', module)
       .add('default', () => { 
         const defaultPosts = [
             { ...post, id: 1, title: 'Post 1', upvotes: 10 },
             { ...post, id: 2, title: 'Post 2', upvotes: 20 },
             { ...post, id: 3, title: 'Post 3', upvotes: 30 },
             { ...post, id: 4, title: 'Post 4', upvotes: 40 }
         ];
         return <NewsList posts= { defaultPosts }  />
     });



     storiesOf('Hacker App/Comment page/Comment Form', module)
     .add('default', () =>  
         <CommentForm  addCommentHandler={ action('comment added') } />
 )
 
 const comment = {
     id: 1,
     author: 'Joe Bloggs',
     comment: 'I agree with .....',
     upvotes: 10
 }
 
 storiesOf('Hacker App/Comment page/Comment', module)
     .add('default', () =>  
         <Comment upvoteHandler={ action('upvoted') }
             comment={comment} />
 )
 
 storiesOf('Hacker App/Comment page/Comment list', module)
     .add('default', () => { 
         const defaultComments = [
            comment,
           { ...comment, author: 'Jane Smith', upvotes: 3, id: 2},
           { ...comment, comment: 'On the other hand', id: 3 },
           { ...comment, author: 'Jill Dwyer', upvotes: 5, id: 4 },
         ];
         return <CommentList upvoteHandler={ action('upvoted') }
                     comments= { defaultComments }  />
         }
     )    

   
