var express = require('express');
var router = express.Router();

const {getAll} = require('../db/get-all');

//View route
router.get('/', (req,res)=>{
  res.render('index',{title:'Students API'})
})

//CRUD routes
router.get("/get-all", async(req, res) => {
  const result = await getAll();
  res.send(result);
})


module.exports = router;
