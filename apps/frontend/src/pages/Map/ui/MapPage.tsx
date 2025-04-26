import { useParams } from 'react-router-dom';

import { MapHeader } from './MapHeader';

import { useCanvas } from '@/features/canvas/model';
import Canvas from '@/widgets/Canvas/ui/Canvas';

const MapPage = () => {
  const { id } = useParams();
  const canvasId = id || '';

  const { data } = useCanvas(canvasId);

  if (!data) return null;

  return (
    <>
      <MapHeader canvas={data} />
      <Canvas canvas={data} />
    </>
  );
};

export default MapPage;
