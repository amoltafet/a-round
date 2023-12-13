import { createSlice } from '@reduxjs/toolkit';

const nearbyUsersSlice = createSlice({
  name: 'nearbyUsers',
  initialState: [],
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    removeUser: (state, action) => {
      return state.filter(user => user.id !== action.payload.id);
    },
  },
});

export const { addUser, removeUser } = nearbyUsersSlice.actions;

export default nearbyUsersSlice.reducer;