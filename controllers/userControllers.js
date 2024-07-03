// userController.js - קונטרולר לניהול משתמשים

const User = require('../models/userModel'); // או כל נתיב אחר שבו נמצא המודל User

function createUser(name, email, phone) {
    return User.createUser({ name, email, phoneNumber: phone });
}

function updateUser(id, newName, newEmail, newPhone) {
    return User.updateUser(id, { name: newName, email: newEmail, phoneNumber: newPhone });
}

function deleteUser(id) {
    return User.deleteUser(id);
}

function getUserById(id) {
    return User.getUserById(id);
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUserById
};
