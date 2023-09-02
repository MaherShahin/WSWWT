// container.ts
import { Container } from 'inversify';
import Room, { IRoom } from './models/Room';
import User, { IUser } from './models/User';


const container = new Container();
container.bind<IRoom>('Room').to(Room);
container.bind<IUser>('User').to(User);

export default container;

