const db = require('../tools/postgres');
const axios = require('axios');


exports.getOne= async(id) =>{
    try {
        const qry = await db.query(`SELECT * FROM student WHERE student_id ='${id}'`);

        const maps = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
            params: {
                key: process.env.API_KEY,
                address: `${qry.rows[0].adress.replace(/ /g,'+')}+${qry.rows[0].nbhd.replace(/ /g,'+')}+${qry.rows[0].state}`
            }
        });
        console.log(maps.data)
        qry.rows[0].lat=maps.data.results[0].geometry.location.lat;
        qry.rows[0].long=maps.data.results[0].geometry.location.lng;
        console.log(qry.rows)

        return qry.rows;

    } catch (error) {
        console.log(error)
    }
}