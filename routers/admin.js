const router = require("express").Router();
const {
  getAccessToRoute,
  getAdminAcces,
} = require("../middleware/authorazition/auth");
const { blockUser, deleteUser } = require("../controller/admin");
const {
  checkUserExist,
} = require("../middleware/database/databaseErrorHelpers");

router.use([getAccessToRoute, getAdminAcces]);

router.get("/block/:id", checkUserExist, blockUser);
router.delete("/user/:id", checkUserExist, deleteUser);

module.exports = router;
