var express = require('express');
var router = express.Router();

const {getAll} = require('../db/get-all');

const {Student} = require('../db/student');

const student = new Student;

router.get('/get-all', async (req, res) => {
  try{
    const students = await student.getAll();
    res.status(200).json(students);
  }catch(e){
    res.status(500).send(e);
  }
})
module.exports = router;
