const router = require("express").Router();
const Question = require("../models/Question");
const questionQueryMiddleware = require("../middleware/query/questionQueryMiddleware");
const {
  askNewQuestion,
  getAllQuestions,
  getSingleQuestion,
  editQuestion,
  deleteQuestion,
  likeQuestion,
  undoLikeQuestion,
} = require("../controller/question");
const answer = require("./answer");
const answerQueryMiddleware = require("../middleware/query/answerQueryMiddleware");
const {
  getAccessToRoute,
  getQuestionOwnerAccess,
} = require("../middleware/authorazition/auth");
const {
  checkQuestionExist,
} = require("../middleware/database/databaseErrorHelpers");

router.get("/:id/like", [getAccessToRoute, checkQuestionExist], likeQuestion);
router.get(
  "/:id/undo_like",
  [getAccessToRoute, checkQuestionExist],
  undoLikeQuestion
);
router.get(
  "/",
  questionQueryMiddleware(Question, {
    populate: {
      path: "user",
      select: "name profile_image",
    },
  }),
  getAllQuestions
);
router.get(
  "/:id",
  checkQuestionExist,
  answerQueryMiddleware(Question, {
    population: [
      {
        path: "user",
        select: "name profile_image",
      },
      {
        path: "answers",
        select: "content",
      },
    ],
  }),
  getSingleQuestion
);
router.post("/ask", getAccessToRoute, askNewQuestion);
router.put(
  "/:id/edit",
  [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess],
  editQuestion
);
router.delete(
  "/:id/edit",
  [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess],
  deleteQuestion
);

router.use("/:question_id/answer", checkQuestionExist, answer);
module.exports = router;
