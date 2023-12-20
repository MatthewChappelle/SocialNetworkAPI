const router = require("express").Router();
const { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction, deleteReaction } = require("../../controller/thoughtController");

//get all thoughts and post a thought
router.route("/").get(getAllThoughts).post(createThought);

//get thought by id, update thought by id, and delete thought by id
router.route("/:id").get(getThoughtById).put(updateThought).delete(deleteThought);

//add reaction
router.route("/:thoughtId/reactions").post(addReaction);

//delete reaction
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router