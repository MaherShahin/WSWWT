import { UserController } from '../../src/controllers/userController';
import { UserService } from '../../src/services/userService';
import Request from '../../src/types/Request';
jest.mock('../../src/services/userService');

describe('UserController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully update a user', async () => {
    UserService.updateUser = jest.fn().mockResolvedValue({
      _id: 'someUserId',
      bio: 'newBio',
      name: 'newName',
      toObject: jest.fn().mockReturnValue({ bio: 'newBio', name: 'newName' }),
    });

    const req = {
      userId: 'mockUserId',
      body: { bio: 'newBio', name: 'newName' },
    } as Request; // Modify this line

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await UserController.update(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ user: { bio: 'newBio', name: 'newName' } });
  });

  it('should fail to update a user if not found', async () => {
    UserService.updateUser = jest.fn().mockImplementation(() => {
      throw new Error('User not found');
    });

    const req = {
      userId: 'mockUserId',
      body: { bio: 'newBio', name: 'newName' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await UserController.update(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
  });

  it('should successfully delete a user', async () => {
    UserService.deleteUser = jest.fn().mockResolvedValue(null);

    const req = {
      userId: 'mockUserId',
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();

    await UserController.delete(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith('User deleted');
  });

  it('should fail to delete a user if not found', async () => {
    UserService.deleteUser = jest.fn().mockImplementation(() => {
      throw new Error('User not found');
    });

    const req = {
      userId: 'mockUserId',
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await UserController.delete(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
  });
});
