import React from 'react';

interface AsyncWrapperProps {
  isLoading: boolean;
  isEmpty?: boolean;
  error: string | null;
  children: any;
}

const AsyncWrapper: React.FC<AsyncWrapperProps> = ({ isLoading, isEmpty, error, children }) => {
  if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  if (isEmpty) {
    return <div>No results</div>; 
  }

  return <>{children}</>;
};

export default AsyncWrapper;
