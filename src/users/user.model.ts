// users/user.model.ts
export class User {
    private static nextId: number = 1;
    private static users: User[] = [];
  
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
  
    constructor(name: string, email: string, phoneNumber: string) {
      this.id = User.nextId++;
      this.name = name;
      this.email = email;
      this.phoneNumber = phoneNumber;
    }
  
    static init() {
      if (!User.users) {
        User.nextId = 1;
        User.users = [];
      }
    }
  
    static createUser(name: string, email: string, phoneNumber: string): User {
      if (!User.users) {
        User.init();
      }
      const user = new User(name, email, phoneNumber);
      User.users.push(user);
      return user;
    }
  
    static getUserById(userId: number): User | undefined {
      if (!User.users) {
        User.init();
      }
      return User.users.find(user => user.id === userId);
    }
  
    static updateUser(userId: number, userData: Partial<User>): User | null {
      if (!User.users) {
        User.init();
      }
      const user = User.getUserById(userId);
      if (!user) return null;
      Object.assign(user, userData);
      return user;
    }
  
    static deleteUser(userId: number): boolean {
      if (!User.users) {
        User.init();
      }
      const userIndex = User.users.findIndex(user => user.id === userId);
      if (userIndex === -1) return false;
      User.users.splice(userIndex, 1);
      return true;
    }
  }
  