export interface BlogType {
  title: string;
  author: string;
  url: string;
  likes: number;
}

export interface DbBlogType extends BlogType, Document {}