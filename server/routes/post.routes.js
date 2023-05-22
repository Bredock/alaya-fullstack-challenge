const express = require('express');
const router = express.Router();
const passport    = require('passport');
const PostController = require('../controllers/post.controller');

// Get all Posts
router.route('/posts').get(PostController.getPosts);

// Get one post by cuid
router.route('/posts/:cuid').get(PostController.getPost);

// Add a new Post
router.route('/posts').all(passport.authenticate('jwt', { session: false })).post(PostController.addPost);

// Delete a post by cuid
router.route('/posts/:cuid').all(passport.authenticate('jwt', { session: false })).delete(PostController.deletePost);

module.exports = router;
