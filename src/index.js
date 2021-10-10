import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import { App } from './components/App/App';
import { Web3ReactProvider } from '@web3-react/core';
import {SystemProvider} from './systemProvider';
import './index.scss';

const getLibrary = (provider) => {
  const library = new Web3(provider)
  return library
}

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <SystemProvider>
        <App/>
      </SystemProvider>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

