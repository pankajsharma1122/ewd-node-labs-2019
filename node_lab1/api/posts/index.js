import express from 'express';
import stubAPI from './stubAPI';

const router = express.Router();

// get all posts
router.get('/', (req, res) => {
  const posts = stubAPI.getAll();
  res.send({posts: posts});
});


// Add a post
router.post('/', (req, res) => {
    const newPost = req.body;

    if (newPost && stubAPI.add(newPost.title, newPost.link)) {
         return res.status(201).send({message: 'Posts Created'});
    }
    return res.status(400).send({message: 'Unable to find Post in request.'});
});

// get a post
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const post = stubAPI.getPost(id);

       if (post) {
               return res.status(200).send(post);
              }
              return res.status(404).send({message: `Unable to find Post ${id}`});
});


// upvote a post
router.post('/:id/upvote', (req, res) => {
  const id = req.params.id;
         if (stubAPI.upvote(id)) {
              return res.status(200).send({message: `Post ${id} Upvoted`});
         }
         return res.status(404).send({message: `Unable to find Post ${id}`});
});

// add a comment
router.post('/:id/comments', (req, res) => {
  const id = req.params.id;
         if (stubAPI.addComment(id,req.comment,req.author)) {
              return res.status(200).send({message: `Comment added to post ${id} `});
         }
         return res.status(404).send({message: `Unable to find Post ${id}`});
});

// add a comment
router.get('/:id/comments', (req, res) => {
  const id = req.params.id;
  const post = stubAPI.getPost(id);
         if (post) {
              return res.status(200).send(post.comments);
         }
         return res.status(404).send({message: `Unable to find Post ${id}`});
});


// Get a comment 
router.get('/:id/comments/:commentId/upvotes', (req, res) => {
  const id = req.params.id;
  const commentId = req.params.commentId;
  const comment = stubAPI.getComment(id,commentId);
         if (comment) {
              return res.status(200).send({upvotes: `${comment.upvotes}`});
         }
         return res.status(404).send({message: `Unable to find comment for post ${id} and comment ${commentId}`});
});
// add a comment upvotes
router.post('/:id/comments/:commentId/upvotes', (req, res) => {
  const id = req.params.id;
  const commentId = req.params.commentId;
  const post = stubAPI.upvoteComment(id,commentId);
         if (post) {
              return res.status(200).send({message :"Comment upoted"});
         }
         return res.status(404).send({message: `Unable to find Post ${id}`});
});

export default router;