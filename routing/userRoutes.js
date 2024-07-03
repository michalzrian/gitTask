const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const validateUser = require('../middleware/validateUser');

// POST request - create user
router.post('/users', validateUser, (req, res) => {
    const { name, email, phone } = req.body;
    const newUser = userController.createUser(name, email, phone);
    res.json(newUser);
});

// PUT request - update user
router.put('/users/:id', validateUser, (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const updatedUser = userController.updateUser(Number(id), name, email, phone);
    if (updatedUser) {
        res.json(updatedUser);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// DELETE request - delete user
router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const deleted = userController.deleteUser(Number(id));
    if (deleted) {
        res.json({ message: 'User deleted successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// GET request - get user by ID
router.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = userController.getUserById(Number(id));
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

module.exports = router;
