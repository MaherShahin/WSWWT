import request from 'supertest';
import User, { IUser } from '../models/User';
import { TUser } from "../models/User";
import mongoose from 'mongoose';
import app from '../app';
import { IRoom } from '/../models/Room'; 
import { TRoom } from "../models/Room";
import { ClientSession } from 'mongodb';

const validUserFields: TUser = {
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

let validUser: IUser;
let token: string;
const roomJson = {
    "name": "testingtesting-room",
    "password": "1233456",
    "roomType": "public",
    "description": "test-room",
    "criteria": "test-room",
    "maxParticipants": 2
}

beforeAll(async () => {
    const registerRes = await request(app).post('/api/user/register').send(validUserFields);
    token = registerRes.body.token;
    validUser = await User.findOne({ email: validUserFields.email });
});

afterAll(async () => {
    await mongoose.connection.close();
});


beforeEach(() => {
    jest.spyOn(console, 'error')
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockImplementation(() => null);
});

afterEach(() => {
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockRestore()
})


describe('Room Routes', () => {

    describe('POST /api/room/create', () => {

        it('should return 401 if user is not authenticated', async () => {
            const res = await request(app).post('/api/room/create');
            expect(res.status).toBe(401);
            expect(res.body.msg).toBe('No token, authorization denied');
        });

        it('should return 400 if user is authenticated but provides invalid data', async () => {

            // send the request using a json as such:
            let roomJsonIncomplete = { ...roomJson, criteria: '' };

            const res = await request(app)
                .post('/api/room/create')
                .set('x-auth-token', token)
                .send(roomJsonIncomplete);
            expect(res.status).toBe(400);
            expect(res.body.errors[0].msg).toBe('Criteria is required');
        });

        it('should create a room and return the room and user if user is authenticated and provides valid data', async () => {
            const room = {
                ...roomJson,
                name: 'Test Room',
                roomType: 'private',
            };

            const res = await request(app)
                .post('/api/room/create')
                .set('x-auth-token', token)
                .send(room);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('room');
            expect(res.body).toHaveProperty('user');
        });


        it('should return 400 if password is too short', async () => {
            const room = { ...roomJson, password: '12345' };
            const res = await request(app)
                .post('/api/room/create')
                .set('x-auth-token', token)
                .send(room);
            expect(res.status).toBe(400);
            expect(res.body.errors[0].msg).toBe('Password is required and has to be at least 6 chars');
        });

        it('should return 400 if maxParticipants is not a number', async () => {
            const room = { ...roomJson, maxParticipants: 'ten' };
            const res = await request(app)
                .post('/api/room/create')
                .set('x-auth-token', token)
                .send(room);
            expect(res.status).toBe(400);
        });

        it('should return 400 if roomType is invalid', async () => {
            const room = { ...roomJson, roomType: 'invalid' };
            const res = await request(app)
                .post('/api/room/create')
                .set('x-auth-token', token)
                .send(room);
            expect(res.status).toBe(400);
        });

        it('should return 401 if token is invalid', async () => {
            const res = await request(app)
                .post('/api/room/create')
                .set('x-auth-token', 'invalidToken')
                .send(roomJson);
            expect(res.status).toBe(401);
        });

        it('should return 400 if roomType is private and password is missing', async () => {
            const room = { ...roomJson, roomType: 'private' };
            room.password = undefined;
            const res = await request(app)
                .post('/api/room/create')
                .set('x-auth-token', token)
                .send(room);
            expect(res.status).toBe(400);
        });

        it('should return 400 if room id is invalid', async () => {
            const res = await request(app)
                .get('/api/room/123')
                .set('x-auth-token', token);
            expect(res.status).toBe(400);
        });

        it('should return 400 if maxParticipants is less than 1 or greater than 25', async () => {
            let room = { ...roomJson, maxParticipants: 0 };
            let res = await request(app)
                .post('/api/room/create')
                .set('x-auth-token', token)
                .send(room);
            expect(res.status).toBe(400);

            room = { ...roomJson, maxParticipants: 26 };
            res = await request(app)
                .post('/api/room/create')
                .set('x-auth-token', token)
                .send(room);
            expect(res.status).toBe(400);
        });
    });


    describe('GET /api/room/:roomId', () => {
        let roomId: String;
        beforeEach(() => {
            roomId = new mongoose.Types.ObjectId().toHexString();
        });
    
        const exec = () => {
            return request(app)
                .get('/api/room/' + roomId)
                .set('x-auth-token', token);
        };
    
        it('should return 404 if room does not exist', async () => {
            const res = await exec();
    
            expect(res.status).toBe(404);
        });
    
        it('should return 400 if roomId is not a valid ObjectId', async () => {
            roomId = '123';
    
            const res = await exec();
    
            expect(res.status).toBe(400);
        });
    
        it('should return 401 if user is not authenticated', async () => {
            token = '';
    
            const res = await exec();
    
            expect(res.status).toBe(401);
        });
    });
    

});
