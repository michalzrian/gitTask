// src/users/users.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', () => {
    const createUserDto: CreateUserDto = { name: 'John Doe', email: 'john.doe@example.com', phone: '123456789' };
    const user = service.createUser(createUserDto);
    expect(user).toHaveProperty('id');
    expect(user.name).toBe(createUserDto.name);
  });

  it('should get a user by id', () => {
    const createUserDto: CreateUserDto = { name: 'John Doe', email: 'john.doe@example.com', phone: '123456789' };
    const user = service.createUser(createUserDto);
    const foundUser = service.getUserById(user.id);
    expect(foundUser).toBe(user);
  });

  it('should update a user', () => {
    const createUserDto: CreateUserDto = { name: 'John Doe', email: 'john.doe@example.com', phone: '123456789' };
    const user = service.createUser(createUserDto);
    const updateUserDto: UpdateUserDto = { name: 'Jane Doe', email: 'jane.doe@example.com', phone: '987654321' };
    const updatedUser = service.updateUser(user.id, updateUserDto);
    expect(updatedUser.name).toBe(updateUserDto.name);
  });

  it('should delete a user', () => {
    const createUserDto: CreateUserDto = { name: 'John Doe', email: 'john.doe@example.com', phone: '123456789' };
    const user = service.createUser(createUserDto);
    expect(service.deleteUser(user.id)).toBe(true);
  });

  it('should throw error when user not found', () => {
    expect(() => service.getUserById(999)).toThrow(NotFoundException);
    expect(() => service.updateUser(999, { name: 'Test', email: 'test@test.com', phone: '123456' })).toThrow(NotFoundException);
    expect(() => service.deleteUser(999)).toThrow(NotFoundException);
  });
});
