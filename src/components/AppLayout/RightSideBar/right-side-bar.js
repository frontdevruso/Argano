import React, {useContext} from 'react';
import './right-side-bar.scss';
import {useSpring, animated} from "react-spring";
import {GasPriceDropdown} from "../Header/GasPriceDropdown/gas-price-dropdown";
import {WalletBalanceDropdown} from "../Header/WalletBalanceDropdown/wallet-balance-dropdown";
import {ThemeContext} from "../../App/App";

export const RightSideBar = ({right, sidebarsHandlers}) => {

    const rightSideBarEffect = useSpring({
        opacity: right ? 1 : 0,
        width: right ? "100%" : "0%"
    })

    const connected = true;

    const {theme} = useContext(ThemeContext);

    return (
        <animated.div className={theme ==="dark" ? 'right-sidebar' : "right-sidebar light"} style={rightSideBarEffect}>
            <div className={'right-sidebar__container'}>
                <button onClick={() => sidebarsHandlers.right(!right)} className={'right-sidebar__container__close-btn'}><i className="fas fa-times"></i></button>
                <div className={'address'}>
                    {connected ? <span> 0x6e6Baf3A4f...931f51 </span> : ""}
                </div>
                <div className={'account-button'}>
                    <span> {connected ? "Change Wallet" : "Connect"} </span>
                    <button onClick={() => alert("Connect Wallet Bitch")}> {connected ? <i className='fas fa-wallet'/> : <i className='fas fa-user'/>} </button>
                </div>
                <GasPriceDropdown/>
                <WalletBalanceDropdown/>
            </div>
        </animated.div>
    )

}