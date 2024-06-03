import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const RepoCard: React.FC = () => {
  const selectedRepo = useSelector((state: RootState) => state.selectedRepo.data);

  if (!selectedRepo) return null;

  return (
    <div className="mt-5 p-5 border border-gray-300 rounded-lg">
      <h2 className="text-xl font-bold">{selectedRepo.name}</h2>
      <p className="mt-2">{selectedRepo.description}</p>
      <a
        href={selectedRepo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline mt-3 block"
      >
        View Repository
      </a>
      <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg">
        Deploy
      </button>
    </div>
  );
};

export default RepoCard;
