import { ReactNode } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';

import { colors, fontSizes } from '@/shared/styles/theme';

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
          fontSize: fontSizes.sm,
        },
        components: {
          Layout: {
            siderBg: colors.primary,
            headerBg: colors.primary,
            algorithm: true,
          },
          Drawer: {
            colorText: colors.black,
          },
          Input: {
            colorText: colors.primary,
          },

          InputNumber: {
            colorText: colors.primary,
          },
          Button: {
            colorText: colors.black,
          },
          Tabs: {
            itemActiveColor: colors.secondary,
            itemSelectedColor: colors.secondary,
            inkBarColor: colors.secondary,
            itemHoverColor: colors.secondary,
          },
          Divider: {
            colorSplit: colors.secondary,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
