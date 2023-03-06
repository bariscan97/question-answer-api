const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const getSingleUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  res.status(200).json({
    succes: true,
    data: user,
  });
});
const getAllUsers = asyncHandler(async (req, res, next) => {
  return res.status(200).json(res.queryResults);
});
module.exports = {
  getSingleUser,
  getAllUsers,
};
