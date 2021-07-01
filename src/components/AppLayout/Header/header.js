import React, {useState, useContext, useEffect, useRef} from 'react';
import {ThemeContext} from "../../App/App";
import GasSvg from './svg/gasSvg';
import ArrowDown from './svg/arrowDown';
import BalanceSvg from './svg/balanceSvg';
import './header.scss';
import {GasPriceDropdown} from "./GasPriceDropdown/gas-price-dropdown";
import {WalletBalanceDropdown} from "./WalletBalanceDropdown/wallet-balance-dropdown";
export const Header = ({sidebarHandlers}) => {

    const {left, right} = sidebarHandlers;

    const [viewGas, setViewGas] = useState(false);
    const [connected, setConnected] = useState(true) //TODO: change it to Web3 (Test only);

    // const {account} = useSelector(state => state.authReducer);

    // Theme
    const {theme, setTheme} = useContext(ThemeContext)

    const [rightSideKurwa, setRightSideKurwa] = useState(right);

    useEffect(() => {

        right(rightSideKurwa) // TODO: take this stupid shit off.

    }, [rightSideKurwa])


    return (
        <div className={ theme === 'light' ? 'header-wrapper light' : 'header-wrapper'}>

            <div className={'left-sidebar'}>
                <button onClick={() => left(true)}><i className="fas fa-bars"></i></button>
            </div>

            <div className={'search-field'}>
                <input type={'text'} placeholder={'Search ARGANO pairs and contracts...'}/>
            </div>

            <div className={'right-options-bar'}>
                <button onClick={() => setRightSideKurwa(!rightSideKurwa)}><i className="fas fa-cog"></i></button>
            </div>

            <GasPriceDropdown/>
            <WalletBalanceDropdown/>
            <div className={'address'}>
                {connected ? <span> 0x6e6Baf3A4f...931f51 </span> : ""}
            </div>
            <div className={'account-button'}>
                <span> {connected ? "Change Wallet" : "Connect"} </span>
                <button onClick={() => alert("Connect Wallet Bitch")}> {connected ? <i className='fas fa-wallet'/> : <i className='fas fa-user'/>} </button>
            </div>
        </div>
    )
}

export default Header;