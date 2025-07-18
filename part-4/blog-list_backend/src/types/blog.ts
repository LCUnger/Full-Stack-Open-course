export interface BlogType {
  title: string;
  author: string;
  url: string;
  likes: number;
  id?: string;
}

export interface DbBlogType extends BlogType, Document {}