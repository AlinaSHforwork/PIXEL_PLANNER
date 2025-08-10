// server/routes/todos.js

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const prisma = new PrismaClient();
const router = express.Router();

// @route   POST /api/todos
// @desc    Create a new todo item for the authenticated user
// @access  Private
router.post('/', auth, async (req, res) => {
  const { task, due_date, tags } = req.body;
  try {
    const newTodo = await prisma.todo.create({
      data: {
        task,
        user_id: req.user.id,
        due_date,
        tags,
        is_complete: false,
        pomodoro_count: 0
      },
    });
    res.json(newTodo);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/todos
// @desc    Get all todos for the authenticated user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({
      where: { user_id: req.user.id },
      orderBy: { created_at: 'asc' },
    });
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @route   PATCH /api/todos/:id
// @desc    Update a specific todo item
// @access  Private
router.patch('/:id', auth, async (req, res) => {
  const { task, is_complete, due_date, tags } = req.body;
  try {
    const updatedTodo = await prisma.todo.update({
      where: {
        id: parseInt(req.params.id),
        user_id: req.user.id,
      },
      data: {
        task,
        is_complete,
        due_date,
        tags,
      },
    });
    res.json(updatedTodo);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/todos/:id
// @desc    Delete a specific todo item
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.todo.delete({
      where: {
        id: parseInt(req.params.id),
        user_id: req.user.id,
      },
    });
    res.json({ msg: 'Todo item deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;