import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Skeleton from "react-loading-skeleton";

const useInfinityScrollWithSkeleton = (
  fetchDataCallback,
  initialPage = 1,
  pageSize = 10
) => {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(initialPage);

  const loadMoreData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const newData = await fetchDataCallback(page, pageSize);

      if (newData.length === 0) {
        setHasMore(false);
      } else {
        setData((prevData) => [...prevData, ...newData]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error loading more data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load initial data
    loadMoreData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    data,
    loading,
    loadMoreData,
    hasMore,
    InfiniteScrollComponent: ({ children }) => (
      <InfiniteScroll
        pageStart={initialPage}
        loadMore={loadMoreData}
        hasMore={hasMore}
        loader={<Skeleton count={5} />}
      >
        {children}
      </InfiniteScroll>
    ),
  };
};

export default useInfinityScrollWithSkeleton;
