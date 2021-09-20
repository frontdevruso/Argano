import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { App } from './components/App/App';
import {Web3Provider} from './Web3Provider';

ReactDOM.render(
  <React.StrictMode>
      <Web3Provider>
          <App />
      </Web3Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

