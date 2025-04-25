export interface dataItem {
  id: number;
  title: string;
  body: string;
  status: "publish" | "draft" | "block";
  topRate: boolean;
}

export type postSelectedStatustype = "publish" | "draft" | "block" | "all";
export interface CommentPost {
  body: string;

  post_id: number;
}

export interface CommentResponse {
  id: number;
  body: string;
  post_id: number;
}
