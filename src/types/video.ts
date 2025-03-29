interface VideoType {
  id: string;
  username: string;
  description?: string;
  imageUrl?: string;
  videoUrl?: string;
}

type Pagination = {
  startIndex: number;
  limit: number;
};

export type {VideoType, Pagination};
