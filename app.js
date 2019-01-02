var createError = require('http-errors');
var express = require('express');//引入express模块
var path = require('path');
var settings = require('./settings');//就是settings文件夹里的内容
var session = require('express-session');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var logger = require('morgan');//

// var indexRouter = require('./routes/other');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var testRouter = require('./routes/test');
var pageRouter = require('./routes/page');
var detailRouter = require('./routes/prodetail');
var cartRouter = require('./routes/shoppingCart');
var classifyRouter = require('./routes/classify');
var orderRouter = require('./routes/order');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//托管静态文件，处理静态文件，可以通过端口访问这个public静态文件

//session和flash配置
app.use(session({
    secret: settings.cookieSecret,
    // 加密
    key: settings.db, //cookie nam
    cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized: true
}));
app.use(flash());
app.use(function (req, res, next) {
    res.locals.errors = req.flash('error');
    res.locals.infos = req.flash('info');
    next();
});

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login',loginRouter);
app.use('/register',registerRouter);
app.use('/test',testRouter);
app.use('/page',pageRouter);
app.use('/proDetail',detailRouter);
app.use('/shoppingCart',cartRouter);
app.use('/classify',classifyRouter);
app.use('/order',orderRouter);
//创建一个路由

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
