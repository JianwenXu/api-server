var express = require('express');
var Mock = require('mockjs')

var app = express();

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
  const params = req.params;
  const body = req.body;
  const query = req.query;
  console.log('测试 body', body);
  res.status(200),
  res.json({ data: {
    params,
    query,
    body
  }});
});

var server = app.listen(3010, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
