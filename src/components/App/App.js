import React, {useState, createContext, useEffect} from 'react'
import {BrowserRouter as Router, Route, Switch}  from "react-router-dom"
import {WalletModal} from "../WalletModal/wallet_modal"
import {
    isMobile
} from "react-device-detect";

// Pages
import Dashboard from '../Dashboard/dashboard';
import MintRedeem from '../MintRedeem/mint_redeem';
import { StakingRewards } from '../StakingRewards/staking-rewards';
import LiquidityPools from '../LiquidityPools/liquidity-pools';
import { Trading } from '../Trading/trading';
import './App.scss';

import {blockClient} from "../../api/clients";
import {TEST_CACHE} from "../../api/queries";
import ago_logo from '../../assets/icons/ago-logo.svg'
import gql from "graphql-tag";
import { Layout } from '../Layout/layout';
import { Accounts } from '../Accounts/accounts';
import { Web3Provider } from '../../web3Provider';
import 'antd/dist/antd.css';

export const ThemeContext = createContext({
    theme: 'dark',
    setTheme: () => {},
    sideBarMountedOneTime: false,
    setSideBarMountedOneTime: () => {}
})

export const Web3Context = createContext({
    web3: null,
    setWeb3: () => {},
    modal: true,
    setModal: () => {}
})


const MobileWarning = () => {

    return (
        <div className='mobile-wrapper'> 
            <img src={ago_logo}/>
            <h1> Functionality is not available in mobile please use desktop version! </h1>
        </div>
    )

}

export const App = () => {

    // Theme provider consumer
    const [theme, setTheme] = useState("dark")
    const [sideBarMountedOneTime, setSideBarMountedOneTime] = useState(false);
    const themeProviderValue = {theme, setTheme, sideBarMountedOneTime, setSideBarMountedOneTime}

    return (

        // TODO: Leave it until production
        // <>
        // {isMobile ? <MobileWarning/> : 

        // }
        // </>
        // <Web3Context.Provider value={web3ProviderValue}>
        <Web3Provider>
            <ThemeContext.Provider value={themeProviderValue}>
                <Router>
                    <Layout>
                        <Switch>
                            <Route path="/dashboard" component={Dashboard} exact/>
                            <Route path="/mint-redeem" component={MintRedeem} exact/>
                            <Route path="/staking" component={StakingRewards} exact/>
                            <Route path="/liqudity-pools" component={LiquidityPools} exact/>
                            <Route path="/trading" component={Trading} exact/>
                            <Route path="/accounts" component={Accounts} exact/>
                    </Switch>
                    </Layout>
                </Router>
                <WalletModal/>
            </ThemeContext.Provider>
        </Web3Provider>
    )
}