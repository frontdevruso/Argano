import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch}  from "react-router-dom";
import Web3 from "web3";
import {WalletModal} from "../WalletModal/wallet_modal";
// Pages
import Home from '../Home/home';
import Dashboard from "../Dashboard/dashboard";
import MintRedeem from "../MintRedeem/mint_redeem";

import './App.scss';

export const ThemeContext = React.createContext({
    theme: 'dark',
    setTheme: () => {}
})

export const Web3Context = React.createContext({
    web3: null,
    setWeb3: () => {},
    modal: true,
    setModal: () => {}

})
export const App = () => {

    const provider = window.ethereum;

    // Theme provider consumer
    const [theme, setTheme] = useState("dark")
    const themeProviderValue = {theme, setTheme};

    // Web3 provider consumer
    const [web3, setWeb3] = useState(null);
    const [modal, setModal] = useState(false);
    const web3ProviderValue = {web3, setWeb3, modal, setModal};

    return (
        <Web3Context.Provider value={web3ProviderValue}>
            <ThemeContext.Provider value={themeProviderValue}>
                <Router>
                    <Switch>
                        <Route path="/" exact>
                            <Home/>
                        </Route>
                        <Route path="/dashboard" exact>
                            <Dashboard/>
                        </Route>
                        <Route path="/mint-redeem" exact>
                            <MintRedeem/>
                        </Route>
                        {/*<Route path="/liqudity-pools" exact>*/}
                        {/*    <NewLiquidityPools/>*/}
                        {/*</Route>*/}
                        {/*<Route path="/trading" exact>*/}
                        {/*    <Trading/>*/}
                        {/*</Route>*/}
                        {/*<Route path="/staking" exact>*/}
                        {/*    <StakingRewards/>*/}
                        {/*</Route>*/}
                        {/*<Route path="/account" exact>*/}
                        {/*    <Account/>*/}
                        {/*</Route>*/}
                    </Switch>
                </Router>
                <WalletModal/>
            </ThemeContext.Provider>
        </Web3Context.Provider>

    )

}