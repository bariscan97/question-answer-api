const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../../models/User");
const Question = require("../../models/Question");
const Answer = require("../../models/Answer");
const CustomError = require("../../helpers/error/CustomError");
const {
  getAccessTokenFromHeader,
  isTokenIncluded,
} = require("../../helpers/auth/tokenHelper");
const getAccessToRoute = (req, res, next) => {
  if (!isTokenIncluded) {
    res.status(500).json({
      success: false,
      message: "Token is not found",
    });
  }
  const accessToken = getAccessTokenFromHeader(req);

  jwt.verify(accessToken, "secret", (err, decoded) => {
    if (err) {
      console.log(err);
    }
    req.user = {
      id: decoded.id,
      name: decoded.name,
    };
    console.log(decoded);
    next();
  });
};
const getAdminAcces = asyncHandler(async (req, res, next) => {
  const { id } = req.user;

  const user = await User.findById(id);

  if (user.role !== "admin") {
    res.status(403).json({
      success: false,
      message: "Only acces for admin",
    });
  }
  next();
});
const getQuestionOwnerAccess = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const questionId = req.params.id;

  const question = await Question.findById(questionId);

  if (question.user != userId) {
    return next(new CustomError("Only owner can handle this operation", 403));
  }
  next();
});

const getAnswerOwnerAccess = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const answerId = req.params.answer_id;

  const answer = await Answer.findById(answerId);

  if (answer.user != userId) {
    return next(new CustomError("Only owner can handle this operation", 403));
  }
  next();
});
module.exports = {
  getAccessToRoute,
  getAdminAcces,
  getQuestionOwnerAccess,
  getAnswerOwnerAccess,
};
