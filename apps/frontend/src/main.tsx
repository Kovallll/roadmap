import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';

import { ReactFlowProvider } from '@xyflow/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  </StrictMode>
);
