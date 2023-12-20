const router = require("express").Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend } = require("../../controller/userController");

//get all users and post a user
router.route("/").get(getAllUsers).post(createUser);

//get user by id, update user by id, and delete user by id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

//add friend and remove friend
router.route("/:id/friends/:friendsId").post(addFriend).delete(removeFriend);

module.exports = router