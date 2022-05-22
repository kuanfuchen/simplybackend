const express = require('express');
const router = express.Router();
const postsController = require('../controllers/userControllers')

/* GET users listing. */
router.get('/', (req, res) =>{
  postsController.getUser(req,res)
});
router.post('/',(req,res)=>{
  postsController.createUsers(req,res)
})
router.delete('/:id',(req,res)=>{
  postsController.deleteOneUser(req,res)
});
router.delete('/',(req, res)=>{
  postsController.deleteManyUser(req,res)
})
router.patch('/:id',(req,res)=>{
  postsController.updataUser(req,res)
})
module.exports = router;
