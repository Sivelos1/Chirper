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
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;length;
      await user.save();
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // edit an existing user
  async userAddThought(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      const thought = await Thought.findOne({_id: req.body.thoughtId});
      if(!thought){
        return res.status(404).json({message: 'No thought found with that ID'});
      }
      user.thoughts.push(req.body.thoughtId);
      await user.save();
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async userRemoveThought(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      const thought = await Thought.findOne({_id: req.body.thoughtId});
      if(!thought){
        return res.status(404).json({message: 'No thought found with that ID'});
      }
      const isInList = (user.thoughts.indexOf(req.body.thoughtId) === -1);
      if(!isInList){
        return res.status(404).json({message: 'No thought ID found in thoughts list'});
      }
      user.thoughts.splice(user.thoughts.indexOf(req.body.thoughtId),1);
      await user.save();
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async userGetThoughts(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(user.thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async userAddFriend(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      const friend = await User.findOne({_id: req.body.userId});
      if(!friend){
        return res.status(404).json({message: 'No user found with that ID'});
      }
      user.friends.push(req.body.thoughtId);
      await user.save();
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async userRemoveFriend(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      const isInList = (user.friends.indexOf(req.body.userId) === -1);
      if(!isInList){
        return res.status(404).json({message: 'No user ID found in friends list'});
      }
      user.friends.splice(user.friends.indexOf(req.body.userId),1);
      await user.save();
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
