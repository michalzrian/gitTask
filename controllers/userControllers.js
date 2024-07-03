const User = require('../models/userModel');

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
    const user = User.getUserById(id);
    if (!user) {
        const error = new Error(`User with id ${id} not found`);
        error.statusCode = 404;
        throw error;
    }
    return user;
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUserById
};
