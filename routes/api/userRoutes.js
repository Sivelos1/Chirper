const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  editUser,
  deleteUser,
  userGetFriends,
  userAddFriend,
  userRemoveFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(editUser).delete(deleteUser);

// /api/users/:userId/friends
router.route('/:userId/friends').get(userGetFriends).post(userAddFriend).delete(userRemoveFriend);

module.exports = router;
