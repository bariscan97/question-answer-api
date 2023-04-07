const router = require("express").Router();
const User = require("../models/User");
const { getSingleUser, getAllUsers } = require("../controller/user");
const {
  checkUserExist,
} = require("../middleware/database/databaseErrorHelpers");
const userQueryMiddleware = require("../middleware/query/userQueryMiddleware");

router.get("/", userQueryMiddleware(User), getAllUsers);
router.get("/:id", checkUserExist, getSingleUser);

module.exports = router;
