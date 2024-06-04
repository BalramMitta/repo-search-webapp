import React, { useCallback, useState } from "react";
import useSearch from "../../hooks/useSearch";
import useSelectedRepo from "../../hooks/useSelectedRepo";
import { Repo } from "../../types/common";
import SearchItem from "./SearchItem";
import ResultLabel from "./ResultLabel";
import AsyncWrapper from "../asyncWrapper/AsyncWrapper";
import InfiniteScroll from "../infiniteScroll/InfiniteScroll";

const SearchBox: React.FC = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const { searchTerm, repos, isLoading, error, recentSearches, hasMore, fetchNextPage, onSearch } =
    useSearch();
  const { setSelectedRepo } = useSelectedRepo();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const toggleFocus = () => {
    setIsSearchFocused((prevState) => !prevState);
  };

  const handleSelectRepo = useCallback(
    (repo: Repo) => {
      onSearch("");
      setIsSearchFocused(false);
      setSelectedRepo(repo);
    },
    [onSearch, setSelectedRepo]
  );

  return (
    <div className="w-full max-w-xl mx-auto mt-10 relative">
      <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded-lg"
        placeholder="Search for GitHub repositories..."
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={toggleFocus}
        onBlur={toggleFocus}
        aria-label="Search for GitHub repositories"
      />
      {isSearchFocused && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-64 overflow-y-auto z-10">
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
                onSelect={() => onSearch(recent)}
              />
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
