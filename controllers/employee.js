const { checkUser, getTask, updateTask } = require("../models/sqlfile");
const bcrypt = require("bcrypt");

async function loginUser(req, res) {

    const datalog = req.body;
    // const salt = 10;
    // const pass = await bcrypt.hash(datalog.password, salt);
    // console.log(pass);
    console.log(datalog);
    checkUser(datalog, (err, result) => {
        if (err) {
            return res.status(500).send({ success: false, message: "Database error" });
        }
        console.log(result);
        // bcrypt.compare(datalog.password, result[0].password, (err, data) => {
            // console.log(data);
            if (err) {
                console.log(err);
            }
            if (result.length > 0) {
                console.log(result);
                return res.status(200).send({ success: true, datas: result });
            } else {
                return res.status(402).send({ success: false });
            }
        // })
    });
}

function taskView(req, res) {
    const datas = req.body;
    console.log(req.body.due_date);
    getTask(datas, (err, result) => {
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

function taskUpdate(req, res) {
    const datas = req.body;
    updateTask(datas, (err, result) => {
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

module.exports = { loginUser, taskView, taskUpdate };