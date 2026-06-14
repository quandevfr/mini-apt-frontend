export interface User {
  _id: string;
  username: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  phone?: string;
  roles: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface UserRes {
  user: User;
}
