const db = require('../tools/postgres');

exports.addStudent = async (obj) => {
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