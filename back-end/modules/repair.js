const { DB } = require('../db');

async function get_repair(data) {
    const db = await DB;
    const sql = `SELECT * FROM repair JOIN assign_work ON repair.assign_id = assign_work.assign_id JOIN request ON request.request_id = assign_work.request_id JOIN equipment_type ON equipment_type.equipment_id = request.equipment_id WHERE assign_work.user_id = ${data.user_id} AND repair.status_id = 1 OR repair.status_id = 2 OR repair.status_id = 3 OR repair.status_id = 4 ORDER BY assign_work.repair_start DESC`;
    const result = await db.query(sql);
    return result;
}

async function repair(data) {
    console.log(data)
    const db = await DB;
    const sql = `SELECT * FROM repair WHERE repair.repair_id = ${data.repair_id}`;
    const result = await db.query(sql);
    return result;
}

async function view_repair() {
    const db = await DB;
    const sql = `SELECT *, CONVERT(repair_img USING utf8) as repair_imgs FROM repair JOIN status ON repair.status_id = status.status_id`;
    const result = await db.query(sql);
    return result;
}

async function update_repair(data) {
    // console.log(data)
    const db = await DB;
    const sql = `UPDATE repair SET
    assign_id  = '${data.assign_id}',
    repair_details  = '${data.repair_details}',
    repair_img = '${data.repair_img}',
    status_id  = '${data.status_id}' WHERE repair_id  = ${data.repair_id}`;
    const result = await db.query(sql);
    return result;
}

async function update_status_request(data) {
    console.log(data.request_id)
    const db = await DB;
    const sql = `UPDATE request SET status_id  = 3 WHERE request_id  = ${data.request_id}`;
    const result = await db.query(sql);
    return result;
}


async function addstatus(data) {
    const db = await DB;
    let sql = `INSERT INTO status (status_id, status_name) 
    values (default,'${data.status_name}')`;
    const result = (await db.query(sql));
    return result;
}

async function update_status(data) {
    const db = await DB;
    const sql = `UPDATE status SET status_name  = '${data.status_name}' WHERE status_id = ${data.status_id}`;
    const result = await db.query(sql);
    return result;
}

async function delete_status(status_id) {
    console.log(status_id)
    const db = await DB;
    let sql = `DELETE FROM status WHERE status_id =${status_id}`;
    const result = (await db.query(sql));
    return result;
}
module.exports = {
    get_repair,
    repair,
    update_repair,
    view_repair,
    addstatus,
    update_status,
    delete_status,
    update_status_request,
}