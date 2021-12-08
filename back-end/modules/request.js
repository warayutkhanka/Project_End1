const { DB } = require('../db');

async function request(data) {
    // console.log(data);
    const db = await DB;
    let sql = `INSERT INTO request (request_id, user_id, fullname, equipment_id, request_address, request_details, request_image, request_date, status_id) 
    values (default,'${data.user_id}','${data.fullname}','${data.equipment_id}','${data.request_address}','${data.request_details}','${data.img}',now(),1)`;
    const result = (await db.query(sql));
    return result;
}

async function equipment() {
    const db = await DB;
    let sql = `SELECT * FROM equipment_type`
    const result = (await db.query(sql));
    console.log(result);
    return result;
}

async function showrequest() {
    const db = await DB;
    let sql = `SELECT *, CONVERT(request_image USING utf8) as request_images FROM request JOIN status ON request.status_id = status.status_id JOIN equipment_type ON equipment_type.equipment_id = request.equipment_id WHERE request.status_id = 1 ORDER BY request_date DESC`
    const result = (await db.query(sql));
    return result;
}

async function shows_request() {
    const db = await DB;
    let sql = `SELECT *, CONVERT(request_image USING utf8) as request_images FROM request JOIN status ON request.status_id = status.status_id JOIN equipment_type ON equipment_type.equipment_id = request.equipment_id;`
    const result = (await db.query(sql));
    return result;
}

async function updaterequest(data) {
    const db = await DB;
    const sql = `UPDATE request SET
        fullname  = '${data.fullname}',
        equipment_id  = '${data.equipment_id}',
        request_address = '${data.request_address}',
        request_details = '${data.request_details}',
        status_id  = '${data.status_id}',
        request_date  = '${data.request_date}' WHERE request_id = ${data.request_id}`;
    const result = await db.query(sql);
    return result;
}

async function updaterequest_status(data) {
    const db = await DB;
    const sql = `UPDATE request SET status_id  = '${data.status_id}' WHERE request_id = ${data.request_id}`;
    const result = await db.query(sql);
    return result;
}

async function delete_request(request_id) {
    console.log(request_id)
    const db = await DB;
    let sql = `DELETE FROM request WHERE request_id=${request_id}`;
    const result = (await db.query(sql));
    return result;
}

async function status() {
    const db = await DB;
    let sql = `SELECT * FROM status`
    const result = (await db.query(sql));
    return result;
}

module.exports = {
    request,
    equipment,
    showrequest,
    status,
    updaterequest,
    delete_request,
    updaterequest_status,
    shows_request,
    
}