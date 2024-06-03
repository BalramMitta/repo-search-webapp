import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import logger from '../utils/logger';
import { Repo } from '../types/common';

interface SearchState {
  searchTerm: string;
  repos: Repo[];
  recentSearches: string[];
  isLoading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  searchTerm: '',
  repos: [],
  recentSearches: [],
  isLoading: false,
  error: null,
};

export const fetchRepos = createAsyncThunk(
  'search/fetchRepos',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://api.github.com/search/repositories?q=${query}`);
      return response.data.items;
    } catch (error) {
      logger.error('Request failed', error);
      return rejectWithValue('Request failed');
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    addRecentSearch(state, action: PayloadAction<string>) {
      if (!state.recentSearches.includes(action.payload)) {
        state.recentSearches = [action.payload, ...state.recentSearches.slice(0, 2)];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.repos = [];
      })
      .addCase(fetchRepos.fulfilled, (state, action: PayloadAction<Repo[]>) => {
        state.isLoading = false;
        state.error = null;
        state.repos = action.payload;
      })
      .addCase(fetchRepos.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { addRecentSearch, setSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;
