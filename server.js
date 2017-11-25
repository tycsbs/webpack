var path = require('path');
var express = require('express');
var app = express();
//var router = express.Router();


var port = process.env.port || 3000;

app.get('/',function(req,res,next){
    req.url = 'index.html';
    next()
})
//app.use(router);
app.use(express.static(path.join(__dirname,'dist')));
app.listen(port,function(){
    console.log(`server is running at ${port}`)
});