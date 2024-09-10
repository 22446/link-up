export interface Ipost {
  _id: string;
  body?: string;
  image?: string;
  user: User;
  createdAt: string;
  comments: Comment[];
  id: string;
}

interface Comment {
  _id: string;
  content: string;
  commentCreator: User;
  post: string;
  createdAt: string;
}

interface User {
  _id: string;
  name: string;
  photo: string;
}
export interface RootObject {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
  total: number;
}