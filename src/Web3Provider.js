import React, { useContext, useState } from 'react';

const Web3Context = React.createContext();

export const useWeb3Context = () => useContext(Web3Context);

export const Web3Provider = ({children}) => {

    // TODO: contract and web3 initiation logic (account, assets, contracts etc)

    return (
        <Web3Context.Provider> 
            {children}
        </Web3Context.Provider>
    )

}