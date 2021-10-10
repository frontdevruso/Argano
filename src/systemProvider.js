import React, { useContext, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { NoEthereumProviderError, UserRejectedRequestError } from '@web3-react/injected-connector';
import { metaMask, network } from './constants';
import ERC20_ABI from './abi/ERC20.json';
import TREASURY_ABI from './abi/TREASURY.json';
import STABLE_ABI from './abi/STABLE.json';
import SHARE_ABI from './abi/SHARE.json';
import STABLE_POOL_ABI from './abi/STABLE_POOL.json';

import { CONTRACT_ADRESESS, MOCK_PRICE_ADDRESS, USD_PRICE_ENDPOINT } from './constants';
import { formatFromDecimal } from './utils/helpers';


const SystemContext = React.createContext();
export const useSystemContext = () => useContext(SystemContext);

export const SystemProvider = ({children}) => {

    const [theme, setTheme] = useState("dark");

    const [mintRedeemCurrency, setMintRedeemCurrency] = useState("AGOUSD");
    const [mintRedeemCurrencyModal, setMintRedeemCurrencyModal] = useState(false);

    const [tokens, setTokens] = useState(null);
    const [contracts, setContracts] = useState(null);

    const [userProtfolio, setUserPortfolio] = useState(null);
    const [isWalletModal, setIsWalletModal] = useState(false);
    const {account, activate, active, library, deactivate} = useWeb3React();

    const hook = useWeb3React();

    console.log(hook);

    useEffect(() => {
        metaMask.isAuthorized()
        .then((res) => {
            if (res) {
                activate(metaMask);
            }
            else {
                activate(network);
            }
        })

    }, [])

    useEffect(() => {

        if (library && !tokens && !contracts) {
            initTokens();
            initContracts();
        }
        else if (tokens && account) {
            getUserPortfolio();
        }

    }, [active, library, tokens, account]);


    const initTokens = async () => {

        const AGO = new library.eth.Contract(ERC20_ABI, CONTRACT_ADRESESS.AGO);
        const AGOUSD = new library.eth.Contract(STABLE_ABI, CONTRACT_ADRESESS.AGOUSD);
        const AGOBTC = new library.eth.Contract(STABLE_ABI, CONTRACT_ADRESESS.AGOBTC);
        const CNUSD = new library.eth.Contract(SHARE_ABI, CONTRACT_ADRESESS.CNUSD);
        const CNBTC = new library.eth.Contract(SHARE_ABI, CONTRACT_ADRESESS.CNBTC);
        const USDT = new library.eth.Contract(ERC20_ABI, CONTRACT_ADRESESS.USDT);
        const WBTC = new library.eth.Contract(ERC20_ABI, CONTRACT_ADRESESS.WBTC)


        setTokens({
            AGO: {instance: AGO, decimals: await AGO.methods.decimals().call()},
            AGOUSD: {instance: AGOUSD, decimals: await AGOUSD.methods.decimals().call()},
            AGOBTC: {instance: AGOBTC, decimals: await AGOBTC.methods.decimals().call()},
            CNUSD: {instance: CNUSD, decimals: await CNUSD.methods.decimals().call()},
            CNBTC: {instance: CNBTC, decimals: await CNBTC.methods.decimals().call()},
            USDT: {instance: USDT, decimals: await USDT.methods.decimals().call()},
            WBTC: {instance: WBTC, decimals: await WBTC.methods.decimals().call()}
        });

    }

    const initContracts = () => {
        const POOL_AGOUSD = new library.eth.Contract(STABLE_POOL_ABI, CONTRACT_ADRESESS.POOL_AGOUSD);
        const TREASURY_AGOUSD = new library.eth.Contract(TREASURY_ABI, CONTRACT_ADRESESS.TREASURY_AGOUSD);
        const POOL_AGOBTC = new library.eth.Contract(STABLE_POOL_ABI, CONTRACT_ADRESESS.POOL_AGOBTC);
        setContracts({POOL_AGOUSD, TREASURY_AGOUSD, POOL_AGOBTC});
    }

    const connectWallet = (wallet) => {

        switch (wallet) {
            case "MetaMask":
                activate(metaMask);
                break;
            default: 
                activate(network)
                break;
        }
        setIsWalletModal(false)

    }

    const disconnectWallet = () => {
        deactivate();
        activate(network);
    }

    const getUserPortfolio = async () => {

        const balances = Object.entries(tokens).map(async (item) => {

            const usdBalance =  await (await fetch(USD_PRICE_ENDPOINT(MOCK_PRICE_ADDRESS[item[0]]))).json();  
            
            const obj = {
                name: item[0],
                userNativeBalance: await item[1].instance.methods.balanceOf(account).call(),
                decimals: await item[1].instance.methods.decimals().call()
            }

            obj.userNativeBalance = formatFromDecimal(obj.userNativeBalance, obj.decimals)  
            obj.userUsdBalance = parseInt(obj.userNativeBalance) * usdBalance[MOCK_PRICE_ADDRESS[item[0]]].usd

            return obj
        })

        setUserPortfolio(await Promise.all(balances));

    }

    const systemValue = {
        theme,
        setTheme,
        mintRedeemCurrencyModal,
        setMintRedeemCurrencyModal,
        mintRedeemCurrency,
        setMintRedeemCurrency,
        connectWallet,
        disconnectWallet,
        isWalletModal,
        setIsWalletModal,
        tokens,
        contracts,
        userProtfolio
    }

    return (
        <SystemContext.Provider value={systemValue}> 
            {children}
        </SystemContext.Provider>
    )
}