import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Repo } from '../types/common';

interface SelectedRepoState {
  data: Repo | null;
}

const initialState: SelectedRepoState = {
  data: null,
};

const selectedRepoSlice = createSlice({
  name: 'selectedRepo',
  initialState,
  reducers: {
    selectRepo(state, action: PayloadAction<Repo>) {
      state.data = action.payload;
    },
    clearSelectedRepo(state) {
      state.data = null;
    },
  },
});

export const { selectRepo, clearSelectedRepo } = selectedRepoSlice.actions;

export default selectedRepoSlice.reducer;
