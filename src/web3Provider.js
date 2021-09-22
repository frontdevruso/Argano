import { message } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import Web3 from 'web3';
const Web3Context = React.createContext();

export const useWeb3Context = () => useContext(Web3Context);

export const Web3Provider = ({children}) => {

    const [web3, setWeb3] = useState(null);
    const [userAddress, setUserAddress] = useState(null);
    const [modal, setModal] = useState(false);
    const [isReadyConnected, setIsReadyConnected] = useState(false);

    useEffect(() => {

        if (!web3 && window.web3) {
            setWeb3(new Web3(window.web3.currentProvider))
        }

    }, []);

    useEffect(() => {

        if (web3 && !userAddress) {
            web3.eth.getAccounts().then((res) => setUserAddress(res[0]))
        }

        if (userAddress) {
            setModal(false);
        }

    }, [web3, userAddress])


    const disconnectWallet = () => {

        setWeb3(null);
        setUserAddress(null);
        setModal(true);        
    }


    const initWeb3 = async (providerName) => {  
        switch (providerName) {
          case "MetaMask":

            try {
                if (window.ethereum) {
                    message.loading({className: "ant-argano-message",content: "Connecting your wallet", key: "wallet", duration: 999999});
                    window.web3 = new Web3(window.ethereum)
                    await window.ethereum.enable();
                    setWeb3(window.web3);
                  }
                  return null
            }
            catch (e) {
                console.log(e);
            }
            finally {
                message.success({className: "ant-argano-message", content: "Connected successfully", key: "wallet", duration: 3})
            }      
          default:
            console.log(`Unsupported wallet: ${providerName}`)
            return undefined
        }
      }

    const providerValues = {
          modal,
          setModal,
          web3,
          initWeb3,
          disconnectWallet,
          userAddress,
    }


    return (
        <Web3Context.Provider value={providerValues}> 
            {children}
        </Web3Context.Provider>
    )

}