import { useState, useEffect, useRef } from "react";
import { Repo } from "../../types/common";

type ItemRenderer = (item: Repo) => JSX.Element;

interface InfiniteScrollProps {
  data: Repo[];
  itemsPerView: number;
  itemHeight: number;
  hasMore: boolean;
  fetchMoreData: () => void;
  itemRenderer: ItemRenderer;
  role?: string;
  ariaLive?: "polite" | "assertive" | "off";
}

const InfiniteScroll = ({
  data,
  hasMore,
  fetchMoreData,
  itemRenderer,
  itemHeight,
  itemsPerView,
  role = 'list', 
  ariaLive = 'polite'
}: InfiniteScrollProps) => {
  const [isLoading, setIsLoading] = useState(false);

  // Ref for the sentinel element
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Calculate initial container height (based on pageSize and itemHeight)
  const containerHeight = itemsPerView * itemHeight;

  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting && !isLoading) {
        setIsLoading(true);
        fetchMoreData();
      }
    });

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    // Cleanup on unmount
    return () => observer.disconnect();
  }, [isLoading, fetchMoreData]);

  return (
    <div
      className="infinite-scroll-container"
      role={role}
      aria-live={ariaLive}
      style={{ maxHeight: containerHeight + "px" }}
    >
      {data.map(itemRenderer)}
      {hasMore && (
        <div ref={sentinelRef} className="sentinel">
          {isLoading && <p className="p-3">Loading...</p>}
        </div>
      )}
    </div>
  );
};

export default InfiniteScroll;
