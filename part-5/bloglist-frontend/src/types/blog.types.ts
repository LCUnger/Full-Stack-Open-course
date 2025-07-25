export interface BlogType {
  title: string;
  author: string;
  url: string;
  likes: number;
  user: {
    _id: string
    username: string
    name: string
  }
  id: string
}