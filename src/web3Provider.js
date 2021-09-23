import { message } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
// ABI's
import AGO_ABI from './abi/AGO.json';
import AGOUSD_ABI from './abi/AGOUSD.json';
import CNUSD_ABI from './abi/CNUSD.json';
import AGOBTC_ABI from './abi/AGOBTC.json';
import CNBTC_ABI from './abi/CNBTC.json';
// ADDRESSES
import { AGO_ADDRESS } from './constants';
import { AGOUSD_ADDRESS } from './constants';
import { CNUSD_ADDRESS } from './constants';
import { AGOBTC_ADDRESS } from './constants';
import { CNBTC_ADDRESS } from './constants';
import { formatFromDecimal, getCoinGeckoCurrentPrice } from './utils/helpers';

const Web3Context = React.createContext();

export const useWeb3Context = () => useContext(Web3Context);

export const Web3Provider = ({children}) => {

    const [web3, setWeb3] = useState(null);
    const [userAddress, setUserAddress] = useState(null);
    const [modal, setModal] = useState(false);
    const [isReadyConnected, setIsReadyConnected] = useState(false);
    const [contractInstances, setContractInstances] = useState(null)
    const [userAssets, setUserAssets] = useState(null);

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
            setInstances()
            setModal(false);
        }

    }, [web3, userAddress])


    const disconnectWallet = () => {

        setWeb3(null);
        setUserAssets(null);
        setUserAddress(null);
        setModal(true);        
    }

    const setInstances = async () => {

        const ago = new web3.eth.Contract(AGO_ABI, AGO_ADDRESS);
        const agousd = new web3.eth.Contract(AGOUSD_ABI, AGOUSD_ADDRESS);
        const cnusd = new web3.eth.Contract(CNUSD_ABI, CNUSD_ADDRESS);
        const agobtc = new web3.eth.Contract(AGOBTC_ABI, AGOBTC_ADDRESS);
        const cnbtc = new web3.eth.Contract(CNBTC_ABI, CNBTC_ADDRESS);

        setContractInstances({ago, agousd, cnusd, agobtc, cnbtc})

        const agoBalance = formatFromDecimal(await ago.methods.balanceOf(userAddress).call(), await ago.methods.decimals().call());
        const agousdBalance = formatFromDecimal(await agousd.methods.balanceOf(userAddress).call(), await agousd.methods.decimals().call())
        const cnusdBalance = formatFromDecimal(await cnusd.methods.balanceOf(userAddress).call(), await cnusd.methods.decimals().call())
        const agobtcBalance = formatFromDecimal(await agobtc.methods.balanceOf(userAddress).call(), await agobtc.methods.decimals().call())
        const cnbtcBalance = formatFromDecimal(await cnbtc.methods.balanceOf(userAddress).call(), await cnbtc.methods.decimals().call())

        // TODO: while we would listed on coingecko use our id's
        const agoMockUsdPrice = await getCoinGeckoCurrentPrice("quick");
        const agousdUsdPrice = await getCoinGeckoCurrentPrice("tether");
        const cnusdUsdPrice = await getCoinGeckoCurrentPrice("aave");
        const agobtcUsdPrice = await getCoinGeckoCurrentPrice("bitcoin");
        const cnbtcUsdPrice = await getCoinGeckoCurrentPrice("dai");

        setUserAssets([
            {name: "AGO", balance: agoBalance, usdBalance: agoMockUsdPrice * agoBalance},
            {name: "AGOUSD", balance: agousdBalance, usdBalance: agousdUsdPrice * agousdBalance},
            {name: "CNUSD", balance: cnusdBalance, usdBalance: cnusdUsdPrice * cnusdBalance},
            {name: "AGOBTC", balance: agobtcBalance, usdBalance: agobtcUsdPrice * agobtcBalance},
            {name: "CNBTC", balance: cnbtcBalance, usdBalance: cnbtcUsdPrice * cnbtcBalance},
        ])

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
          userAssets
    }


    return (
        <Web3Context.Provider value={providerValues}> 
            {children}
        </Web3Context.Provider>
    )

}