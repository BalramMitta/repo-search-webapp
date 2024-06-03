import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  addRecentSearch,
  setSearchTerm,
  fetchRepos,
} from "../store/searchSlice";
import useDebounce from "./useDebounce";

const useSearch = () => {
  const dispatch: AppDispatch = useDispatch();
  const { repos, isLoading, error, recentSearches, searchTerm } =
    useSelector((state: RootState) => state.search);

  const fetchData = useCallback(
    (query: string) => {
      dispatch(fetchRepos(query));
      dispatch(addRecentSearch(query));
    },
    [dispatch]
  );

  const fetchWithDebounce = useDebounce(fetchData, 500);

  const onSearch = useCallback(
    (query: string) => {
      dispatch(setSearchTerm(query));
      if (query) {
        console.log("trigger debounce");
        fetchWithDebounce(query);
      }
    },
    [dispatch, fetchWithDebounce]
  );

  return {
    searchTerm,
    repos,
    isLoading,
    error,
    recentSearches,
    onSearch,
  };
};

export default useSearch;
