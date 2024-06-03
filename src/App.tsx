import './App.css';
import React from 'react';
import SearchBox from './components/searchBox/SearchBox';
import RepoCard from './components/repoCard/RepoCard';

const App: React.FC = () => {
  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold text-center">GitHub Repository Search</h1>
      <SearchBox />
      <RepoCard />
    </div>
  );
};

export default App;
