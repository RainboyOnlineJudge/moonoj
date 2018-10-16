var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs')
var compression = require('compression');


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

//favicon
app.use(favicon(__dirname + '/public/favicon.ico'))

//开启gzip
app.use(compression())


var io = require('socket.io')
var server = require('http').createServer(app);
var io = require('socket.io')(server);



//　跨域
if (process.env.DEBUG){
  debug("开启跨域")
  var cors = require("cors")
  app.use(cors())
}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* FrontEnd地址 */
app.use(express.static(C.FrontEnd_path));

//头像地址
app.use('/avatar',express.static(C.avatar_path));

var help = fs.readFileSync('./help.md',{encoding:'utf-8'})

app.use('/', index);
app.use('/user', users);
app.use('/contest', require("./routes/contest.js"));
app.use('/problem', require("./routes/problem.js"));
app.use('/sub', require("./routes/submission.js"));
app.get("/help",function(req,res,next){
    res.json({
      help:help
    })
})

app.use('/judge',require('./routes/judge.js'));

//处理 judge的 socket.io
const io_judge = io.of('/judge')
// judgeServer 是否连接成功
global.judgeServer_is_contented = false
global.NSP = io_judge

require('./judge/index2.js')(io_judge)

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

//module.exports = app;

server.listen(3000,function(){
  console.log('listen at port: 3000')
});
