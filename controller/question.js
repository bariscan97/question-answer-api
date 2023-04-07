const asyncHandler = require("express-async-handler");
const Question = require("../models/Question");
const CustomError = require("../helpers/error/CustomError");

const getAllQuestions = asyncHandler(async (req, res) => {
  return res.status(200).json(res.queryResults);
});
const getSingleQuestion = asyncHandler(async (req, res) => {
  return res.status(200).json(res.queryResults);
});

const askNewQuestion = asyncHandler(async (req, res) => {
  const information = req.body;

  const question = await Question.create({
    ...information,
    user: req.user.id,
  });
  res.status(200).json({
    success: true,
    data: question,
  });
});
const editQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  let question = await Question.findById(id);

  question.title = title;
  question.content = content;

  question = await question.save();

  res.status(200).json({
    success: true,
    data: question,
  });
});
const deleteQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Question.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Quesition delete operation successful",
  });
});
const likeQuestion = asyncHandler(async (req, res, next) => {
  //req.data

  if (req.data.likes.includes(req.user.id)) {
    return next(new CustomError("You have already liked this question", 400));
  }

  req.data.likes.push(req.user.id);
  question.likeCount = question.likes.length;

  await question.save();

  res.status(200).json({
    success: true,
    data: req.data,
  });
});

const undoLikeQuestion = asyncHandler(async (req, res, next) => {
  //req.data

  if (!req.data.likes.includes(req.user.id)) {
    return next(
      new CustomError("You can not undo like operation this question", 400)
    );
  }

  const index = req.data.likes.indexOf(req.user.id);

  req.data.likes.splice(index, 1);
  question.likeCount = question.likes.length;

  await question.save();

  res.status(200).json({
    success: true,
    data: req.data,
  });
});
module.exports = {
  askNewQuestion,
  getAllQuestions,
  getSingleQuestion,
  editQuestion,
  deleteQuestion,
  likeQuestion,
  undoLikeQuestion,
};
