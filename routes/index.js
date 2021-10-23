var express = require('express');
var router = express.Router();

const {getAll} = require('../db/get-all');
const {getOne} = require('../db/get-one');

//View route
router.get('/', (req,res)=>{
  res.render('index',{title:'Students API'})
})

//CRUD routes
router.get("/get-all", async(req, res) => {
  const result = await getAll();
  res.send(result);
})

router.get("/get-one/:student_id", async(req, res) => {
  const id = req.params.student_id;
  const result = await getOne(id);
  res.send(result);
})

module.exports = router;
