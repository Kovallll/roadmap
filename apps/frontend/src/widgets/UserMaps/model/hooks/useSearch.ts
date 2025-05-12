import { useState } from 'react';

import { Canvas } from '@roadmap/canvas/types';

export const useSearch = (canvasList: Canvas[]) => {
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const searchedCanvases = canvasList.filter((canvas) =>
    canvas.title.toLowerCase().includes(search.toLowerCase())
  );

  return { handleSearch, search, searchedCanvases };
};
