import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  body: {type: String, required: true},
  author: {type: String, required: true},
  upvotes: {type: Number, default: 0},
  });

 const PostSchema = new Schema({
   title: {type: String, required: true},
   link: {type: String, optional: true},
   username: {type: String, required: true},
   comments: [CommentSchema],
   upvotes: {type: Number, min: 0, max: 100, default: 0},
   id : {type: Number},
   date: {
    type: Date,
    // `Date.now()` returns the current unix timestamp as a number
    default: Date.now
  }
 });
export default mongoose.model('posts', PostSchema);