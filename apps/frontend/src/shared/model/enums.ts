export enum LOCAL_STORAGE {
  REFRESH_TOKEN = 'refresh_token',
  ACCESS_TOKEN = 'access_token',
}

export enum RoutePath {
  ROOT = '/',
  MAP = '/map',
  PROFILE = '/profile',
  LOGIN = '/login',
  REGISTER = '/register',
  NOT_FOUND = '*',
}

export enum NodeStatus {
  DONE = 'Done',
  IN_PROGRESS = 'In Progress',
  PENDING = 'Pending',
  CLOSE = 'Close',
}
