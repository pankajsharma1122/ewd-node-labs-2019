import express from 'express';
import Post from './postsModel';
import asyncHandler from 'express-async-handler';

const router = express.Router();// eslint-disable-line

router.get('/', asyncHandler(async (req, res) => {
  await Post.find().sort('date').limit(2).exec(function(err, posts) {
    //do stuff with posts
    return res.send(posts);
  });
  
}));

// Add a post
router.post('/', asyncHandler(async (req, res) => {
    const newPost = req.body;
    //console.log("newPost11>>" + newPost);
    //let maxid = 1;
    if (newPost) {
      /*maxid = await Post.findOne().sort('-id').exec( async function (err, post) {
        if(post) {
          console.log("post>>" + post)
          maxid = parseInt(post.id, 10) + 1;
          console.log("maxid>>" + maxid);
          console.log("username>>" + newPost.username);
          //console.log("maxid>>" + maxid)
          //return parseInt(post.id, 10) + 1;
          //await newPost["id"] = maxid;

          console.log(JSON.stringify(newPost,null,'\t'));
          newPost["sdsfsdfdsfdsf"] = 12121;
          console.log(JSON.stringify(newPost,null,'\t'));
          const post1 = await Post.create(newPost);
          return res.status(201).send({post1});
          //console.log("newPost>>" + newPost.toString())
          
        }});*/


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
    const post = await Post.findById(id);
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