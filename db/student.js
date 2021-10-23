const db = require('../tools/postgres');

class Student{
    async getAll(){
        try{
            const students = await db.query('select * from student');
            return students.rows;
        }catch(e){
            throw e;
        }
    }
}

exports.Student = Student;