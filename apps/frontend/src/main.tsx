import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';

import { ReactFlowProvider } from '@xyflow/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <ReactFlowProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReactFlowProvider>
  </StrictMode>
);
