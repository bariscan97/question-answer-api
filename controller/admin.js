const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  user.blocked = !user.blocked;

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Block-Unblock Successfull",
  });
});
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  await user.remove();

  res.status(200).json({
    success: true,
    message: "Delete Operation Successful",
  });
});

module.exports = {
  blockUser,
  deleteUser,
};
