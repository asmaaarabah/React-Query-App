export interface dataItem {
  id: number;
  title: string;
  body: string;
  status: "publish" | "draft" | "block";
  topRate: boolean;
}

export type postSelectedStatustype = "publish" | "draft" | "block" | "all";
