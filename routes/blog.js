const express = require('express');
const router = express.Router();
const Blog = require('../models/blogmodel');

const mongoose = require("mongoose");
const {authorizeJwt, verifyAccount} = require("../helpers/verifyAccount");

// GET /blogs - Get all blogs
router.get('/', authorizeJwt, verifyAccount([{name: 'blog', action: "read"}]), async (req, res) => {

    const filter = {};
    const search = req.query.search;

    if (search) {
        filter.$or = [
            {editor: {$regex: search, $options: "i"}},
            {title: { $regex: search, $options: "i"}},
            { description: { $regex: search, $options: "i" } },
            
        ];

    }

    try {
        const blog = await Blog.find(filter);
        res.status(200).json(blog);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

// GET /blogs/:id - Get a specific blog by ID
router.get('/:id', authorizeJwt, verifyAccount([{name: 'blog', action: "read"}]), async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ message: `Blog with ID ${id} not found` });
        }

        res.status(200).json(blog);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

// POST /blog - Create a new blog
router.post('/', authorizeJwt, verifyAccount([{name: 'blog', action: "create"}]), async (req, res) => {
    try {
        // Generate a new ObjectId for the _id field
        const newId = new mongoose.Types.ObjectId();

        // Assign the generated _id to req.body
        req.body._id = newId;

        const blog = await Blog.create(req.body);
        res.status(201).json(blog);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

// PUT /blog/:id - Update a blog by ID
router.put('/:id', authorizeJwt, verifyAccount([{name: 'blog', action: "update"}]), async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true });

        if (!blog) {
            return res.status(404).json({ message: `Cannot find any blog with ID ${id}` });
        }

        res.status(200).json(blog);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

// DELETE /blog/:id - Delete a blog by ID
router.delete('/:id', authorizeJwt, verifyAccount([{name: 'blog', action: "delete"}]), async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByIdAndDelete(id);

        if (!blog) {
            return res.status(404).json({ message: `Cannot find any blog with ID ${id}` });
        }

        res.status(200).json(blog);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
