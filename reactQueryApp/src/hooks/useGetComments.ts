import axios from "axios";
import { CommentResponse } from "../types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

// Function to fetch comments for a specific post from the server
const resultData = async (post_id: string): Promise<CommentResponse[]> => {
  const result = await axios.get<CommentResponse[]>(
    `http://localhost:5005/comments?post_id=${post_id}&_sort=id&_order=desc`
  );
  return result.data;
};

// Custom hook using React Query to fetch comments
const useGetComments = (post_id: string): UseQueryResult<CommentResponse[]> => {
  return useQuery({
    // Unique query key to help with caching and refetching
    queryKey: ["comments", { post_id: +post_id }],

    // Query function to fetch the data
    queryFn: () => resultData(post_id),
  });
};

export default useGetComments;
