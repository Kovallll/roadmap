import { useParams } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import { MapHeader } from './MapHeader';

import { useCanvas } from '@/features/canvas/model';
import { colors } from '@/shared/styles/theme';
import Canvas from '@/widgets/Canvas/ui/Canvas';

const MapPage = () => {
  const { id } = useParams();
  const canvasId = id || '';

  const { data } = useCanvas(canvasId);

  if (!data) return null;

  return (
    <ConfigProvider
      theme={{
        token: {
          colorText: colors.white,
        },
      }}
    >
      <MapHeader canvas={data} />
      <Canvas canvas={data} />
    </ConfigProvider>
  );
};

export default MapPage;
