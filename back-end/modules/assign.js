const { DB } = require('../db');

async function assign_work(data) {
    console.log(data);
    const db = await DB;
    let sql = `INSERT INTO assign_work(assign_id, request_id, user_id, assign_date, repair_start) 
    values (default,'${data.request_id}','${data.user_id}',now(),0)`;
    const result = (await db.query(sql));
    return result;
}



async function get_assign(data) {
    const db = await DB;
    let sql = `SELECT * FROM assign_work JOIN user ON assign_work.user_id = user.user_id WHERE user.user_id = ${data.user_id} AND assign_work.assign_status=0 ORDER BY assign_work.assign_date DESC`;
    const result = (await db.query(sql));
    return result;
}

async function get_assign_request(data) {
    const db = await DB;
    let sql = `SELECT *,CONVERT(request_image USING utf8) as request_images FROM request JOIN assign_work ON request.request_id = assign_work.request_id WHERE assign_work.assign_id = ${data.assign_id}`;
    const result = (await db.query(sql));
    return result;
}

async function update_assign_start(data) {
    console.log(data)
    const db = await DB;
    const sql = `UPDATE assign_work SET repair_start = now(), assign_status='${data.assign_status}' WHERE assign_id = ${data.assign_id}`;
    const result = await db.query(sql);
    return result;
}

async function repair_start(data) {
    console.log(data)
    const db = await DB;
    const sql = `INSERT INTO repair(repair_id,assign_id,status_id) values (default,${data.assign_id},3)`;
    const result = await db.query(sql);
    return result;
}

async function views_assign() {
    const db = await DB;
    let sql = `SELECT * FROM assign_work JOIN user ON assign_work.user_id = user.user_id`;
    const result = (await db.query(sql));
    return result;
}



module.exports = {
    assign_work,
    get_assign,
    get_assign_request,
    update_assign_start,
    repair_start,
    views_assign,
}