// user-controller.js
const { User, Thought } = require('../models');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  getUserById: async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId).populate('thoughts').populate('friends');
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  createUser: async (req, res) => {
    const { username, email } = req.body;
    try {
      const user = await User.create({ username, email });
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  updateUser: async (req, res) => {
    const { userId } = req.params;
    const { username, email } = req.body;
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { username, email },
        { new: true }
      );
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  deleteUser: async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await User.findByIdAndDelete(userId);
      // Bonus: Remove a user's associated thoughts when deleted
      await Thought.deleteMany({ userId });
      // Remove the user from friends' friend lists
      await User.updateMany(
        { friends: userId },
        { $pull: { friends: userId } }
      );
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  addFriend: async (req, res) => {
    const { userId, friendId } = req.params;
    try {
      await User.findByIdAndUpdate(userId, { $push: { friends: friendId } });
      await User.findByIdAndUpdate(friendId, { $push: { friends: userId } });
      res.json({ message: 'Friend added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  removeFriend: async (req, res) => {
    const { userId, friendId } = req.params;
    try {
      await User.findByIdAndUpdate(userId, { $pull: { friends: friendId } });
      await User.findByIdAndUpdate(friendId, { $pull: { friends: userId } });
      res.json({ message: 'Friend removed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = userController;
