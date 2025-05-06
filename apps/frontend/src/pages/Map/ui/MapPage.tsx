import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import { MapHeader } from './MapHeader';

import { useCanvas } from '@/features/canvas/model';
import { RoutePath, useAuthStore, useCanvasStore } from '@/shared/model';
import { colors } from '@/shared/styles/theme';
import Canvas from '@/widgets/Canvas/ui/Canvas';

const MapPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const canvasId = id || '';

  const setIsEdit = useCanvasStore.use.setIsEdit();

  const accessToken = useAuthStore.use.accessToken();
  const token = searchParams.get('token');

  if (token && token !== accessToken) {
    navigate(`${RoutePath.MAP}/:id`);
    setIsEdit(false);
  }

  if (token) {
    setIsEdit(true);
  } else {
    setIsEdit(false);
  }

  const { data } = useCanvas(canvasId);
  const setCanvas = useCanvasStore.use.setCanvas();

  useEffect(() => {
    if (data) setCanvas(data);
  }, [data, setCanvas]);

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
