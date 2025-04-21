import {
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import axios from "axios";
import { dataItem } from "../types/posts";

const fetchData = async (id: string): Promise<dataItem> => {
  const response = await axios.get<dataItem>(
    `http://localhost:5005/posts/${id}`
  );
  return response.data;
};

const useGetPost = (
  id: string,
  paramType: string,
  paramKey: string
): UseQueryResult<dataItem> => {
  const queryClient = useQueryClient();

  let getCashedData: dataItem[] | undefined;

  if (paramType === "paginate") {
    getCashedData = queryClient.getQueryData([
      "posts",
      { paginate: +paramKey, selectedPostStatus: "all" },
    ]);
  } else {
    getCashedData = queryClient.getQueryData([
      "posts",
      "search",
      { q: paramKey },
    ]);
  }
  console.log(getCashedData);

  return useQuery({
    queryKey: ["post", { id: +id }],
    queryFn: () => fetchData(id),
    initialData: () => {
      if (!getCashedData) {
        return undefined;
      } else {
        const result = getCashedData.find((el) => el.id === +id);
        console.log(result);
        return result;
      }
    },
  });
};

export default useGetPost;
