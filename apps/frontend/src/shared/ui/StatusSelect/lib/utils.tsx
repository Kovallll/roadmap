import { Typography } from 'antd';

import { nodeStatuses } from '@/shared/lib';

export const getStyledLabel = (value: string, color?: string) => (
  <Typography.Text
    style={{
      color: color || nodeStatuses.find((s) => s.value === value)?.color,
    }}
  >
    {value}
  </Typography.Text>
);
