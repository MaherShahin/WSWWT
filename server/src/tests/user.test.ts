import request from 'supertest';
import User, { IUser } from '../models/User';
import { TUser } from "../models/User";
import mongoose from 'mongoose';
import app from '../app';

const validUser: TUser = {
    email: 'user@test.de',
    username: 'testuser',
    name: 'Test User',
    password: '123456',
    createdRooms: [],
    joinedRooms: [],
    profilePicture: '',
    bio: '',
    dateCreated: new Date(),
    lastLogin: new Date(),
};


describe('User Routes', () => {

    beforeEach(async () => {
        await User.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();

    });

    describe('Valid Fields User Registration', () => {
        it('should register a user and return a token', async () => {
            const user: TUser = {
                email: 'test@test.de',
                username: 'testuser',
                name: 'Test User',
                password: 'password123',
                createdRooms: [],
                joinedRooms: [],
                profilePicture: '',
                bio: '',
                dateCreated: new Date(),
                lastLogin: new Date(),
            };

            const res = await request(app).post('/api/user/register').send(user);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('token');

            const savedUser = await User.findOne({ email: user.email });
            expect(savedUser).not.toBeNull();
            expect(savedUser.password).not.toBe(user.password);

        });
    });

    describe('Invalid Fields User Registration', () => {
        it('should not register a user with an invalid email or a short password', async () => {
            const userWrongEmail: TUser = {
                email: 'testtest.de',
                username: 'testuser',
                name: 'Test User',
                password: '123456',
                createdRooms: [],
                joinedRooms: [],
                profilePicture: '',
                bio: '',
                dateCreated: new Date(),
                lastLogin: new Date(),
            };

            const userWrongPassword: TUser = {
                email: 'testtest.de',
                username: 'testuser',
                name: 'Test User',
                password: '123',
                createdRooms: [],
                joinedRooms: [],
                profilePicture: '',
                bio: '',
                dateCreated: new Date(),
                lastLogin: new Date(),
            };

            const userNoName: TUser = {
                email: 'testtest.de',
                username: '',
                name: 'Test User',
                password: '123',
                createdRooms: [],
                joinedRooms: [],
                profilePicture: '',
                bio: '',
                dateCreated: new Date(),
                lastLogin: new Date(),
            };


            const resWrongEmail = await request(app).post('/api/user/register').send(userWrongEmail);
            expect(resWrongEmail.status).toBe(400);
            expect(resWrongEmail.body).not.toHaveProperty('token');

            const resWrongPassword = await request(app).post('/api/user/register').send(userWrongPassword);
            expect(resWrongPassword.status).toBe(400);
            expect(resWrongPassword.body).not.toHaveProperty('token');


            const resNoName = await request(app).post('/api/user/register').send(userNoName);
            expect(resNoName.status).toBe(400);
            expect(resNoName.body).not.toHaveProperty('token');

            const queryWrongEmail = await User.findOne({ email: userWrongEmail.email });
            expect(queryWrongEmail).toBeNull();

            const queryWrongPassword = await User.findOne({ email: userWrongPassword.email });
            expect(queryWrongPassword).toBeNull();

            const queryWrongName = await User.findOne({ email: userNoName.email });
            expect(queryWrongName).toBeNull();

        });
    });

    describe("Invalid Fields User Login", () => {
        it('should not let a user login that doesn\'t exist', async () => {
            const fakeUser: TUser = {
                email: 'fake@notreal.de',
                username: 'testuser',
                name: 'Test User',
                password: '123456',
                createdRooms: [],
                joinedRooms: [],
                profilePicture: '',
                bio: '',
                dateCreated: new Date(),
                lastLogin: new Date(),
            };

            const res = await request(app).post('/api/auth/login').send(fakeUser);
            expect(res.status).toBe(404);
            expect(res.body).not.toHaveProperty('token');

            const query = await User.findOne({ email: fakeUser.email });
            expect(query).toBeNull();
        })
    });

    describe('Valid Fields User Login', () => {
        it('should login a user and return a token', async () => {
            const user: TUser = validUser;

            const resRegister = await request(app).post('/api/user/register').send(user);
            expect(resRegister.status).toBe(200);
            expect(resRegister.body).toHaveProperty('token');

            const resLogin = await request(app).post('/api/auth/').send({ email: user.email, password: user.password});
            expect(resLogin.status).toBe(200);
            expect(resLogin.body).toHaveProperty('token');

        });
    });

    describe('Update User', () => {
        it('should update the user bio and name', async () => {
            const user: TUser = validUser;

            const registerRes = await request(app).post('/api/user/register').send(user);
            const token = registerRes.body.token;

            const updateUser = {
                bio: 'Updated Bio',
                name: 'Updated Name'
            };

            const updateRes = await request(app)
                .put('/api/user/update')
                .set('x-auth-token', token)
                .send(updateUser);
            expect(updateRes.status).toBe(200);
            expect(updateRes.body.user.bio).toBe(updateUser.bio);
            expect(updateRes.body.user.name).toBe(updateUser.name);
        });
    });

    describe('Delete User', () => {
        it('should delete the user', async () => {
            const user: TUser =  validUser;
            const registerRes = await request(app).post('/api/user/register').send(user);
            const token = registerRes.body.token;

            const deleteRes = await request(app)
                .delete('/api/user/delete')
                .set('x-auth-token', token);
            expect(deleteRes.status).toBe(200);

            const query = await User.findOne({ email: user.email });
            expect(query).toBeNull();
        });
    });

});
