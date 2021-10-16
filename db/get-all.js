const db = require('../tools/postgres');

exports.getAll = async () => {
    try {
        const table = await db.query("select * from student");
        return table.rows;
    }catch(e){
        return [];
    }
}