const User = require('../models/usersModel');
const handleSuccess = require('../severices/handleSuccess');
const handleError = require('../severices/handleError');

const usersContrllers = {
  getUser: async(req, res)=>{
    const data = await User.find()
    handleSuccess(res, data)
  },
	createUsers: async(req,res)=>{
		try{
			if(req.body.name && req.body.email){
				const data = {
					'name':req.body.name,
					'email':req.body.email,
          'photo':req.body.photo
				}
				const info = await User.create(data);
				handleSuccess(res,info)
			}else{
				handleError(res, '缺少name || email')
			}
		}catch(err){
			handleError(res, err.message)
		}
	},
	deleteOneUser:async(req, res)=>{
		try{
			const id = req.params.id;
			const deleteMessage=await User.findByIdAndDelete(id)
      console.log(deleteMessage)
      if(deleteMessage !== null){
        handleSuccess(res,'刪除名稱成功')
      }else{
        handleError(res,'重複刪除')
      }
		}catch(err){
			handleError(res, err.message)
		}
	},
	deleteManyUser:async(req,res)=>{
		if(req.originalUrl === '/users'){
			await User.deleteMany({});
      handleSuccess(res,[]);
		}else{
			handleError(res,'沒有id')
		}
	},
	updataUser:async(req,res)=>{
		try{
			const id = req.params.id;
			const info = req.body;
			if( id && info.name && info.email){
				const data = await User.findByIdAndUpdate(id,{
					'name':info.name,
					'email':info.email,
          'photo':info.photo
				},{new:true, runValidators: true})
				handleSuccess(res, data)
			}else{
        handleError(res, '缺少資料')
      }
		}catch(err){
			handleError(res, err.message)
		}
	}
}
module.exports = usersContrllers