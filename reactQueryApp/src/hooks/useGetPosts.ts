import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { dataItem, postSelectedStatustype } from "../types/posts";
const fetchPosts = async (
  selectedPostStatus: postSelectedStatustype,
  paginate: number
): Promise<dataItem[]> => {
  if (selectedPostStatus === "all") {
    const result = await axios.get<dataItem[]>(
      `http://localhost:5005/posts?_page=${paginate}&_limit=5`
    );
    return result.data;
  } else {
    const result = await axios.get<dataItem[]>(
      `http://localhost:5005/posts?status=${selectedPostStatus}`
    );
    return result.data;
  }
};

const useGetPosts = (
  selectedPostStatus: postSelectedStatustype,
  paginate: number
): UseQueryResult<dataItem[]> => {
  const query = useQuery({
    queryKey: ["posts", { selectedPostStatus }, paginate],
    queryFn: () => fetchPosts(selectedPostStatus, paginate),
    staleTime: 1000 * 60 * 1,
    refetchInterval: 1000 * 60 * 2,
    //it means data will updated every 15s
  });
  return query;
};
export default useGetPosts;
