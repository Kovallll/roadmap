import { Canvas, CreateCanvasDto } from '@roadmap/canvas/types';

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

export const saveCanvas = async (canvas: Canvas) => {
  const { data } = await axiosInstance.patch<Canvas>(
    `${API_URL}/${canvas.id}`,
    canvas
  );
  return data;
};

export const createCanvas = async (canvas: CreateCanvasDto) => {
  const { data } = await axiosInstance.post<CreateCanvasDto>(
    `${API_URL}`,
    canvas
  );
  return data;
};

export const deleteCanvas = async (canvasId: Canvas['id']) => {
  const { data } = await axiosInstance.delete<CreateCanvasDto>(
    `${API_URL}/${canvasId}`
  );
  return data;
};
