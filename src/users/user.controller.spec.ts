import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { UsersModule } from './user.module';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
      };
      const createdUser = await controller.createUser(createUserDto);
      expect(createdUser).toBeDefined();
      expect(createdUser.name).toEqual(createUserDto.name);
      expect(createdUser.email).toEqual(createUserDto.email);
      expect(createdUser.phoneNumber).toEqual(createUserDto.phoneNumber);
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phoneNumber: '9876543210',
      };
      const createdUser = await service.createUser(createUserDto);

      const updateUserDto: UpdateUserDto = {
        name: 'Jane Johnson',
      };
      const updatedUser = await controller.updateUser(createdUser.id, updateUserDto);
      expect(updatedUser).toBeDefined();
      expect(updatedUser.id).toEqual(createdUser.id);
      expect(updatedUser.name).toEqual(updateUserDto.name);
      expect(updatedUser.email).toEqual(createUserDto.email); // verifying email is not changed
      expect(updatedUser.phoneNumber).toEqual(createUserDto.phoneNumber); // verifying phone number is not changed
    });
  });

  describe('deleteUser', () => {
    it('should delete an existing user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'David Brown',
        email: 'david.brown@example.com',
        phoneNumber: '5556667777',
      };
      const createdUser = await service.createUser(createUserDto);
      const result = await controller.deleteUser(createdUser.id);
      expect(result).toEqual(true);
    });
  });

});
