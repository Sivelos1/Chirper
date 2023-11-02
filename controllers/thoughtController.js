const User = require('../models/User');

const {Thought,Reaction} = require('../models/Thought');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      //add thought to user
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  
  // edit an existing user
  async editThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true });
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // edit an existing user
  async thoughtAddReaction(req, res) {
    try {
      const user = await User.findOne({ _id: req.body.userId });
      if (!user){
        return res.status(404).json({ message: 'No user with that ID' });
      }
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: {
          reactionBody: req.body.reactionBody,
          createdAt: Date.now(),
          username: user.username
        } } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async thoughtRemoveReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {$pull:{reactions: {reactionId: req.body.reactionId}}},
        {new: true}
        );
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async thoughtGetReactions(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      res.json(thought.reactions);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // delete an existing user
  async deleteThought(req, res) {
    try {
      const thought = await Thought.deleteOne({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      const user = await User.findOneAndUpdate({username: thought.username}, {
        $pull: {thoughts: thought._id},
      },
      {new: true});
      res.json("Deleted thought");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
