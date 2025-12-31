import { User } from "../models/mongofile.js";

async function registerUserMDB(req, res) {
    console.log(req.body);
    const { uid, emp_id, name, email, department, phone_number } = req.body;
    try {
        console.log("entered")
        await User.create({
            // uid: uid,
            // emp_id: emp_id,
            // name: name,
            // email: email,
            // department: department,
            // phone_number: phone_number
            uid,
            emp_id,
            name,
            email,
            department,
            phone_number
            // uid: "vjfdkvdlvkdlfbfgvkmdvldk",
            // emp_id: "EMP003",
            // name: "MusicaR",
            // email: "musicar@gmail.com",
            // department: "UI/UX Designer",
            // phone_number: "1234554321"
        })
        return res.status(200).send({ success: true, datas: "User Info Stored Successfully" })
    }
    catch (err) {
        console.log("error")
        return res.status(402).send({ success: "Not User Stored" })
    }
}

async function findUserMDB(req, res) {
    console.log(req.body);
    const { uid, emp_id, name, email, department, phone_number } = req.body;
    try {
        console.log("entered")
        const data = await User.find({
            email
        })
        console.log(data);
        return res.status(200).send({ success: true, datas: data })
    }
    catch (err) {
        console.log(err)
        return res.status(402).send({ success: "Not User Stored" })
    }
}

export { registerUserMDB, findUserMDB };