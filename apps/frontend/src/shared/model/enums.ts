export enum LOCAL_STORAGE {
  REFRESH_TOKEN = 'refresh_token',
  ACCESS_TOKEN = 'access_token',
  THEME = 'theme',
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

export enum AlignTypes {
  START = 'start',
  CENTER = 'center',
  END = 'end',
}

export enum ETheme {
  LIGHT = 'light',
  DARK = 'dark',
}
