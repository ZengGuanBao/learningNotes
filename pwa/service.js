let express = require('express');
let app = express();
app.use(express.static(__dirname))
let json = require('./data.json');
app.get('/api/img',(req,res)=>{
  let start = Math.round(Math.random()*(json.length-20))
  res.json(json.slice(start,start+20))
})
app.listen(3000);