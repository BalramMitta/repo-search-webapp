import React from 'react';
import { Repo } from '../../types/common';
import ResultLabel from './ResultLabel';

interface SearchItemProps {
  repo: Repo;
  onSelect: (repo: Repo) => void;
}

const SearchItem: React.FC<SearchItemProps> = ({ repo, onSelect }) => {

  const handleSelect = () => {
    onSelect(repo)
  };

  return <ResultLabel label={repo.name} onSelect={handleSelect} />;
};

export default SearchItem;
