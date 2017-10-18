var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');


/*===== global var ===== */

global.U = require("./utils")
global.C = require("./config")

global.debug = require('debug')('debug')

/*===== 加载models,打开数据库 ===== */
global.M = {}
require('./models/except')


var index = require('./routes/index');
var users = require('./routes/users');

var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//头像地址
app.use('/avatar',express.static(C.avatar_path));



// 处理跨域
app.all('*', corsConfig)
function corsConfig (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Headers', 'token,Content-Type,Content-Length,Authorization, Access,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,PATCH,OPTIONS')
  if (res.method === 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
}


app.use('/', index);
app.use('/user', users);
app.use('/contest', require("./routes/contest.js"));
app.use('/problem', require("./routes/problem.js"));
app.use('/sub', require("./routes/submission.js"));
app.use('/judge',require('./routes/judge.js'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log(err)
  res.status(500);
  res.json(err);
});

module.exports = app;
