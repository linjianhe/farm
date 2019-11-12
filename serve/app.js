const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const session = require('express-session')

//引入中间件
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const goodsRouter = require('./routes/goods')
const homeRouter = require('./routes/home')
const orderRouter = require('./routes/order')

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //为程序托管位于程序目录下的public目录下的静态资源
// 前端跨域设置
// app.use(cors({
//   origin:['http://localhost:8080'],
//   methods:['GET','POST'],
//   alloweHeaders:['Content-Type', 'Authorization']
// }))

//session设置
app.use(session({
    secret: '123456',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 30
    },
    rolling:true
  })
)

//使用中间件和路由匹配
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/goods',goodsRouter);
app.use('/home', homeRouter)
app.use('/order', orderRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
