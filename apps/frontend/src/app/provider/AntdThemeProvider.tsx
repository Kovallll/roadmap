import { ReactNode } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';

import { useTheme } from '@/shared/model';
import { fontSizes } from '@/shared/styles/theme';

export const AntdThemeProvider = ({ children }: { children: ReactNode }) => {
  const { colors, defaults } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm: antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: colors.altPrimary,
          colorLink: colors.secondary,
          borderRadius: 8,
          fontFamily: 'Inter, sans-serif',
          fontSize: fontSizes.sm,
          colorText: colors.contrPrimary,
        },
        components: {
          Layout: {
            siderBg: colors.primary,
            headerBg: colors.primary,
            algorithm: true,
            bodyBg: colors.altPrimary,
          },
          Select: {
            selectorBg: defaults.white,
            optionSelectedColor: defaults.black,
          },
          Typography: {
            colorText: colors.contrPrimary,
          },
          Form: {
            labelColor: colors.contrPrimary,
          },
          Menu: {
            itemSelectedBg: colors.altPrimary,
            colorBgContainer: colors.menu,
            colorBorder: colors.secondary,
            itemSelectedColor: colors.secondary,
          },
          Card: {
            colorBgContainer: colors.primary,
          },
          Drawer: {
            colorBgElevated: colors.primary,
          },
          Input: {
            colorBgContainer: defaults.white,
            colorText: defaults.black,
          },
          InputNumber: {
            colorText: defaults.black,
          },
          Button: {
            colorText: colors.contrPrimary,
            defaultHoverColor: colors.contrPrimary,
            defaultHoverBorderColor: colors.secondary,
            defaultHoverBg: colors.primary,
            defaultBg: colors.button,
            defaultActiveColor: colors.secondary,
            defaultActiveBg: colors.primary,
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
          Upload: {
            colorText: defaults.black,
          },
          Switch: {
            handleBg: colors.secondary,
            colorPrimary: colors.contrPrimary,
            colorPrimaryHover: colors.contrPrimary,
          },
          Modal: {
            contentBg: colors.primary,
            headerBg: colors.primary,
            titleColor: colors.contrPrimary,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
