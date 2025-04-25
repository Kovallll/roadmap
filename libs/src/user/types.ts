export type UserWithPassword = {
  id: string;
  password: string;
  username: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type User = Omit<UserWithPassword, 'password'>;
