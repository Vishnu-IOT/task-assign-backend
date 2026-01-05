const { assignTask, employeeDetails, completedTask, createEmployee, empidCreation, dupilcateEntry, excelsheet, createUserTable, createTaskTable, employeeCount } = require("../models/sqlfile");
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
            return res.status(400).send({ success: false });
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
            return res.status(400).send({ success: false });
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
            return res.status(400).send({ success: false });
        }
    })
}

function registerUser(req, res) {
    const names = req.body;
    console.log(names);
    createEmployee(names, (err, result) => {
        console.log(result);
        console.log(err);
        console.log("entering");
        if (err) {
            return res.status(500).send({ success: false, message: "Database Error" });
        }
        console.log(result);
        empidCreation(result);
        if (result.affectedRows > 0) {
            console.log(result);
            return res.status(200).send({ success: true, datas: result });
        } else {
            return res.status(402).send({ success: false, datas: "Email or Phone Number Already Exists" });
        }
    })
}

function dupilcateUser(req, res) {
    const data = req.body;
    dupilcateEntry(data, (err, result) => {
        console.log(result);
        if (err) {
            return res.status(500).send({ success: false, message: "Database Error" });
        }
        if (result.length === 0) {
            return res.status(200).send({ success: true, datas: "No Data Found" });
        }
        else {
            return res.status(400).send({ success: false, datas: "Email or Phone Number Already Exists" });
        }
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
            return res.status(400).send({ success: false });
        }
    })
}

function tableUserCreation(req, res) {
    try {
        createUserTable();
        return res.status(200).send({ success: true });
    }
    catch (err) {
        return res.status(400).send({ status: false });
    }
}

function tableTaskCreation(req, res) {
    try {
        createTaskTable();
        return res.status(200).send({ success: true });
    }
    catch (err) {
        return res.status(400).send({ status: false });
    }
}

function count(req, res) {
    employeeCount((err, result) => {
        if (err) {
            return res.status(500).send({ success: false, message: "Database error" });
        }
        if (result.length > 0) {
            return res.status(200).send({ success: true, datas: result });
        } else {
            return res.status(402).send({ success: false });
        }
    });
}

module.exports = { taskAssign, empDetails, taskTable, registerUser, excelDetails, tableUserCreation, tableTaskCreation, count, dupilcateUser };








