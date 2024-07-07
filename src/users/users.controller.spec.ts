import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = { name: 'John Doe', email: 'john.doe@example.com', phone: '123456789' };
    jest.spyOn(service, 'createUser').mockImplementation(() => ({
      id: '1',
      ...createUserDto,
    }));

    expect(await controller.createUser(createUserDto)).toEqual({
      id: '1',
      ...createUserDto,
    });
  });

  it('should update a user', async () => {
    const updateUserDto: UpdateUserDto = { name: 'Jane Doe', email: 'jane.doe@example.com', phone: '987654321' };
    jest.spyOn(service, 'updateUser').mockImplementation(() => ({
      id: '1',
      ...updateUserDto,
    }));

    expect(await controller.updateUser('1', updateUserDto)).toEqual({
      id: '1',
      ...updateUserDto,
    });
  });

  it('should delete a user', async () => {
    jest.spyOn(service, 'deleteUser').mockImplementation(() => true);
    expect(await controller.deleteUser('1')).toEqual({ message: 'User deleted successfully' });
  });

  it('should get a user by id', async () => {
    const user = { id: '1', name: 'John Doe', email: 'john.doe@example.com', phone: '123456789' };
    jest.spyOn(service, 'getUserById').mockImplementation(() => user);

    expect(await controller.getUserById('1')).toBe(user);
  });

  it('should throw NotFoundException when user not found', async () => {
    jest.spyOn(service, 'getUserById').mockImplementation(() => {
      throw new NotFoundException();
    });

    try {
      await controller.getUserById('999');
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
    }
  });
});
