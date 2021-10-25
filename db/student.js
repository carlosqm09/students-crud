const db = require('../tools/postgres');
const axios = require('axios');

class Student {
    async getAll() {
        try {
            const students = await db.query('select * from student');
            return students.rows;
        } catch (e) {
            throw e;
        }
    }

    async getOne(id) {
        try {
            const qry = await db.query(`SELECT * FROM student WHERE student_id ='${id}'`);

            const maps = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
                params: {
                    key: process.env.API_KEY,
                    address: `${qry.rows[0].adress.replace(/ /g, '+')}+${qry.rows[0].nbhd.replace(/ /g, '+')}+${qry.rows[0].state}`
                }
            });
            qry.rows[0].lat = maps.data.results[0].geometry.location.lat;
            qry.rows[0].long = maps.data.results[0].geometry.location.lng;

            return qry.rows;

        } catch (error) {
            console.log(error)
        }
    }

    async addStudent(obj){
        try {
            await db.query(`
            INSERT INTO student
            VALUES(
                (SELECT CONCAT(
                    CONCAT((SELECT SUBSTRING((SELECT EXTRACT(YEAR FROM NOW()))::TEXT, 3)), 
                           (SELECT (SELECT EXTRACT(MONTH FROM NOW()))::TEXT)), 
                    (SELECT REPEAT('0', 4 - (LENGTH((SELECT COUNT(*) + 1 FROM student)::TEXT)::INTEGER))), 
                    (SELECT COUNT(*) + 1 FROM student))),
                '${obj.name}',
                ${obj.grade},
                '${obj.group}',
                '${obj.email}',
                '${obj.adress}',
                '${obj.nbhd}',
                '${obj.state}'
                    );
            `);
    
            const id = await db.query('SELECT student_id from student ORDER BY student_id desc limit 1');
            return id.rows[0].student_id;
        }catch(e){
            return e;
        }
    }


    async updateStudent(id,obj){
        try {
            await db.query(`
                        UPDATE student 
            SET "name" = '${obj.name}',
                "grade" = ${obj.grade},
                "group" = '${obj.group}',
                "email"='${obj.email}',
                "adress"='${obj.adress}',
                "nbhd"='${obj.nbhd}',
                "state"='${obj.state}'
            where student_id='${id}';
                
            `);
    
            return 'Updated succesfuly';
        }catch(e){
            return e;
        }
    }


    async deleteStudent(id){
        try {
            await db.query(`DELETE FROM student where student_id='${id}';`);
    
            return id;
        }catch(e){
            return e;
        }
    }

}

exports.Student = Student;