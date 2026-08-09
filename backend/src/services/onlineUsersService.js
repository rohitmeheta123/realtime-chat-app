// In-memory mappings for transient online user status
// socketToUserMap: socketId -> username
const socketToUserMap = new Map();

// userSocketsMap: username -> Set<socketId>
const userSocketsMap = new Map();

/**
 * Registers a socket connection for a username.
 * @param {string} socketId 
 * @param {string} username 
 * @returns {{ username: string|null, isNewUser: boolean }}
 */
export const addUser = (socketId, username) => {
  if (!socketId || !username) return { username: null, isNewUser: false };

  const trimmedUsername = username.trim();
  if (trimmedUsername.length === 0) return { username: null, isNewUser: false };

  const isNewUser = !userSocketsMap.has(trimmedUsername) || userSocketsMap.get(trimmedUsername).size === 0;

  // Map socketId -> username
  socketToUserMap.set(socketId, trimmedUsername);

  // Map username -> Set(socketId)
  if (!userSocketsMap.has(trimmedUsername)) {
    userSocketsMap.set(trimmedUsername, new Set());
  }
  userSocketsMap.get(trimmedUsername).add(socketId);

  return { username: trimmedUsername, isNewUser };
};

/**
 * Removes a socket connection for a user.
 * @param {string} socketId 
 * @returns {{ username: string|null, isUserOffline: boolean }}
 */
export const removeUser = (socketId) => {
  if (!socketToUserMap.has(socketId)) {
    return { username: null, isUserOffline: false };
  }

  const username = socketToUserMap.get(socketId);
  socketToUserMap.delete(socketId);

  let isUserOffline = false;
  if (userSocketsMap.has(username)) {
    const socketsSet = userSocketsMap.get(username);
    socketsSet.delete(socketId);

    if (socketsSet.size === 0) {
      userSocketsMap.delete(username);
      isUserOffline = true;
    }
  }

  return { username, isUserOffline };
};

/**
 * Returns an array of unique online usernames
 * @returns {string[]}
 */
export const getOnlineUsers = () => {
  return Array.from(userSocketsMap.keys());
};

/**
 * Returns total count of unique online users
 * @returns {number}
 */
export const getOnlineUserCount = () => {
  return userSocketsMap.size;
};

/**
 * Returns username for a given socketId
 * @param {string} socketId 
 * @returns {string|null}
 */
export const getUser = (socketId) => {
  return socketToUserMap.get(socketId) || null;
};
