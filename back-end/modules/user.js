const { DB } = require('../db');

async function getUser(username) {
    const db = await DB;
    let sql = `SELECT * FROM user WHERE username = '${username}'`;
    const result = await db.query(sql);
    return result[0];
}

async function getUsers() {
    const db = await DB;
    let sql = `SELECT * FROM user ORDER BY user_id ASC`;
    const result = await db.query(sql);
    return result;
}



async function getRegister(data) {
    console.log(data);
    const db = await DB;
    let sql = `INSERT INTO user (user_id, username, password, title_name, f_name, s_name, email, tel, sex, user_typeid) 
    values (default,'${data.username}','${data.password}','${data.titlename}','${data.fname}','${data.sname}','${data.email}','${data.tel}','${data.sex}',1)`;
    const result = (await db.query(sql));
    return result;
}

async function updateuser(data) {
    console.log(data)
    const db = await DB;
    const sql = `UPDATE user SET
        title_name = '${data.title_name}',
        f_name = '${data.f_name}',
        s_name = '${data.s_name}',
        sex = '${data.sex}',
        email = '${data.email}',
        tel = '${data.tel}',
        user_typeid = '${data.user_typeid}' WHERE user_id = ${data.user_id}`;
    const result = await db.query(sql);
    return result;
}

async function changepassword(data) {
    console.log(data)
    const db = await DB;
    const sql = `UPDATE user SET password = '${data.password}' WHERE user_id = ${data.user_id}`;
    const result = await db.query(sql);
    return result;
}

async function deleteuser(user_id) {
    const db = await DB;
    let sql = `DELETE FROM user WHERE user_id=${user_id}`;
    const result = (await db.query(sql));
    return result;
}
// =============usertype============
async function getUsertype() {
    const db = await DB;
    let sql = `SELECT * FROM user_type`;
    const result = await db.query(sql);
    return result;
}

async function addusertype(data) {
    const db = await DB;
    let sql = `INSERT INTO user_type (user_typeid, user_typename) values (default,'${data.user_typename}')`;
    const result = (await db.query(sql));
    return result;
}

async function update_usertype(data) {
    console.log('data',data)
    const db = await DB;
    const sql = `UPDATE user_type SET user_typename = '${data.user_typename}' WHERE user_typeid = ${data.user_typeid}`;
    const result = await db.query(sql);
    return result;
}

async function deleteusertype(user_typeid) {
    console.log(user_typeid)
    const db = await DB;
    let sql = `DELETE FROM user_type WHERE user_typeid=${user_typeid}`;
    const result = (await db.query(sql));
    return result;
}

async function getusertype() {
    const db = await DB;
    let sql = `SELECT * FROM user INNER JOIN user_type ON user.user_typeid !=1 AND user.user_typeid !=2 WHERE user.user_typeid = user_type.user_typeid;`;
    const result = await db.query(sql);
    return result;
}

async function check_password(data) {
    console.log('user==>',data)
    const db = await DB;
    let sql = `SELECT * FROM user WHERE user.user_id = ${data.user_id}`;
    const result = await db.query(sql);
    console.log(result)
    return result;
}


module.exports = {
    getUser,
    getUsers,
    getRegister,
    deleteuser,
    updateuser,
    getUsertype,
    addusertype,
    update_usertype,
    deleteusertype,
    changepassword,
    getusertype,
    check_password,
}