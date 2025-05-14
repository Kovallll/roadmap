import { createContext } from 'react';

import { DropDownContextType } from '../types';

export const DropDownContext = createContext<DropDownContextType | null>(null);
