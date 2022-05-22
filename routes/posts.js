const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsControllers')

/* GET users listing. */
router.get('/', (req, res) =>{
  postsController.getPosts(req,res)
});
router.post('/',(req,res)=>{
  console.log(req.body)
  postsController.createPost(req,res)
})
router.delete('/:id',(req,res)=>{
  postsController.deleteOnePosts(req,res)
});
router.delete('/',(req, res)=>{
  postsController.deleteManyPosts(req,res)
})
router.patch('/:id',(req,res)=>{
  postsController.updataPosts(req,res)
})
module.exports = router;
