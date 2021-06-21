import React, {useContext, useEffect} from 'react';
import {ThemeContext} from '../../App/App';
import { Link } from 'react-router-dom';
import './sidebar.scss';
import agoLogo from './ago-sidebar-logo.svg';

// Dark theme icons
import dashboardDark from './svg-dark-mode/dashboard-icon.svg';
import mintRedeemDark from './svg-dark-mode/mint-redeem-icon.svg';
import foundryDark from './svg-dark-mode/foundary-icon.svg';
import stakingDark from './svg-dark-mode/staking-icon.svg';
import liquidityPoolsDark from './svg-dark-mode/liquidity-pools-icon.svg';
import tradingDark from './svg-dark-mode/trading-icon.svg';
import accountDark from './svg-dark-mode/account-icon.svg';

// Light theme icons
import dashboardLight from './svg-light-mode/dashboard-icon.svg';
import mintRedeemLight from './svg-light-mode/mint-redeem-icon.svg';
import foundryLight from './svg-light-mode/foundary-icon.svg';
import stakingLight from './svg-light-mode/staking-icon.svg';
import liquidityPoolsLight from './svg-light-mode/liquidity-pools-icon.svg';
import tradingLight from './svg-light-mode/trading-icon.svg';
import accountLight from './svg-light-mode/account-icon.svg';

export const SideBar = ({sidebarHandlers}) => {

    const {theme, setTheme} = useContext(ThemeContext)

    console.log(theme);

    return (
        <div className={theme === 'dark' ? 'sidebar' : 'sidebar sidebar-light'}>
            <div className={'sidebar__top-header'}>
                <img src={agoLogo}  alt='Ago logo' height='42px' width='47px'/>
                {sidebarHandlers ? <button onClick={() => sidebarHandlers.left(false)}><i className="fas fa-times"/></button> : ""}
            </div>

            <div className={'sidebar__link-list'}>
                <ul>
                    <li>
                        <>
                            <img src={theme === "dark" ?  dashboardDark : dashboardLight}/>
                            <Link to={'/dashboard'}> Dashboard </Link>
                        </>
                    </li>
                    <li>
                        <>
                            <img src={theme === "dark" ?  mintRedeemDark :  mintRedeemLight}/>
                            <Link to={'/mint-redeem'}> Mint Redeem </Link>
                        </>
                    </li>
                    <li>
                        <>
                            <img src={theme === "dark" ?  foundryDark : foundryLight}/>
                            <Link to={'/foundry'}> Foundry </Link>
                        </>
                    </li>
                    <li>
                        <>
                            <img src={theme === "dark" ?  stakingDark : stakingLight}/>
                            <Link to={'/staking'}> Staking Rewards </Link>
                        </>
                    </li>
                    <li>
                        <>
                            <img src={theme === "dark" ?  liquidityPoolsDark : liquidityPoolsLight}/>
                            <Link to={'/liquidity-pools'}>  Liquidity Pools </Link>
                        </>
                    </li>
                    <li>
                        <>
                            <img src={theme === "dark" ?  tradingDark : tradingLight}/>
                            <Link to={'/trading'}>Trading</Link>
                        </>
                    </li>
                    <li>
                        <>
                            <img src={theme === "dark" ?  accountDark : accountLight}/>
                            <Link to={'/account'}>Account</Link>
                        </>
                    </li>
                </ul>
            </div>

            <div className={'sidebar__social-top'}>
                <ul>
                    <li> <a href={"#"}>Token Contracts</a> </li>
                    <li> <a href={"#"}>CoinGecko</a> </li>
                    <li> <a href={"#"}>Polygonscan</a> </li>
                </ul>
            </div>
            <div className={'sidebar__social-bot'}>
                <ul>
                    <li><a href={"#"}><i className="fab fa-github"/></a></li>
                    <li><a href={"#"}><i className="fab fa-medium"/></a></li>
                    <li><a href={"#"}><i className="fab fa-twitter"/></a></li>
                    <li><a href={"#"}><i className="fab fa-discord"/></a></li>
                    <li><a href={"#"}><i className="fab fa-telegram-plane"/></a></li>
                    <li><a href={"#"}><i className="fas fa-envelope"/></a></li>
                </ul>
            </div>
            <div className={'sidebar__theme-switch'}>
                <div>
                    <span> Dark </span>
                    <label className={'switch'}>
                        <input onChange={() => setTheme(theme === "dark" ? "light": "dark")} type={'checkbox'} checked={theme === "dark" ? false: true}/>
                        <span className={'slider round'}></span>
                    </label>
                    <span>Light</span>
                </div>
            </div>

        </div>
    )
}

export default SideBar;