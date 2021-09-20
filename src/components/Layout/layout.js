import React, { useContext, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import ago_icon from '../../assets/icons/ago-logo.svg';
import pig_icon from '../../assets/icons/pig-balances.svg';
import disconnect_icon from '../../assets/icons/plugging-plugs.svg';
import disconnect_icon_white from '../../assets/icons/plugging-plugs-white.svg';

import {ThemeContext, Web3Context} from '../App/App';
// Dark theme icons.
import dashboard_black from '../../assets/icons/nav-links/dark-theme/dashboard-black.svg';
import mint_redeem_black from '../../assets/icons/nav-links/dark-theme/mint-redeem-black.svg';
import staking_black from '../../assets/icons/nav-links/dark-theme/staking-black.svg';
import liquidity_pools_black from '../../assets/icons/nav-links/dark-theme/liquidity-pools-black.svg';
import trading_black from '../../assets/icons/nav-links/dark-theme/trading-black.svg';
import accounts_black from '../../assets/icons/nav-links/dark-theme/accounts-black.svg';
import comments_black from '../../assets/icons/nav-links/dark-theme/comment-black.svg';

// Light theme icons.

// Active icons.
import dashboard_active from '../../assets/icons/nav-links/active/dashboard-active.svg';
import mint_redeem_active from '../../assets/icons/nav-links/active/mint-redeem-active.svg';
import staking_active from '../../assets/icons/nav-links/active/staking-active.svg';
import liquidity_pools_active from '../../assets/icons/nav-links/active/liq-pools-active.svg';
import trading_active from '../../assets/icons/nav-links/active/trading-active.svg';
import accounts_acitve from '../../assets/icons/nav-links/active/accounts-active.svg';

import './layout.scss';
import { TokenIcon } from '../TokenIcon/token_icon';

export const Layout = ({children}) => {

    const history = useHistory();
    const {theme, setTheme} = useContext(ThemeContext);
    const {setModal} = useContext(Web3Context);
    const [themeChecked, setThemeChecked] = useState("night");
    const [expandSocMedias, setExpandSocMedias] = useState(false);
    const [activeTab, setActiveTab] = useState(history.location.pathname);
    const [balancesExpanded, setBalancesExpaned] = useState(false);
    const [connectWalletExpanded, setConnectWalletExpanded] = useState(false);
    const [mockWalletConnected, setMockWalletConnected] = useState(false);

    const pages = [
        {path: "/dashboard", img: dashboard_black, imgActive: dashboard_active},
        {path: "/mint-redeem", img: mint_redeem_black, imgActive: mint_redeem_active},
        {path: "/staking", img: staking_black, imgActive: staking_active},
        {path: "/liqudity-pools", img: liquidity_pools_black, imgActive: liquidity_pools_active},
        {path: "/trading", img: trading_black, imgActive: trading_active},
        {path: "/accounts", img: accounts_black, imgActive: accounts_acitve},
    ]

    const mockUserAssetsList = [
        {name: "AGO", value: 10, portfolioPrecente: 12.5, color: "#EF3725"},
        {name: "AGOUSD", value: 10, portfolioPrecente: 12.5, color: "blue"},
        {name: "AGOBTC", value: 10, portfolioPrecente: 12.5, color: "#EFBF14"},
        {name: "CNUSD", value: 10, portfolioPrecente: 12.5, color: "black"},
        {name: "CNBTC", value: 10, portfolioPrecente: 12.5, color: "green"},
        {name: "MATIC", value: 10, portfolioPrecente: 12.5, color: "violet"},
        {name: "USDT", value: 10, portfolioPrecente: 12.5, color: "gray"},
        // {name: "WBTC", value: 0.000001244423423, portfolioPrecente: 12.5, color: "blue"},
    ]

    return (
        <div className={`layout-wrapper ${theme === "light" ? "layout-light" : ""}`}> 
            <div className='layout-wrapper__sidebar'> 
                <img src={ago_icon} width={47} height={42}/>
                <ul> 
                    <div onMouseEnter={() => setExpandSocMedias(true)} onMouseLeave={() => setExpandSocMedias(false)} className={`social-medias-expanded-list ${theme === "light" ? " soc-list-light": ""} ${expandSocMedias ? " opened-expanded-list" : ""}`}> 
                        <a href="#"> <i class="fas fa-envelope"></i> </a>
                        <a href="#"> <i class="fab fa-telegram-plane"></i> </a>
                        <a href="#"> <i class="fab fa-discord"></i> </a>
                        <a href="#"> <i class="fab fa-twitter"></i> </a>
                        <a href="#"> <i class="fab fa-medium"></i> </a>
                        <a href="#"> <i class="fab fa-github"></i> </a>
                    </div>
                    {pages.map((item) => {
                        return (
                            <li className={activeTab === item.path ? "active-nav-tab" : ""}>
                                <NavLink to={item.path} onClick={() => setActiveTab(item.path)}><img src={activeTab === item.path ? item.imgActive : item.img} width={20} height={20}/></NavLink>
                            </li> 
                        )
                    })}
                    <li onMouseEnter={() => setExpandSocMedias(true)} >
                        <img src={comments_black} width={20} height={20}/>
                    </li>
                </ul>
                <div className={`layout-wrapper__sidebar__links ${theme === "light" ? " links-light" : ""}`}> 
                    <a href="#"> Documentation </a>
                    <a href="#"> Audit </a> 
                    <a href="#"> Polygonscan </a> 
                </div>
                <div className={`layout-wrapper__sidebar__switcher ${theme === "light" ? " sidebar-switch-light" : ""}`}> 
                    <i className={`fas fa-moon ${theme === "dark" ? "acitve-daytime" : ""}`}></i>
                    <label className="label">
                        <div className={theme === "light" ? 'toggle active-theme-switch' : 'toggle'}>
                            <input className="toggle-state" onChange={() => setTheme(theme === "dark" ? "light" : "dark")} type="checkbox" name="check"/>
                            <div className="indicator"></div>
                        </div>
                    </label>
                    <i className={`fas fa-sun ${theme === "light" ? "acitve-daytime" : ""}`}></i>
                </div>
            </div>
            <div className='layout-wrapper-header'> 
                <div className={`layout-wrapper-header__balances ${balancesExpanded ? "expanded" : ""}`} onClick={() => setBalancesExpaned(!balancesExpanded)}> 
                    <img src={pig_icon} width={20} height={20}/>
                    <p> Balance </p>
                    <p> 17.02$ </p>
                    {mockUserAssetsList.map((item) => {
                        return (
                            <span className='token-asset-list'> <TokenIcon iconName={item.name}/> <span> {item.value}{item.name}/2$ </span> </span>
                        )
                    })}
                </div>

                <div className={`layout-wrapper-header__connect-wallet ${connectWalletExpanded ? " expand-connect-wallet" : ""}`}> 
                    <span> {mockWalletConnected ? "Disconnect Wallet" : "Connect Wallet"}</span>
                    <button onClick={() => setModal(true)}>
                        {mockWalletConnected ?  <img src={theme === "dark" ? disconnect_icon_white : disconnect_icon}/> : <i className="fas fa-plug"/>}
                    </button>
                </div>
            </div>
            <div className='layout-wrapper__content'> 
                {children}
            </div>
        </div>
    )
}