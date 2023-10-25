import { useApi } from '../api/useApi';
import {
  getFriendRequests,
  acceptFriendRequest,
  rejectFriendRequest,
  sendFriendRequest,
} from '../services/friendService';

export const useGetFriendRequests = () => {
  const { request } = useApi();

  const fetchFriendRequests = async () => {
      try {
        const req = await getFriendRequests(request);
        const friendRequests = req.getData();

        if (!friendRequests) {
          console.log('Error fetching friend requests');
          return [];
        }

        return friendRequests;
      } catch (e) {
        throw e;
      }
  };


  return { fetchFriendRequests };
};

export const useAcceptFriendRequest = (friendId) => {
  const { request } = useApi();

  const acceptRequest = async (friendId) => {
    try {
      const res = await acceptFriendRequest(request, friendId);
      return res;
    } catch (e) {
      throw e;
    }
  };

  return { acceptRequest };
};

export const useRejectFriendRequest = () => {
  const { request } = useApi();

  const rejectRequest = async (friendId) => {
    try {
      const res = await rejectFriendRequest(request, friendId);
      return res;
    } catch (e) {
      throw e;
    }
  };

  return { rejectRequest };
};

export const useSendFriendRequest = () => {
  const { request } = useApi();

  const sendRequest = async (friendId) => {
    try {
      const res = await sendFriendRequest(request, friendId);
      return res;
    } catch (e) {
      throw e;
    }
  };

  return { sendRequest };
};

export const useRemoveFriend = () => {
  const { request } = useApi();

  const removeFriend = async (friendId) => {
    try {
      const res = await removeFriend(request, friendId);
      return res;
    } catch (e) {
      throw e;
    }
  };

  return { removeFriend };
};
