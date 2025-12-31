const { assignTask, employeeDetails, completedTask, createEmployee, empidCreation, dupilcateEntry, excelsheet, createUserTable, createTaskTable } = require("../models/sqlfile");
const bcrypt = require("bcrypt");

function taskAssign(req, res) {
    const task = req.body;
    console.log(task.title);
    assignTask(task, (err, result) => {
        if (err) {

            return res.status(500).send({ success: false, message: "Database error" });
        }
        console.log(result);
        if (err) {
            console.log(err);
        }
        if (result.affectedRows > 0) {
            console.log(result);
            return res.status(200).send({ success: true, datas: result });
        } else {
            return res.status(402).send({ success: false });
        }
    })
}

function empDetails(req, res) {
    const names = req.body;
    console.log(names);

    employeeDetails(names, (err, result) => {
        if (err) {

            return res.status(500).send({ success: false, message: "Database error" });
        }
        console.log(result);
        if (err) {
            console.log(err);
        }
        if (result.length > 0) {
            console.log(result);
            return res.status(200).send({ success: true, datas: result });
        } else {
            return res.status(402).send({ success: false });
        }
    })
}

function taskTable(req, res) {
    const names = req.body;
    console.log(names);

    completedTask(names, (err, result) => {
        if (err) {

            return res.status(500).send({ success: false, message: "Database error" });
        }
        console.log(result);
        if (err) {
            console.log(err);
        }
        if (result.length > 0) {
            console.log(result);
            return res.status(200).send({ success: true, datas: result });
        } else {
            return res.status(402).send({ success: false });
        }
    })
}

async function registerUser(req, res) {
    const names = req.body;
    console.log(names);
    const [rows] = await dupilcateEntry(names.email);
    console.log(rows);
    await createEmployee(names, (err, result) => {
        console.log(result)
        empidCreation(result);
        console.log("entering")
        if (err) {
            return res.status(500).send({ success: false, message: "Database error" });
        }
        console.log(result);
        if (result.affectedRows > 0) {
            console.log(result);
            return res.status(200).send({ success: true, datas: result });
        } else {
            return res.status(402).send({ success: false, datas: "Email Already Exists" });
        }
    })
}

function verifycred(req, res, next) {
    const head = req.headers.authorization;
    jwt.verify(head, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(503).send("Invalid Token");
        }
        user.req = user;
        console.log(user.req);
        next();
    })
}

function excelDetails(req, res) {
    const dept = req.body;
    console.log(dept);
    excelsheet(dept, (err, result) => {
        if (err) {
            return res.status(500).send({ success: false, message: "Database error" });
        }
        console.log(result);
        if (err) {
            console.log(err);
        }
        if (result.length > 0) {
            console.log(result);
            return res.status(200).send({ success: true, datas: result });
        } else {
            return res.status(402).send({ success: false });
        }
    })
}

function tableUserCreation(req, res) {
    try {
        createUserTable();
        return res.status(200).send({ success: true });
    }
    catch (err) {
        return res.status(402).send({ status: false });
    }
}

function tableTaskCreation(req, res) {
    try {
        createTaskTable();
        return res.status(200).send({ success: true });
    }
    catch (err) {
        return res.status(402).send({ status: false });
    }
}

module.exports = { taskAssign, empDetails, taskTable, registerUser, verifycred, excelDetails, tableUserCreation, tableTaskCreation };