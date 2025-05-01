export type UserWithPassword = {
  id: string;
  password: string;
  username: string;
  avatar: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export type User = Omit<UserWithPassword, 'password'>;
