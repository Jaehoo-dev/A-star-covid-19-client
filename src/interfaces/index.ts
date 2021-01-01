export interface User {
  email: string;
}

export interface History {
  id: number;
  userEmail: string;
  coordinates: number[];
  createdAt: Date;
  updatedAt: Date;
}
