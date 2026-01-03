const express = require("express");
const { loginUser, taskView, taskUpdate } = require("../controllers/employee");
const { taskAssign, empDetails, taskTable, registerUser, excelDetails, tableUserCreation, tableTaskCreation, count } = require("../controllers/admin");
const { verifyFirebaseToken } = require("../helpers/middleware");
const { crt } = require("../models/sqlfile");
const router = express.Router();

router.post("/register", verifyFirebaseToken, registerUser)
router.post("/login", verifyFirebaseToken, loginUser)
router.post("/task", taskAssign)
router.post("/emp", taskView)
router.post("/status", taskUpdate)
router.post("/details", empDetails)
router.post("/assigntask", taskTable)
router.post("/excel", excelDetails)

router.get("/userscreate",tableUserCreation);
router.get("/taskscreate",tableTaskCreation);
router.get("/counts",count);


module.exports = router;

