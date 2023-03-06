const router = require("express").Router();
const question = require("./question");
const auth = require("./auth");
const user = require("./user");
const admin = require("./admin");

router.use("/questions", question);
router.use("/auth", auth);
router.use("/users", user);
router.use("/admin", admin);

module.exports = router;
