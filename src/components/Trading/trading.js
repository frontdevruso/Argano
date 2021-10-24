import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import line from '../../assets/icons/chart-switcher/line.svg';
import candle from '../../assets/icons/chart-switcher/candle.svg';
import line_active from '../../assets/icons/chart-switcher/line-active.svg';
import candle_active from '../../assets/icons/chart-switcher/candle-active.svg';
import swap_trading from '../../assets/icons/swap-trading.svg';
import swap_trading_dark from '../../assets/icons/swap-trading-dark.svg';

import TradingWindow from './trading-window/trading-window';
import {TradingChart} from './trading-chart/trading-chart';
import { TokenIcon } from '../TokenIcon/token_icon';
import './trading.scss';
import { useSystemContext } from '../../systemProvider';

export const Trading = () => {

    const chartBlockRef = useRef(null)
    const [chartDimensions, setChartDimensions] = useState(null);

    const {theme} = useSystemContext();
    
    useEffect(() => {

        setChartDimensions()

    },[chartBlockRef])



    return (
        <div className={`trading-wrapper ${theme === "light" ? " trading-wrapper-light" : ""}`}>
            <div className='trading-wrapper__header'> <h1> Trading </h1> </div>
            <TradingWindow/>
            <div className='trading-wrapper-exchange trading-window-box'> 
                <h1 className='trading-wrapper-exchange__header'> Market </h1>
                    <div className="trading-wrapper-exchange__swap-input">
                        <h3> Wrapped BTC </h3>
                        <h5> =$60,600.36 </h5>
                        <span> <TokenIcon iconName={"AGO"}/> <h3> AGO </h3> <i class="fas fa-arrow-down"></i> </span>
                        <input type="numbe" placeholder="Enter amount" value={1}/>
                    </div>
                    <img className="arrow-swap" src={ theme === "light" ? swap_trading_dark : swap_trading} alt="swap"/>
                    <div className="trading-wrapper-exchange__swap-input">
                        <h3> Tether USD </h3>
                        <h5> =$60,600.36 </h5>
                        <span> <TokenIcon iconName={"AGOUSD"}/> <h3> AGOUSD </h3> <i class="fas fa-arrow-down"></i> </span>
                        <input type="numbe" placeholder="Enter amount" value={47361.1}/>
                    </div>      

                <div className="trading-wrapper-exchange__tx-info-block">
                    <span> <h3> Rate </h3> <h3> 1 WBTC = <b>47,361.871376</b> USDT </h3>  </span>
                    <span> <h3> Inverse Rate </h3> <h3> 1 USDT = <b>0.00002111</b> USDT </h3>  </span>
                    <span> <h3> Estimated Fee </h3> <b> = $65</b> </span>
                    <span> <h3> You Save </h3> <b className="active"> = $73.62 </b> </span>
                </div>
                <button className='trading-wrapper-exchange__swap-btn'> SWAP </button>
            </div>
            <div className='trading-wrapper-txs trading-window-box'> 
            </div>
        </div>
    )

}