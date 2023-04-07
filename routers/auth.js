const router = require("express").Router();
const {
  register,
  getUser,
  login,
  logout,
  imageUpload,
  forgotPassword,
  resetPassword,
  editDetails,
} = require("../controller/auth");
const { getAccessToRoute } = require("../middleware/authorazition/auth");
const profileImageUpload = require("../middleware/libraries/profileImageUploads");
router.post("/register", register);
router.post("/login", login);
router.get("/", getAccessToRoute, getUser);
router.get("/logout", getAccessToRoute, logout);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword", resetPassword);
router.put("/edit", getAccessToRoute, editDetails);
router.post(
  "/uploads",
  [getAccessToRoute, profileImageUpload.single("profile_image")],
  imageUpload
);

module.exports = router;
