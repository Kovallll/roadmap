export type UserWithPassword = {
  id: string;
  password: string;
  username: string;
  avatar: string | null;
  theme: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type User = Omit<UserWithPassword, 'password'>;

export type Theme = 'light' | 'dark';
