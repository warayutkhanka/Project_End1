//=========== Load package
const express = require('express');
const config = require('./config').config;
const bodyParser = require('body-parser');

//=========== Load modules
const md_user = require('./modules/user');
const md_request = require('./modules/request');
const md_equipment = require('./modules/equipment');
const md_assign = require('./modules/assign');
const md_repair = require('./modules/repair');
const md_report = require('./modules/report');


const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
//================== api user ================================
app.post('/api/login', async (req, res) => {
    try {
        var body = req.body;
        if (!body.username) { res.status(500).send('username not found.'); return; }
        if (!body.password) { res.status(500).send('password not found.'); return; }
        var user = await md_user.getUser(body.username);
        if (!user) { res.status(500).send('username invalid.'); return; }
        if (user.password != body.password) { res.status(500).send('password invalid.'); return; }
        console.log(user);
        res.send(user);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.post('/api/register', async (req, res) => {
    try {
        var body = req.body;
        if (!body.username) { res.status(500).send('username not found.'); return; }
        if (!body.password) { res.status(500).send('password not found.'); return; }
        if (!body.titlename) { res.status(500).send('titlename not found.'); return; }
        if (!body.fname) { res.status(500).send('firstname not found.'); return; }
        if (!body.sname) { res.status(500).send('surname not found.'); return; }
        if (!body.email) { res.status(500).send('email not found.'); return; }
        if (!body.tel) { res.status(500).send('phone number not found.'); return; }
        if (!body.sex) { res.status(500).send('sex not found.'); return; }
        var user = await md_user.getRegister(body);
        if (!user) { res.status(500).send('username invalid.'); return; }
        // console.log(user);
        res.send(user);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.get('/api/getuser', async (req, res) => {
    try {
        if (!req.query.username) { res.status(500).send('username not found.'); return; }
        var user = await md_user.getUser(req.query.username);
        res.send(user);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.get('/api/getusers', async (req, res) => {
    try {
        var users = await md_user.getUsers();
        res.send(users);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.post('/api/request', async (req, res) => {
    try {
        var body = req.body;
        if (!body.fullname) { res.status(500).send('name not found.'); return; }
        if (!body.equipment_id) { res.status(500).send('equipment_id not found.'); return; }
        if (!body.request_address) { res.status(500).send('request_address not found.'); return; }
        if (!body.request_details) { res.status(500).send('request_details not found.'); return; }
        if (!body.img) { res.status(500).send('request_image not found.'); return; }
        var request = await md_request.request(body);
        if (!request) { res.status(500).send('username invalid.'); return; }
        res.send(request);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.get('/api/getuser', async (req, res) => {
    try {
        if (!req.query.username) { res.status(500).send('username not found.'); return; }
        var user = await md_user.getUser(req.query.username);
        res.send(user);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.get('/api/equipment', async (req, res) => {
    try {
        var equipment = await md_request.equipment();
        res.send(equipment);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.get('/api/usertype', async (req, res) => {
    try {
        var usertype = await md_user.getUsertype();
        res.send(usertype);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.put('/api/updateuser', async (req, res) => {
    try {
        let updateuser = await md_user.updateuser(req.body);
        res.send(updateuser);
    } catch (err) {
        res.status(500).send(err.toString());
    }

});

app.put('/api/update_request', async (req, res) => {
    try {
        let update_req = await md_request.updaterequest(req.body);
        res.send(update_req);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.delete('/api/deleteuser', async (req, res) => {
    console.log(req.body.user_id)
    let deleteUser = await md_user.deleteuser(req.body.user_id);
    res.send(deleteUser);
});

//================== api usertype ================================
app.post('/api/addusertype', async (req, res) => {
    try {
        var body = req.body;
        if (!body.user_typename) { res.status(500).send('user_typename not found.'); return; }
        var usertype = await md_user.addusertype(body);
        if (!usertype) { res.status(500).send('user_typename invalid.'); return; }
        console.log(usertype);
        res.send(usertype);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.put('/api/updateusertype', async (req, res) => {
    let updateuser = await md_user.update_usertype(req.body);
    res.send(updateuser);
});

app.delete('/api/deleteusertype', async (req, res) => {
    console.log(req.body.user_typeid)
    let deleteUsertype = await md_user.deleteusertype(req.body.user_typeid);
    res.send(deleteUsertype);
});

//=================== equipment =======================
app.get('/api/getequipment', async (req, res) => {
    var equipment = await md_equipment.getequipment();
    res.send(equipment);
});

app.post('/api/addequipment', async (req, res) => {
    console.log(req.body)
    try {
        var body = req.body;
        if (!body.equipment_name) { res.status(500).send('equipment name not found.'); return; }
        var equipment_name = await md_equipment.addequipment(body);
        if (!equipment_name) { res.status(500).send('equipment_name invalid.'); return; }
        console.log(equipment_name);
        res.send(equipment_name);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.put('/api/update_equipment', async (req, res) => {
    let equipment = await md_equipment.update_equipment(req.body);
    res.send(equipment);
});

app.delete('/api/delete_equipment', async (req, res) => {
    console.log(req.body.equipment_id)
    let del_equipment = await md_equipment.delete_equipment(req.body.equipment_id);
    res.send(del_equipment);
});

//============= request ====================
app.get('/api/showrequest', async (req, res) => {
    try {
        var showrequest = await md_request.showrequest();
        res.send(showrequest);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.get('/api/status', async (req, res) => {
    try {
        var status = await md_request.status();
        res.send(status);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.delete('/api/delete_request', async (req, res) => {
    console.log(req.body.request_id)
    let del_request = await md_request.delete_request(req.body.request_id);
    res.send(del_request);
});

app.put('/api/changepassword', async (req, res) => {
    try {
        let chpassword = await md_user.changepassword(req.body);
        res.send(chpassword);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.get('/api/getusertype1', async (req, res) => {
    var user = await md_user.getusertype();
    res.send(user);
});

app.post('/api/assignwork', async (req, res) => {
    try {
        var body = req.body;
        if (!body.request_id) { res.status(500).send('request_id not found.'); return; }
        if (!body.user_id) { res.status(500).send('user_id not found.'); return; }
        var assign = await md_assign.assign_work(body);
        console.log(assign);
        res.send(assign);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.post('/api/get_assign', async (req, res) => {
    try {
        var body = req.body;
        var getassign = await md_assign.get_assign(body);
        res.send(getassign);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.post('/api/get_assign_requesr', async (req, res) => {
    try {
        var body = req.body;
        var getassign_req = await md_assign.get_assign_request(body);
        res.send(getassign_req);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.post('/api/repair_start', async (req, res) => {
    try {
        var body = req.body;
        var repair = await md_assign.repair_start(body);
        res.send(repair);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.put('/api/update_assign', async (req, res) => {
    try {
        let update_assign = await md_assign.update_assign_start(req.body);
        res.send(update_assign);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.post('/api/get_repair', async (req, res) => {
    try {
        var body = req.body;
        var repair = await md_repair.get_repair(body);
        res.send(repair);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.post('/api/repair', async (req, res) => {
    try {
        var body = req.body;
        var repair = await md_repair.repair(body);
        res.send(repair);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.put('/api/update_repair', async (req, res) => {
    try {
        let update_repair = await md_repair.update_repair(req.body);
        res.send(update_repair);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.put('/api/update_repair_status', async (req, res) => {
    try {
        let update_repair_status = await md_request.updaterequest_status(req.body);
        res.send(update_repair_status);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.get('/api/viewassign', async (req, res) => {
    try {
        var views_assign = await md_assign.views_assign();
        res.send(views_assign);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.get('/api/viewrepair', async (req, res) => {
    try {
        var views_repair = await md_repair.view_repair();
        res.send(views_repair);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.get('/api/report_request', async (req, res) => {
    try {
        var report_request = await md_report.report_request();
        res.send(report_request);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.get('/api/report_repair', async (req, res) => {
    try {
        var report_repair = await md_report.report_repair();
        res.send(report_repair);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.post('/api/add_status', async (req, res) => {
    try {
        var body = req.body;
        var addstatus = await md_repair.addstatus(body);
        res.send(addstatus);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.put('/api/update_status', async (req, res) => {
    try {
        let update_status = await md_repair.update_status(req.body);
        res.send(update_status);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.delete('/api/delete_status', async (req, res) => {
    console.log(req.body.status_id)
    let del_status = await md_repair.delete_status(req.body.status_id);
    res.send(del_status);
});

app.put('/api/update_status_request', async (req, res) => {
    try {
        let update_status_request = await md_repair.update_status_request(req.body);
        res.send(update_status_request);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.get('/api/get_request', async (req, res) => {
    try {
        var status = await md_request.shows_request();
        res.send(status);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.post('/api/report_user_request', async (req, res) => {
    try {
        var body = req.body;
        var report_user_request = await md_report.report_request_w_id(body);
        res.send(report_user_request);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.get('/api/get_request_equipment', async (req, res) => {
    try {
        var equipment = await md_report.report_request_equipment();
        res.send(equipment);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.get('/api/report_last_request', async (req, res) => {
    try {
        var last_request = await md_report.report_last_request();
        res.send(last_request);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});


app.listen(config.port, () => {
    console.log(`Server starting with port ${config.port}`);
});

