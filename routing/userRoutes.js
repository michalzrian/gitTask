// routes.js - קובץ הראוטינג
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateUser = require('../middleware/validateUser');

router.post('/users', validateUser, (req, res) => {
    const { name, email, phone } = req.body;
    const newUser = userController.createUser(name, email, phone);
    res.json(newUser);
});

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

router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const deleted = userController.deleteUser(Number(id));
    if (deleted) {
        res.json({ message: 'User deleted successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

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
