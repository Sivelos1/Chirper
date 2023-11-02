const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  editThought,
  deleteThought,
  thoughtAddReaction,
  thoughtGetReactions,
  thoughtRemoveReaction,
} = require('../../controllers/thoughtController');

// /api/users
router.route('/').get(getThoughts).post(createThought);

// /api/users/:userId
router.route('/:thoughtId').get(getSingleThought).put(editThought).delete(deleteThought);

// /api/users/:userId/friends
router.route('/:thoughtId/reactions').get(thoughtGetReactions).post(thoughtAddReaction).delete(thoughtRemoveReaction);

module.exports = router;
