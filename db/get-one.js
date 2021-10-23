const db = require('../tools/postgres');

exports.getOne= async(id) =>{
    try {
        const qry = await db.query(`SELECT * FROM student WHERE student_id ='${id}'`);
        return qry.rows;

    } catch (error) {
        return[]
    }
}