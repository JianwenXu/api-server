var express = require('express');
var Mock = require('mockjs');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

//设置跨域
app.all('*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
   res.header("X-Powered-By",' 3.2.1');
   res.header("Content-Type", "application/json;charset=utf-8");
   next();
});

var data = Mock.mock({
    'list|1-10': [{ 'id|+1': 1 }]
});

app.get('/mocktest',function(req,res){
    res.status(200),
    res.json(data)
});

app.get('/test',function(req,res) {
    res.status(200),
    res.json({ str: 'test api string' });
});

// 请求测试
app.get('/test1/:id?', function(req, res) {
  const params = req.params;
  const query = req.query;
  res.status(200),
  res.json({ data: {
    params,
    query
  }});
});

app.post('/test2', function(req, res) {
  let str = "";
  req.on("data",function (chunk) {
    str += chunk;
  });
  req.on("end",function () {
    console.log('test222222', str);
    res.json({
      time: new Date()
    });
  });
});

app.post('/test3', function(req, res) {
  let str = "";
  req.on("data",function (chunk) {
    str += chunk;
  });
  req.on("end",function () {
    console.log('test3333', str);
    res.json({
      time: new Date()
    });
  });
});

var server = app.listen(3010, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
