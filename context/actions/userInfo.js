import { createSlice, createAsyncThunk } from 'react-redux';
import { getDoc, doc } from "firebase/firestore"; 
import { db } from "./firebase"; // import your Firebase instance

// Async thunk for fetching user info
export const fetchUserInfo = createAsyncThunk(
  'userInfo/fetchUserInfo',
  async (userId) => {
    const docRef = doc(db, 'users', userId); // replace 'users' with your collection name
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // handle the case where the doc data doesn't exist
      console.log('No such document!');
      return {};
    }
  }
);

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: { userInfo: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    });
  },
});

export default userInfoSlice.reducer;
export { fetchUserInfo };