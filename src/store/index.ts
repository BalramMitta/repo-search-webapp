import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import selectedRepoReducer from './selectedRepoSlice';

const store = configureStore({
  reducer: {
    search: searchReducer,
    selectedRepo: selectedRepoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;