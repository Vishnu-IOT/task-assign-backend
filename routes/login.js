const express = require("express");
const { loginUser, taskView, taskUpdate } = require("../controllers/employee");
const { taskAssign, empDetails, taskTable, registerUser, excelDetails, tableUserCreation, tableTaskCreation } = require("../controllers/admin");
const { verifyFirebaseToken } = require("../helpers/middleware");
const { crt } = require("../models/sqlfile");
const { findUserMDB, registerUserMDB } = require("../controllers/mdbadmin");
const router = express.Router();

router.post("/register", verifyFirebaseToken, registerUserMDB)
router.post("/login", verifyFirebaseToken, loginUser)
router.post("/task", taskAssign)
router.post("/emp", taskView)
router.post("/status", taskUpdate)
router.post("/details", empDetails)
router.post("/assigntask", taskTable)
router.post("/excel", excelDetails)

router.post("/mdbregister", registerUserMDB)
router.post("/mdbfind", findUserMDB)

router.get("/userscreate",tableUserCreation);
router.get("/taskscreate",tableTaskCreation);

router.post("/usersfire", async (req, res) => {
    const { uid, email, emailVerified } = req.body;

    await crt.promise().query(
        `INSERT INTO usersfirebase (firebase_uid, email, email_verified)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE email_verified = ?`,
        [uid, email, emailVerified, emailVerified]
    );

    res.status(200).send("User stored successfully");
});



module.exports = router;