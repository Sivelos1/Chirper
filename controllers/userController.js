const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  
  // edit an existing user
  async editUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true });
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async userAddFriend(req, res) {
    try {
      
      const friend = await User.findOneAndUpdate({_id: req.body.userId},
        {$addToSet: {friends: req.params.userId}},
        {new: true});
      if(!friend){
        return res.status(404).json({message: 'No user found with that ID'});
      }
      const user = await User.findOneAndUpdate({ _id: req.params.userId },
        {$addToSet: {friends: friend._id}},
        {new: true});

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async userRemoveFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        {$pull:{friends: {_id: req.body.userId}}},
        {new: true}
        );
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  
  async userGetFriends(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(user.friends);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // edit an existing user
  async deleteUser(req, res) {
    try {
      const user = await User.deleteOne({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json("Deleted user");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
