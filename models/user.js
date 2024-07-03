// User.js - מודל של משתמש

class User {
    constructor(id, name, email, phone) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    static users = [];

    static createUser(name, email, phone) {
        const id = this.users.length + 1;
        const newUser = new User(id, name, email, phone);
        this.users.push(newUser);
        return newUser;
    }

    static updateUser(id, newName, newEmail, newPhone) {
        const userToUpdate = this.users.find(user => user.id === id);
        if (userToUpdate) {
            userToUpdate.name = newName;
            userToUpdate.email = newEmail;
            userToUpdate.phone = newPhone;
            return userToUpdate;
        }
        return null;
    }

    static deleteUser(id) {
        const initialLength = this.users.length;
        this.users = this.users.filter(user => user.id !== id);
        return this.users.length !== initialLength;
    }

    static getUserById(id) {
        return this.users.find(user => user.id === id) || null;
    }
}

module.exports = User;
