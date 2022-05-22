const Post = require('../models/postsModel');
const User = require('../models/usersModel');
const handleSuccess = require('../severices/handleSuccess');
const handleError = require('../severices/handleError');

const postsContrllers = {
  getPosts: async(req, res)=>{
		console.log(req.query)
		const searchContent = req.query.search !==undefined && req.query.search !== null? {'content':new RegExp(req.query.search)} :{};
    const timeStamp = req.query.timeStamp==='asc'?'createAt':'-createdAt';
    const data = await Post.find(searchContent).populate({
			path:'user',
      select:'name photo'
    }).sort(timeStamp);
		console.log(data)
    handleSuccess(res, data)
  },
	createPost: async(req,res)=>{
		try{
			if(req.body.user && req.body.name && req.body.content){
				const data = {
					'name':req.body.name,
					'user':req.body.user,
					'content':req.body.content,
					'image':req.body.image
				}
				const info=await Post.create(data);
				handleSuccess(res,info)
			}else{
				handleError(res, 'name、user沒寫')
			}
		}catch(err){
			handleError(res, err.message)
		}
	},
	deleteOnePosts:async(req, res)=>{
		try{
			const id = req.params.id;
			const deleteMessage=await Post.findByIdAndDelete(id)
			if(deleteMessage!==null){
				handleSuccess(res,'刪除成功')
			}else{
				handleError(res, '重複刪除貼文')
			}
			
			
		}catch(err){
			handleError(res, err.message)
		}
	},
	deleteManyPosts:async(req,res)=>{
		if(req.originalUrl==='/posts'){
			await Post.deleteMany({});
      handleSuccess(res,[]);
		}else{
			handleError(res,'補上id')
		}
	},
	updataPosts:async(req,res)=>{
		try{
			const id = req.params.id;
			const info = req.body;
			if( id && info.name && info.user && info.content){
				const data = await Post.findByIdAndUpdate(id,{
					'name':info.name,
					'user':info.user,
					'content':info.content,
					'image':info.image
				},{new:true, runValidators: true})
				handleSuccess(res, data)
			}else{
				handleError(res, '缺少資訊')
			}
		}catch(err){
			handleError(res, err.message)
		}
	}
}
module.exports = postsContrllers