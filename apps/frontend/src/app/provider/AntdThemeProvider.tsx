import { ReactNode } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';

export const AntdThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        algorithm: antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: '#2c3144',
          colorText: '#2c3144',
          colorLink: '#f17900',
          borderRadius: 8,
          fontFamily: 'Inter, sans-serif',
        },
        components: {
          Layout: {
            siderBg: '#2c3144',
            headerBg: '#2c3144',
            algorithm: true,
          },
          Input: {
            colorText: '#2c3144',
          },
          Select: {
            colorText: '#000',
          },
          InputNumber: {
            colorText: '#2c3144',
          },
          Button: {
            colorText: '#000',
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
