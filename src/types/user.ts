export interface User {
  id: string;
  uid: string;
  email: string;
  role: Role;
  createdAt: Date;
  lastUpdated: Date;
}

export type Role = 'admin' | 'moderator' | 'user';