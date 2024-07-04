import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  createUser(createUserDto: CreateUserDto): User {
    const { name, email, phoneNumber } = createUserDto;
    return User.createUser(name, email, phoneNumber);
  }

  updateUser(id: number, updateUserDto: UpdateUserDto): User {
    const user = User.updateUser(id, updateUserDto);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  deleteUser(id: number): boolean {
    const deleted = User.deleteUser(id);
    if (!deleted) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return true;
  }

  getUserById(id: number): User {
    const user = User.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
}
