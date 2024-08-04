export const setRoomId = (roomId) => {
  localStorage.setItem("ROOM_ID", roomId);
};

export const getRoomId = () => {
  return localStorage.getItem("ROOM_ID");
};

export const removeRoomId = () => {
  localStorage.removeItem("ROOM_ID");
};
