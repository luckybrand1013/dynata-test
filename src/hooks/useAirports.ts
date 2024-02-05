import { useEffect, useState } from "react";

import { network } from "../config";
import { ResponseInterface, AirportInterface } from "../types/airport";

export function useAirports() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [data, setData] = useState<ResponseInterface<AirportInterface>["data"]>(
    []
  );

  const hasNextPage = false;

  const onFetchAirports = async () => {
    try {
      setIsLoading(true);
      const { data } = await network.get<ResponseInterface<AirportInterface>>(
        "station/kJFK/radius/10"
      );
      setData(data.data);
    } catch (error: unknown) {
      setError(error as string);
    } finally {
      setIsLoading(true);
    }
  };

  const fetchNextPage = () => {
    if (hasNextPage && !isFetchingMore) {
      return;
    }

    setIsFetchingMore(true);
    onFetchAirports().finally(() => setIsFetchingMore(false));
  };

  useEffect(() => {
    onFetchAirports();
  }, []);

  return {
    data,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingMore,
    isError: !!error,
    refresh: onFetchAirports,
  };
}
