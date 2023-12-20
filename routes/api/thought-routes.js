const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controller");

// create thought
router.route("/").get(getAllThoughts).post(createThought);

//delete thought
router.route("/:id").get(getThoughtById).put(updateThought).delete(deleteThought);

//add reaction
router.route("/:thoughtId/reactions").post(addReaction);

//delete reaction
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);


module.exports = router;
