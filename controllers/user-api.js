/* eslint-disable import/extensions */
import express from "express";
import { User, Thought } from "../models/index.js";

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const userData = await User.find();
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET a singler user by id, and thought and friend data.
router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req.params.id })
      .populate("thoughts")
      .populate("friends");
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST to create a new user.
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// PUT to update a user by id.
router.put("/:id", async (req, res) => {
  try {
    const userData = await User.findOneAndUpdate(
      { _id: req.params.id },
      { new: true },
      req.body,
    );
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE to remove a user by id.
router.delete("/:id", async (req, res) => {
  try {
    const userData = await User.findOneAndDelete(
      { _id: req.params.id },
      { new: true },
    );
    const thoughtData = await Thought.deleteMany({
      _id: { $in: userData.thoughts },
    });
    res.json([userData, thoughtData]);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST to add a new friend to a user's friend list.
router.post("/:userId/friends/:friendId", async (req, res) => {
  try {
    const userData = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true },
    );
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE to remove a friend from a user's friend list.
router.delete("/:userId/friends/:friendId", async (req, res) => {
  try {
    const userData = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true },
    );
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default router;
