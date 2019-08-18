import express from 'express';
import {posts} from './posts';

const router = express.Router(); // eslint-disable-line
router.get('/', (req, res) => {
  res.send({posts: posts});
});

export default router;