import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import logger from "../utils/logger";
import { Repo } from "../types/common";

const PAGE_SIZE = 8;

interface SearchResponse {
  total_count: number;
  items: Repo[];
}

interface SearchState {
  searchTerm: string;
  page: number;
  hasMore: boolean;
  repos: Repo[];
  recentSearches: string[];
  isLoading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  searchTerm: "",
  hasMore: false,
  page: 1,
  repos: [],
  recentSearches: [],
  isLoading: false,
  error: null,
};

export const fetchRepos = createAsyncThunk(
  "search/fetchRepos",
  async (params: { query: string; page: number }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=${params.query}&page=${params.page}&per_page=${PAGE_SIZE}`
      );
      return response.data;
    } catch (error) {
      logger.error("Request failed", error);
      return rejectWithValue("Request failed");
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.page = 1;
      state.repos = [];
      state.searchTerm = action.payload;
    },
    incrementPage(state) {
      state.page = state.page + 1;
    },
    addRecentSearch(state, action: PayloadAction<string>) {
      if (!state.recentSearches.includes(action.payload)) {
        state.recentSearches = [
          action.payload,
          ...state.recentSearches.slice(0, 2),
        ];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchRepos.fulfilled,
        (state, action: PayloadAction<SearchResponse>) => {
          state.isLoading = false;
          state.error = null;
          state.repos = [...state.repos, ...action.payload.items];
          if (action.payload.total_count > 100 && state.repos.length < 100) {
            state.hasMore = true;
          } else {
            state.repos = state.repos.slice(0, 100);
            state.hasMore = false;
          }
        }
      )
      .addCase(fetchRepos.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { addRecentSearch, setSearchTerm, incrementPage } =
  searchSlice.actions;

export default searchSlice.reducer;
