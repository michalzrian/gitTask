import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  describe('createUser', () => {
    it('should create a user', () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
      };
      const createdUser = service.createUser(createUserDto);
      expect(createdUser).toBeDefined();
      expect(createdUser.name).toEqual(createUserDto.name);
      expect(createdUser.email).toEqual(createUserDto.email);
      expect(createdUser.phoneNumber).toEqual(createUserDto.phoneNumber);
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', () => {
      const createUserDto: CreateUserDto = {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phoneNumber: '9876543210',
      };
      const createdUser = service.createUser(createUserDto);

      const updateUserDto: UpdateUserDto = {
        name: 'Jane Johnson',
      };
      const updatedUser = service.updateUser(createdUser.id, updateUserDto);
      expect(updatedUser).toBeDefined();
      expect(updatedUser.id).toEqual(createdUser.id);
      expect(updatedUser.name).toEqual(updateUserDto.name);
      expect(updatedUser.email).toEqual(createUserDto.email); // verifying email is not changed
      expect(updatedUser.phoneNumber).toEqual(createUserDto.phoneNumber); // verifying phone number is not changed
    });

    it('should throw NotFoundException for non-existing user', () => {
      const updateUserDto: UpdateUserDto = {
        name: 'Jane Johnson',
      };
      expect(() => service.updateUser(999, updateUserDto)).toThrowError(NotFoundException);
    });
  });

  describe('deleteUser', () => {
    it('should delete an existing user', () => {
      const createUserDto: CreateUserDto = {
        name: 'David Brown',
        email: 'david.brown@example.com',
        phoneNumber: '5556667777',
      };
      const createdUser = service.createUser(createUserDto);
      const result = service.deleteUser(createdUser.id);
      expect(result).toEqual(true);
    });

    it('should throw NotFoundException for non-existing user', () => {
      expect(() => service.deleteUser(999)).toThrowError(NotFoundException);
    });
  });

  describe('getUserById', () => {
    it('should retrieve an existing user by ID', () => {
      const createUserDto: CreateUserDto = {
        name: 'Alice Green',
        email: 'alice.green@example.com',
        phoneNumber: '1112223333',
      };
      const createdUser = service.createUser(createUserDto);
      const retrievedUser = service.getUserById(createdUser.id);
      expect(retrievedUser).toBeDefined();
      expect(retrievedUser.id).toEqual(createdUser.id);
    });

    it('should throw NotFoundException for non-existing user', () => {
      expect(() => service.getUserById(999)).toThrowError(NotFoundException);
    });
  });

});
