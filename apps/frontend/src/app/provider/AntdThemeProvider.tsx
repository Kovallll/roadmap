import { ReactNode } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';

import { colors } from '@/shared/styles/theme';

export const AntdThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        algorithm: antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: colors.primary,
          colorText: colors.primary,
          colorLink: colors.secondary,
          borderRadius: 8,
          fontFamily: 'Inter, sans-serif',
        },
        components: {
          Layout: {
            siderBg: colors.primary,
            headerBg: colors.primary,
            algorithm: true,
          },
          Input: {
            colorText: colors.primary,
          },
          Select: {
            colorText: colors.black,
          },
          InputNumber: {
            colorText: colors.primary,
          },
          Button: {
            colorText: colors.black,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
