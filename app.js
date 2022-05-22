const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const userRouter = require('./routes/user');
const postsRouter = require('./routes/posts');
require('./connection')
const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', userRouter);
app.use('/posts', postsRouter);
app.use((req,res,next)=>{
  res.status(404).json({
    status:false,
    message:'錯誤路徑'
  })
  next()
})
app.use((err,req,res,next)=>{
  res.status(500).json({
    status:false,
    message:'頁面錯誤'
  })
})
module.exports = app;
