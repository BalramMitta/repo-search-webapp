import React, { useCallback, useRef, useState } from "react";
import useSearch from "../../hooks/useSearch";
import useSelectedRepo from "../../hooks/useSelectedRepo";
import { Repo } from "../../types/common";
import SearchItem from "./SearchItem";
import ResultLabel from "./ResultLabel";
import AsyncWrapper from "../asyncWrapper/AsyncWrapper";
import InfiniteScroll from "../infiniteScroll/InfiniteScroll";

const SearchBox: React.FC = () => {
  const containerRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const {
    searchTerm,
    repos,
    isLoading,
    error,
    recentSearches,
    hasMore,
    fetchNextPage,
    onSearch,
  } = useSearch();
  const { setSelectedRepo } = useSelectedRepo();

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
    if (!containerRef.current?.contains(event.relatedTarget)) {
      setIsSearchFocused(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const onSearchfocus = () => {
    setIsSearchFocused(true);
  };

  const handleSelectRepo = useCallback(
    (repo: Repo) => {
      onSearch("");
      setIsSearchFocused(false);
      setSelectedRepo(repo);
    },
    [onSearch, setSelectedRepo]
  );

  const handleSelectSuggestion = (query: string) => {
    onSearch(query);
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-10 relative">
      <input
        ref={inputRef}
        type="text"
        className="w-full p-3 border border-gray-300 rounded-lg"
        placeholder="Search for GitHub repositories..."
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={onSearchfocus}
        onBlur={handleBlur}
        aria-label="Search for GitHub repositories"
      />
      {isSearchFocused &&
        (searchTerm.length > 0 || recentSearches.length > 0) && (
          <ul
            ref={containerRef}
            className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-64 overflow-y-auto z-10"
          >
            {searchTerm.length > 0 ? (
              <AsyncWrapper
                isLoading={isLoading && repos.length === 0}
                isEmpty={repos.length === 0}
                error={error}
              >
                <InfiniteScroll
                  data={repos}
                  hasMore={hasMore}
                  itemHeight={100}
                  itemsPerView={8}
                  fetchMoreData={fetchNextPage}
                  itemRenderer={(repo) => (
                    <SearchItem
                      key={repo.id}
                      repo={repo}
                      onSelect={handleSelectRepo}
                    />
                  )}
                />
              </AsyncWrapper>
            ) : (
              recentSearches.map((recent, index) => (
                <ResultLabel
                  label={recent}
                  key={index}
                  onSelect={() => handleSelectSuggestion(recent)}
                />
              ))
            )}
          </ul>
        )}
    </div>
  );
};

export default SearchBox;
