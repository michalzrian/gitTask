// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './user.model';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private nextId = 1;

  createUser(createUserDto: CreateUserDto): User {
    const newUser = new User(this.nextId++, createUserDto.name, createUserDto.email, createUserDto.phone);
    this.users.push(newUser);
    console.log('User created:', newUser); // הוספת הודעת לוג
    return newUser;
  }

  updateUser(id: number, updateUserDto: UpdateUserDto): User {
    const user = this.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    Object.assign(user, updateUserDto);
    console.log('User updated:', user); // הוספת הודעת לוג
    return user;
  }

  deleteUser(id: number): boolean {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    this.users.splice(userIndex, 1);
    console.log(`User with id ${id} deleted`); // הוספת הודעת לוג
    return true;
  }

  getUserById(id: number): User {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    console.log('User found:', user); // הוספת הודעת לוג
    return user;
  }
}
