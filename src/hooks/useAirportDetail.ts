import { useEffect, useState } from "react";

import { network } from "../config";
import { ResponseInterface, AirportDetailInterface } from "../types/airport";

export function useAirportDetail(icao: string = "KJFK") {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AirportDetailInterface | null>(null);

  const onFetchDetail = async () => {
    try {
      setIsLoading(true);
      const { data } = await network.get<
        ResponseInterface<AirportDetailInterface>
      >(`/metar/${icao}/decoded`);

      setData(data.data[0]);
    } catch (error: unknown) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    onFetchDetail();
  }, [icao]);

  return {
    data,
    error,
    isLoading,
    isError: !!error,
    refresh: onFetchDetail,
  };
}
