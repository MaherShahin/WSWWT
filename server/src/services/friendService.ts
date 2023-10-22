import { Types } from "mongoose";
import { ValidationError } from "../errors/ValidationError";
import User, { IUser } from "../models/User";
import FriendRequest, { IFriendRequest, TFriendRequest } from "../models/FriendRequest";

export class FriendService {

    static async addFriend(userId: Types.ObjectId, friendId: Types.ObjectId) {
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        console.log(userId)
        console.log(friendId)

        const friendAlreadyAdded = user?.friends.includes(friendId);

        if (!user || !friend) {
            throw new ValidationError('Could not add friend, either user or friend dont exist');
        }

        if (friendAlreadyAdded) {
            throw new ValidationError('Friend already added');
        }

        user.friends.push(friendId);
        await user.save();

        friend.friends.push(userId);
        await friend.save();

        return user;
    };

    static async removeFriend(userId: Types.ObjectId, friendId: Types.ObjectId) {
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);


        if (!user || !friend) {
            throw new ValidationError('Could not remove friend, either user or friend dont exist');
        }

        if (!user?.friends.includes(friendId)) {
            throw new ValidationError('User is not in the friend list!');
        }

        user.friends = user.friends.filter((id: Types.ObjectId) => !id.equals(friendId));
        await user.save();

        friend.friends = friend.friends.filter((id: Types.ObjectId) => !id.equals(userId));
        await friend.save();

        return user;
    };

    static async sendFriendRequest(userId: Types.ObjectId, friendId: Types.ObjectId): Promise<IFriendRequest | { message: string }[]> {
        const existingRequest = await FriendRequest.findOne({
            $or: [
                { from: userId, to: friendId },
                { from: friendId, to: userId }
            ]
        });

        if (existingRequest) {
            throw new ValidationError("A friend request already exists between these users.");
        }

        const newRequest: TFriendRequest = {
            from: userId,
            to: friendId,
            status: "pending",
            dateCreated: new Date(),
        };

        const createdRequest = await FriendRequest.create(newRequest);

        if (!createdRequest) {
            throw new ValidationError("Unable to send friend request");
        }

        return createdRequest;

    };

    static async acceptFriendRequest(requestId: Types.ObjectId, userId: Types.ObjectId): Promise<IFriendRequest | IUser | null> {
        const request = await FriendRequest.findById(requestId);
        if (!request || request.status !== 'pending' || !request.to.equals(userId)) {
            throw new ValidationError('Invalid or expired friend request');
        }

        request.status = 'accepted';
        await request.save();

        const user = await this.addFriend(request.from, request.to);
        const friend = await this.addFriend(request.to, request.from);

        if (!user || !friend) {
            throw new ValidationError('Unable to accept friend request');
        }

        return user;
    };

    static async rejectFriendRequest(requestId: Types.ObjectId, userId: Types.ObjectId): Promise<IFriendRequest | null> {
        const request = await FriendRequest.findById(requestId);

        if (!request || request.status !== 'pending' || !request.to.equals(userId)) {
            throw new ValidationError('Invalid or expired friend request');
        }

        request.status = 'rejected';
        const response = await request.save();

        if (!response) {
            throw new ValidationError('Unable to reject friend request');
        }

        return request;

    }

    static async getFriendRequests(userId: Types.ObjectId): Promise<IFriendRequest[]> {

        const friendRequests = await FriendRequest.find({
            $or: [
                { from: userId },
                { to: userId }
            ]
        }).sort({ dateCreated: -1 });

        if (!friendRequests) {
            throw new ValidationError('Unable to fetch friend requests');
        }

        return friendRequests;
    }

}
