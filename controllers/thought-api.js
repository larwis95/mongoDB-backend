/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import express from "express";
import { Thought, User } from "../models/index.js";

const router = express.Router();

// GET all thoughts
//
router.get("/", async (req, res) => {
  try {
    const thoughtData = await Thought.find().populate({
      path: "reactions",
      select: "-__v",
    });
    res.json(thoughtData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET a single thought by id
router.get("/:id", async (req, res) => {
  try {
    const thoughtData = await Thought.findOne({ _id: req.params.id }).populate({
      path: "reactions",
      select: "-__v",
    });
    res.json(thoughtData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST to create a new thought, then add it to user thought sub array field

router.post("/", async (req, res) => {
  try {
    const thoughtData = await Thought.create(req.body);
    const userData = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $push: { thoughts: thoughtData._id } },
      { new: true }
    );
    if (!userData)
      return res
        .status(404)
        .json({ message: "No user found with this username!" });
    return res.json({ thoughtData, userData });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
// PUT to update a thought by id
router.put("/:id", async (req, res) => {
  try {
    const thoughtData = await Thought.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json(thoughtData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE to remove a thought by id
router.delete("/:id", async (req, res) => {
  try {
    const thoughtData = await Thought.findOneAndDelete({ _id: req.params.id });
    const userData = await User.findOneAndUpdate(
      { _id: thoughtData.userId },
      { $pull: { thoughts: thoughtData._id } },
      { new: true }
    );
    res.json(thoughtData, userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST to create a reaction stored in a single thought's reactions array field
router.post("/:thoughtId/reactions", async (req, res) => {
  try {
    const thoughtData = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    );
    res.json(thoughtData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete("/:thoughtId/reactions/:reactionId", async (req, res) => {
  try {
    const thoughtData = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    res.json(thoughtData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default router;
