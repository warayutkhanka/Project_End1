const { DB } = require('../db');

async function report_request() {
    const db = await DB;
    const sql = `SELECT COUNT(status.status_id) as count,status.status_name FROM request JOIN status ON request.status_id = status.status_id GROUP BY status.status_id`;
    const result = await db.query(sql);
    let countData = []
    let statusName = []
    for(let i of result){
        countData.push(i.count)
        statusName.push(i.status_name)
    }
    return {msg:"success", count:countData, status_name:statusName};
}

async function report_repair() {
    const db = await DB;
    const sql = `SELECT COUNT(status.status_id) as count,status.status_name FROM repair JOIN status ON repair.status_id = status.status_id GROUP BY status.status_id`;
    const result = await db.query(sql);
    let countData = []
    let statusName = []
    for(let i of result){
        countData.push(i.count)
        statusName.push(i.status_name)
    }
    return {msg:"success", count:countData, status_name:statusName};
}

async function report_request_w_id(data) {
    const db = await DB;
    const sql = `SELECT COUNT(request_id) AS count, status_name FROM request INNER JOIN status ON request.status_id = status.status_id INNER JOIN user ON request.user_id = user.user_id WHERE user.user_id = ${data.user_id} GROUP BY request.status_id;`;
    const result = await db.query(sql);
    return result
}

async function report_request_equipment() {
    const db = await DB;
    const sql = `SELECT COUNT(request.request_id) as count,equipment_type.equipment_name FROM request INNER JOIN equipment_type ON request.equipment_id = equipment_type.equipment_id GROUP BY equipment_type.equipment_name ORDER BY COUNT(request.request_id) DESC`;
    const result = await db.query(sql);
    return result
}

async function report_last_request() {
    const db = await DB;
    const sql = `SELECT request.request_id, equipment_type.equipment_name, request.request_date, status.status_name FROM request INNER JOIN equipment_type ON request.equipment_id=equipment_type.equipment_id INNER JOIN status ON request.status_id = status.status_id WHERE request.status_id = 1 ORDER BY request.request_date DESC;`;
    const result = await db.query(sql);
    return result
}

module.exports = {
    report_request,
    report_repair,
    report_request_w_id,
    report_request_equipment,
    report_last_request
}