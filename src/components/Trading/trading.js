import React, { useContext, useEffect, useRef, useState } from 'react';
import line from '../../assets/icons/chart-switcher/line.svg';
import candle from '../../assets/icons/chart-switcher/candle.svg';
import line_active from '../../assets/icons/chart-switcher/line-active.svg';
import candle_active from '../../assets/icons/chart-switcher/candle-active.svg';
import swap_trading from '../../assets/icons/swap-trading.svg';
import swap_trading_dark from '../../assets/icons/swap-trading-dark.svg';

import {TradingChart} from './trading-chart/trading-chart';
import { TokenIcon } from '../TokenIcon/token_icon';
import './trading.scss';
import { useSystemContext } from '../../systemProvider';

export const Trading = () => {


    const chartBlockRef = useRef(null)
    const [chartDimensions, setChartDimensions] = useState(null);
    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState(null);
    const {theme} = useSystemContext();

    useEffect(() => {

        const fetchChartData = async () => {
            const data = await (await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=1')).json()
            setChartData(data);
        }

        fetchChartData();


    }, []);

    useEffect(() => {

        if (chartData) {
            setLoading(false);
        }

    }, [chartData]) 

    useEffect(() => {

        setChartDimensions()

    },[chartBlockRef])

    const [chartType, setChartType] = useState("candle");


    return (
        <div className={`trading-wrapper ${theme === "light" ? " trading-wrapper-light" : ""}`}>
            <div className='trading-wrapper__header'> <h1> Trading </h1> </div>
                <div className='trading-wrapper-chart trading-window-box'>
                    <div className="chart-switcher">
                        <button onClick={() => setChartType("candle")} className={chartType === "candle" ? "active-chart-type" : ""}> <img src={chartType === "candle" ? candle_active : candle} width={20} height={20}/> </button>
                        <button onClick={() => setChartType("line")} className={chartType === "line" ? "active-chart-type" : ""}> <img src={chartType === "line" ? line_active : line} width={20} height={20}/> </button>
                    </div>

                    <div className='trading-wrapper-chart__header'> 
                        <h1> Chart </h1>
                    </div>
                    <div className='trading-wrapper-chart__control-panel'> 
                        <span> Time </span>
                        <button> m </button>
                        <button> h </button>
                        <button className='active-time-frame'> 1D </button>
                        <button> 1W </button>
                        <button> 1M </button>
                    </div>
                    <div className='trading-wrapper-chart__chart-graph'>
                        {!loading ? 
                            <TradingChart candleData={chartData} chartType={chartType}/> 
                            :
                            ""
                        }
                    </div>
                </div>
            <div className='trading-wrapper-exchange trading-window-box'> 
                <h1 className='trading-wrapper-exchange__header'> Market </h1>
                    <div className="trading-wrapper-exchange__swap-input">
                        <h3> Wrapped BTC </h3>
                        <h5> =$60,600.36 </h5>
                        <span> <TokenIcon iconName={"AGO"}/> <h3> AGO </h3> <i class="fas fa-arrow-down"></i> </span>
                        <input type="numbe" placeholder="Enter amount" value={1}/>
                    </div>
                    <img className="arrow-swap" src={ theme === "light" ? swap_trading_dark : swap_trading}/>
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