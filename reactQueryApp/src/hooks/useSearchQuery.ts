import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { dataItem } from "../types";

const fetchData = async (q: string): Promise<dataItem> => {
  const response = await axios.get(`http://localhost:5005/posts?q=${q}`);
  console.log("API Response:", response.data); // Log API response
  return response.data;
};
const useSearchQuery = (q: string): UseQueryResult<dataItem[]> => {
  return useQuery({
    queryKey: ["posts", "search", { q }],
    queryFn: () => fetchData(q),
    staleTime: 1000 * 60 * 5,
    enabled: q.length > 0,
  });
};
export default useSearchQuery;
