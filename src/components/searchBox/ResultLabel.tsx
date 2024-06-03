import React from 'react';

interface ResultLabelProps {
  label: string;
  onSelect: () => void;
}

const ResultLabel: React.FC<ResultLabelProps> = ({ label, onSelect }) => {
  return (
    <li
      className="p-3 hover:bg-gray-100 cursor-pointer"
      onClick={onSelect}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
            onSelect();
        }
      }}
    >
      {label}
    </li>
  );
};

export default ResultLabel;
