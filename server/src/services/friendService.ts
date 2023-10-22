import { Types } from "mongoose";
import { ValidationError } from "../errors/validationError";
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
            throw new ValidationError([{ message: 'Could not add friend, either user or friend dont exist' }]);
        }

        if (friendAlreadyAdded) {
            throw new ValidationError([{ message: 'Friend already added' }]);
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
            throw new ValidationError([{ message: 'Could not remove friend, either user or friend dont exist' }]);
        }

        if (!user?.friends.includes(friendId)) {
            throw new ValidationError([{ message: 'User is not in the friend list!' }]);
        }

        user.friends = user.friends.filter((id: Types.ObjectId) => !id.equals(friendId));
        await user.save();

        friend.friends = friend.friends.filter((id: Types.ObjectId) => !id.equals(userId));
        await friend.save();

        return user;
    };

    static async sendFriendRequest(userId: Types.ObjectId, friendId: Types.ObjectId): Promise<IFriendRequest | { message: string }[]> {
        try {
            const existingRequest = await FriendRequest.findOne({
                $or: [
                    { from: userId, to: friendId },
                    { from: friendId, to: userId }
                ]
            });

            if (existingRequest) {
                throw new ValidationError([{ message: "A friend request already exists between these users." }]);
            }

            const newRequest: TFriendRequest = {
                from: userId,
                to: friendId,
                status: "pending",
                dateCreated: new Date(),
            };

            const createdRequest = await FriendRequest.create(newRequest);
            return createdRequest;

        } catch (error) {
            console.error("An error occurred while sending friend request:", error);
            throw new ValidationError([{ message: "Unable to send friend request" }]);
        }
    };

    static async acceptFriendRequest(requestId: Types.ObjectId, userId: Types.ObjectId): Promise<IFriendRequest | IUser | null> {
        try {
            const request = await FriendRequest.findById(requestId);
            if (!request || request.status !== 'pending' || !request.to.equals(userId)) {
                throw new ValidationError([{ message: 'Invalid or expired friend request' }]);
            }

            request.status = 'accepted';
            await request.save();

            const user = await this.addFriend(request.from, request.to);
            await this.addFriend(request.to, request.from);

            return user;

        } catch (error) {
            console.error("An error occurred while accepting the friend request:", error);
            throw new ValidationError([{ message: 'Unable to accept friend request' }]);
        }
    };

    static async rejectFriendRequest(requestId: Types.ObjectId, userId: Types.ObjectId): Promise<IFriendRequest | null> {
        try {
            const request = await FriendRequest.findById(requestId);
            if (!request || request.status !== 'pending' || !request.to.equals(userId)) {
                throw new ValidationError([{ message: 'Invalid or expired friend request' }]);
            }

            request.status = 'rejected';
            await request.save();

            return request;

        } catch (error) {
            console.error("An error occurred while rejecting the friend request:", error);
            throw new ValidationError([{ message: 'Unable to reject friend request' }]);
        }
    }

    static async getFriendRequests(userId: Types.ObjectId): Promise<IFriendRequest[]> {
        try {
            const friendRequests = await FriendRequest.find({
                $or: [
                    { from: userId },
                    { to: userId }
                ]
            }).sort({ dateCreated: -1 });

            return friendRequests;

        } catch (error) {
            console.error("An error occurred while fetching friend requests:", error);
            throw new ValidationError([{ message: 'Unable to fetch friend requests' }]);
        }
    }

}
