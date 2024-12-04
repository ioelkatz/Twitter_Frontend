import { createSlice } from "@reduxjs/toolkit";

const tweetSlice = createSlice({
  name: "tweets",
  initialState: [],
  reducers: {
    getTweets(state, action) {
      return action.payload;
    },
    addRestLikes(state, action) {
      const { tweet, user } = action.payload;
      const currentTweet = state.find((t) => t._id === tweet._id);
      const alreadyLiked = currentTweet.likes.includes(user._id);
      if (alreadyLiked) {
        currentTweet.likes = currentTweet.likes.filter((id) => id !== user._id);
      } else {
        currentTweet.likes.push(user._id);
      }

      /* return state.map((tweet) => {
        if (tweet._id === action.payload.tweet._id) {
          if (tweet.likes.includes(action.payload.user._id)) {
            return {
              ...tweet,
              likes: tweet.likes.filter((id) => id !== action.payload.user._id),
            };
          } else {
            return {
              ...tweet,
              likes: [...tweet.likes, action.payload.user._id],
            };
          }
        }
        return tweet;
      }); */
    },
    createTweet(state, action) {
      state.push(action.payload);
    },
  },
});

const { actions, reducer } = tweetSlice;
export const { getTweets, addRestLikes, createTweet } = actions;
export default reducer;
