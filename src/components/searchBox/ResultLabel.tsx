import React from "react";
import Icon from "../icon/Icon";

interface ResultLabelProps {
  icon?: string;
  label: string;
  onSelect: () => void;
}

const ResultLabel: React.FC<ResultLabelProps> = ({
  icon,
  label,
  onSelect,
}) => {
  const iconUrl = icon || "https://static-00.iconduck.com/assets.00/search-icon-2048x2048-cmujl7en.png"
  return (
    <li
      aria-label="Search Result"
      className="p-3 hover:bg-gray-100 cursor-pointer flex gap-x-4 items-center"
      onClick={onSelect}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSelect();
        }
      }}
    >
      <Icon url={iconUrl} />
      {label}
    </li>
  );
};

export default ResultLabel;
