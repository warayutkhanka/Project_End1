const { DB } = require('../db');

async function getequipment() {
    const db = await DB;
    let sql = `SELECT * FROM equipment_type`;
    const result = (await db.query(sql));
    return result;
}

async function addequipment(data) {
    const db = await DB;
    let sql = `INSERT INTO equipment_type (equipment_id, equipment_name) values (default,'${data.equipment_name}')`;
    const result = (await db.query(sql));
    return result;
}

async function update_equipment(data) {
    console.log('data',data)
    const db = await DB;
    const sql = `UPDATE equipment_type SET equipment_name = '${data.equipment_name}' WHERE equipment_id = ${data.equipment_id}`;
    const result = await db.query(sql);
    return result;
}

async function delete_equipment(equipment_id) {
    console.log(equipment_id)
    const db = await DB;
    let sql = `DELETE FROM equipment_type WHERE equipment_id=${equipment_id}`;
    const result = (await db.query(sql));
    return result;
}

module.exports = {
    getequipment,
    addequipment,
    update_equipment,
    delete_equipment,
}