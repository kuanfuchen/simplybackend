const  handleError = (res,message)=>{
    res.status(400).send({
        status:'error',
        message
    })
}
module.exports = handleError;