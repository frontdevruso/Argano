import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import ago_icon from '../../assets/icons/ago-logo.svg';
import pig_icon from '../../assets/icons/pig-balances.svg';
import pig_icon_light from '../../assets/icons/pig-balances-light.svg';
import disconnect_icon from '../../assets/icons/plugging-plugs.svg';
import disconnect_icon_white from '../../assets/icons/plugging-plugs-white.svg';
import { formatAddress, formattedNum } from '../../utils/helpers';
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
import { useSystemContext } from '../../systemProvider';
import { useWeb3React } from '@web3-react/core';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';


export const Layout = ({children}) => {

    const history = useHistory();
    const {theme, setTheme, userProtfolio, disconnectWallet, setIsWalletModal, loading} = useSystemContext();
    const { account } = useWeb3React();
    const [expandSocMedias, setExpandSocMedias] = useState(false);
    const [activeTab, setActiveTab] = useState(history.location.pathname);
    const [balancesExpanded, setBalancesExpaned] = useState(false);

    const pages = [
        {path: "/dashboard", img: dashboard_black, imgActive: dashboard_active},
        {path: "/mint-redeem", img: mint_redeem_black, imgActive: mint_redeem_active},
        {path: "/staking", img: staking_black, imgActive: staking_active},
        {path: "/liqudity-pools", img: liquidity_pools_black, imgActive: liquidity_pools_active},
        {path: "/trading", img: trading_black, imgActive: trading_active},
        {path: "/accounts", img: accounts_black, imgActive: accounts_acitve},
    ]

    const loadingIcon = <LoadingOutlined style={{fontSize: 100, color: "#40BA93", position: "fixed", top: "50%", left: "50%"}}/>

    return (
        <div className={`layout-wrapper ${theme === "light" ? "layout-light" : ""}`}> 
            <div className='layout-wrapper__sidebar'> 
                <img src={ago_icon} width={47} height={42} alt="ago-coin"/>
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
                                <NavLink to={item.path} onClick={() => setActiveTab(item.path)}><img src={activeTab === item.path ? item.imgActive : item.img} width={20} height={20} alt={`${item.path}`}/></NavLink>
                            </li> 
                        )
                    })}
                    <li onMouseEnter={() => setExpandSocMedias(true)} >
                        <img src={comments_black} width={20} height={20} alt={'comments'}/>
                    </li>
                </ul>
                <div className={`layout-wrapper__sidebar__links ${theme === "light" ? " links-light" : ""}`}> 
                    <a href="#"> White Paper </a>
                    <a href="#"> GitBook </a> 
                    <a href="#"> Audit Report </a> 
                    <a href="#"> $AGO contracts </a> 
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
                <>
                    {account ? 
                        <>
                            <img src={theme === "light" ? pig_icon_light : pig_icon} width={20} height={20} alt="balance"/>
                            <p> Protocol Balance </p>
                            <p> { userProtfolio ? formattedNum(userProtfolio.reduce((a, {userUsdBalance}) => a + userUsdBalance, 0)) : 0.00 }$ </p>
                            {userProtfolio?.map((item) => {
                                return (
                                    <span className='token-asset-list'> <TokenIcon iconName={item.name}/> <span> {formattedNum(+item.userNativeBalance)}{item.name}/{formattedNum(item.userUsdBalance)}$ </span> </span>
                                )
                            })}
                        </>
                        :
                        <p> No balance, connect wallet! </p> 
                    }
                </>
                </div>
                <div className={`layout-wrapper-header__connect-wallet`}> 
                    <span> {account ? formatAddress(account) : "Connect Wallet"}</span>
                    <button onClick={() => account ?  disconnectWallet() : setIsWalletModal(true)}>
                        {account ? <img src={theme === "dark" ? disconnect_icon_white : disconnect_icon} alt="disconnect-connect"/> : <i className="fas fa-plug"/>}
                    </button>
                </div>
            </div>
            <div className='layout-wrapper__content'> 
                    <>
                        {loading ?
                            <Spin size="large" indicator={loadingIcon}/>  
                        :
                            children
                        }
                    </>
            </div>
        </div>
    )
}