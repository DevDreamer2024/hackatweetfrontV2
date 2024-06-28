import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: [],
};

export const likedTweetSlice = createSlice({
    name: 'likedTweets',
    initialState,
    reducers: {
        addLikedTweetToStore: (state, action) => {

        }
    },
});

export const { addLikedTweetToStore } = likedTweetSlice.actions;
export default likedTweetSlice.reducer;
