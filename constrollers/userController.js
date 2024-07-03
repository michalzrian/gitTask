// userController.js - קונטרולר לניהול משתמשים

let users = [];

function createUser(name, email, phone) {
    const id = users.length + 1;
    const newUser = { id, name, email, phone };
    users.push(newUser);
    return newUser;
}

function updateUser(id, newName, newEmail, newPhone) {
    const userToUpdate = users.find(user => user.id === id);
    if (userToUpdate) {
        userToUpdate.name = newName;
        userToUpdate.email = newEmail;
        userToUpdate.phone = newPhone;
        return userToUpdate;
    }
    return null;
}

function deleteUser(id) {
    const initialLength = users.length;
    users = users.filter(user => user.id !== id);
    return users.length !== initialLength;
}

function getUserById(id) {
    return users.find(user => user.id === id) || null;
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUserById
};