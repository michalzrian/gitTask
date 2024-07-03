class User {
    constructor(name, email, phoneNumber) {
      this.id = User.nextId++;
      this.name = name;
      this.email = email;
      this.phoneNumber = phoneNumber;
    }
  
    static init() {
      User.nextId = 1;
      User.users = [];
    }
  
    static createUser(userData) {
      const user = new User(userData.name, userData.email, userData.phoneNumber);
      User.users.push(user);
      return user;
    }
  
    static getUserById(userId) {
      return User.users.find(user => user.id === parseInt(userId));
    }
  
    static updateUser(userId, userData) {
      const user = User.getUserById(userId);
      if (!user) return null;
      Object.assign(user, userData);
      return user;
    }
  
    static deleteUser(userId) {
      const userIndex = User.users.findIndex(user => user.id === parseInt(userId));
      if (userIndex === -1) return false;
      User.users.splice(userIndex, 1);
      return true;
    }
  }
  
  module.exports = User;
  