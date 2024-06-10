/* eslint-disable import/extensions */
import express from 'express';
import { Thought } from '../models/index.js';

const router = express.Router();

// GET all thoughts
router.get('/', async (req, res) => {
    try {
        const thoughtData = await Thought.find()
        res.json(thoughtData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET a single thought by id
router.get('/:id', async (req, res) => {
    try {
        const thoughtData = await Thought.findOne({ _id: req.params.id });
        res.json(thoughtData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// POST to create a new thought

router.post('/', async (req, res) => {
    try {
        const thoughtData = await Thought.create(req.body);
        res.json(thoughtData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// PUT to update a thought by id
router.put('/:id', async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndUpdate({ _id: req.params.id }, req.body);
        res.json(thoughtData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// DELETE to remove a thought by id
router.delete('/:id', async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndDelete({ _id: req.params.id });
        res.json(thoughtData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

export default router;