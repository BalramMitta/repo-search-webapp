import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  addRecentSearch,
  setSearchTerm,
  fetchRepos,
  incrementPage,
} from "../store/searchSlice";
import useDebounce from "./useDebounce";

const useSearch = () => {
  const dispatch: AppDispatch = useDispatch();
  const { repos, isLoading, error, hasMore, recentSearches, page, searchTerm } =
    useSelector((state: RootState) => state.search);

  const fetchData = useCallback(
    (query: string, page: number) => {
      dispatch(fetchRepos({ query, page }));
      dispatch(addRecentSearch(query));
    },
    [dispatch]
  );

  const fetchWithDebounce = useDebounce(fetchData, 500);

  useEffect(() => {
    if (searchTerm) {
      fetchWithDebounce(searchTerm, page);
    }
  }, [searchTerm, page, fetchWithDebounce]);

  const onSearch = useCallback(
    (query: string) => {
      dispatch(setSearchTerm(query));
    },
    [dispatch]
  );

  const fetchNextPage = useCallback(() => {
    dispatch(incrementPage());
  }, [dispatch]);

  return {
    searchTerm,
    repos,
    isLoading,
    error,
    hasMore,
    recentSearches,
    onSearch,
    fetchNextPage
  };
};

export default useSearch;
