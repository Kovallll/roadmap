import { useParams } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import { MapHeader } from './MapHeader';

import { useCanvas } from '@/features/canvas/model';
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
          colorText: '#ffffff',
        },
      }}
    >
      <MapHeader canvas={data} />
      <Canvas canvas={data} />
    </ConfigProvider>
  );
};

export default MapPage;
