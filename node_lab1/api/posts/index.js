import express from 'express';
import Post from './postsModel';
import asyncHandler from 'express-async-handler';

const router = express.Router();// eslint-disable-line

router.get('/', asyncHandler(async (req, res) => {
  await Post.find().sort('date').limit(15).exec(function(err, posts) {
    //do stuff with posts
    return res.send(posts);
  });
  
}));

// Add a post
router.post('/', asyncHandler(async (req, res) => {
  const newPost = req.body;
  // console.log(req.method);
  //   console.log(req.headers);
  //   console.log(req.url);
  //   console.log(req.body);
  //   console.log("req.user::" + JSON.stringify(req.user));
  newPost.user = req.user || 'anonymous';
  if (newPost) {
        const post = await Post.create(newPost);
        return res.status(201).send({post});
    } else {
       return handleError(res, err);
    }
}));

// upvote a post
router.post('/:id/upvotes', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const post = await Post.Model.findOne({"id" : id},() => {

     }
  );
  post.upvotes++;
  await post.save();
  return res.status(201).send({post});
}));

// get post
router.get('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const post = await Post.findById(id).populate('user');
    return res.send({post});
}));


// add a comment
router.post('/:id/comments', asyncHandler(async (req, res) => {
     const id = req.params.id;
     const comment = req.body;
     //let post = null;
     ///const post = await Post.findOne({"id" : parseInt(id, 10)},() => {});
     const post = await Post.findById(id);
     
     console.log("post ::>" + post);
     //console.log("req 11::>" + req.body);
     post.comments.push(comment);
     await post.save();
     return res.status(201).send({post});
   }));


   // add a comment upvotes
router.post('/:id/comments/:commentId/upvotes', asyncHandler(async (req, res)  => {
     const id = req.params.id;
     const commentId = req.params.commentId;
     //const post = await Post.findOne({"id" : id},() => {});
     //const post = await Post.findOne({"id" : parseInt(id, 10)},() => {});
     const post = await Post.findById(id);
     //const index = post.comments.findIndex(comment => comment.id === commentId);
     //console.log("post.comments[index]::>" + index + "   >>"+ post.comments[index]);
     post.comments.id(commentId).upvotes++;

     await post.save();
     return res.status(201).send({post});
   }));

   // add a comment
router.delete('/:id/comments/:commentId', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const commentId = req.params.commentId;
  const post = await Post.findById(id);
  post.comments.id(commentId).remove();
  
  await post.save();
  return res.status(201).send({post});
}));



/**
 * Handle general errors.
 * @param {object} res The response object
 * @param {object} err The error object.
 * @return {object} The response object
 */
function handleError(res, err) {
  return res.status(500).send(err);
};

export default router;