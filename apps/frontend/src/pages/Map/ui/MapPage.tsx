import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import { MapHeader } from './MapHeader';

import { useCanvas } from '@/features/canvas/model';
import {
  RoutePath,
  useAuthStore,
  useCanvasStore,
  useSelectedNodeStore,
  useTheme,
} from '@/shared/model';
import Canvas from '@/widgets/Canvas/ui/Canvas';
import { useSelectedEdgeStore } from '@/widgets/EdgeSidebar/model';

const MapPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const canvasId = id || '';

  const { defaults } = useTheme();

  const setSelectedNode = useSelectedNodeStore.use.setSelectedNode();
  const setSelectedEdge = useSelectedEdgeStore.use.setSelectedEdge();
  const setIsEdit = useCanvasStore.use.setIsEdit();

  const refreshToken = useAuthStore.use.refreshToken();
  const token = searchParams.get('token');

  if (token && token !== refreshToken) {
    navigate(`${RoutePath.MAP}/${id}`);
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

    return () => {
      setSelectedNode(null);
      setSelectedEdge(null);
    };
  }, [data, setCanvas, setSelectedEdge, setSelectedNode]);

  if (!data) return null;

  return (
    <ConfigProvider
      theme={{
        token: {
          colorText: defaults.white,
        },
      }}
    >
      <MapHeader canvas={data} />
      <Canvas canvas={data} />
    </ConfigProvider>
  );
};

export default MapPage;
