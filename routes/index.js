var express = require('express');
var router = express.Router();

const {Student} = require('../db/student');

const student = new Student;
//View route
router.get('/', (req,res)=>{
  res.render('index',{title:'Students API'})
})

//CRUD routes
// router.get("/get-all", async(req, res) => {
//   const result = await getAll();
//   res.send(result);
// })

router.get("/get-one/:student_id", async(req, res) => {
  const id = req.params.student_id;
  const result = await student.getOne(id);
  res.send(result);
})

router.get('/get-all', async (req, res) => {
  try{
    const students = await student.getAll();
    res.status(200).json(students);
  }catch(e){
    res.status(500).send(e);
  }
})
module.exports = router;
