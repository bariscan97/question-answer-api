const router = require("express").Router({ mergeParams: true });
const { getAccessToRoute } = require("../middleware/authorazition/auth");
const {
  checkQuestionAndAnswerExist,
} = require("../middleware/database/databaseErrorHelpers");
const {
  addNewAnswerToQuestion,
  getAllAnswerByQuestion,
  getSingleAnswer,
  editAnswer,
  deleteAnswer,
  likeAnswer,
  undoLikeAnswer,
} = require("../controller/answer");
const { getAnswerOwnerAccess } = require("../middleware/authorazition/auth");

router.post("/", getAccessToRoute, addNewAnswerToQuestion);
router.get("/", getAllAnswerByQuestion);
router.get("/:answer_id", checkQuestionAndAnswerExist, getSingleAnswer);
router.get(
  "/:answer_id/like",
  [checkQuestionAndAnswerExist, getAccessToRoute],
  likeAnswer
);
router.get(
  "/:answer_id/undo_like",
  [checkQuestionAndAnswerExist, getAccessToRoute],
  undoLikeAnswer
);
router.put(
  "/:answer_id/edit",
  [checkQuestionAndAnswerExist, getAccessToRoute, getAnswerOwnerAccess],
  editAnswer
);
router.delete(
  "/:answer_id/delete",
  [checkQuestionAndAnswerExist, getAccessToRoute, getAnswerOwnerAccess],
  deleteAnswer
);

module.exports = router;
