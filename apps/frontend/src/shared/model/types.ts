import { NodeProps } from '@xyflow/react';

export type BaseNodeProps = {
  nodeProps: NodeProps;
  className?: string;
  children?: React.ReactNode;
};

export type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (access: string, refresh: string) => void;
  logout: () => void;
};

export type ListItem = { id: string; label: string };

export type TextAreaProps = {
  data?: Record<string, unknown>;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export type ApiResponseError = {
  statusCode: number;
  message: string;
};
