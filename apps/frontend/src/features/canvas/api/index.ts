import { Canvas, CanvasData, CreateCanvasDto } from '@roadmap/canvas/types';

import { API_URL } from './constants';
import { axiosInstance } from '@/app/api/axiosInstance';

export const getUserCanvasById = async (id: string) => {
  const { data } = await axiosInstance.get<Canvas>(`${API_URL}/${id}`);
  return data;
};

export const getUserCanvases = async (userId: string) => {
  const { data } = await axiosInstance.get<Canvas[]>(
    `${API_URL}/user/${userId}`
  );
  return data;
};

export const saveCanvas = async (id: string, canvasData: CanvasData) => {
  const { data } = await axiosInstance.patch<Canvas>(`${API_URL}/${id}`, {
    data: canvasData,
  });
  return data;
};

export const createCanvas = async (canvas: CreateCanvasDto) => {
  const { data } = await axiosInstance.post<CreateCanvasDto>(
    `${API_URL}`,
    canvas
  );
  return data;
};
