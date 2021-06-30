import React, {useContext, useEffect, useState} from 'react';
import { createChart } from 'lightweight-charts';
import LineSvg  from './svg/LineSvg';
import BounceSvg  from './svg/BounceSvg';
import {Loader} from "../../Loader/loader";
import {ThemeContext} from "../../App/App";
import './token_price_chart.scss';
import {getTokenChartData} from "../../../utils/getDashboardData";
import {PriceChart} from "./PriceChart/price-chart";
import {DashboardContext} from "../dashboard";
export const TokenPriceChart = () => {

    const {theme} = useContext(ThemeContext);
    const {latestBlock, token, setToken} = useContext(DashboardContext);

    const [timeFrame, setTimeFrame] = useState({count: 90, window: "day", interval: 86400})
    const [tokenPrice, setTokenPrice] = useState(0);
    const [tokenHeader, setTokenHeader] = useState("WETH");

    const [loadingData, setLoading] = useState(true);
    const [chartData, setChartData] = useState([]);
    const [viewTypes, setViewTypes] = useState([
        { icon: <LineSvg color={theme === "black" ?'#fff':'#444'}/>, name: 'Line', active: true },
        { icon: <BounceSvg color={theme === "black" ?'#fff':'#444'}/>, name: 'Bounce', active: false },
    ]);
    const [chartType, setChartType] = useState("Line");
    const [precentPrice, setPrecentPrice] = useState(0);
    const [tokenPriceLocal, setTokenPriceLocal] = useState(0.00)

    const tokens = {
        "WETH": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
        "MATIC": "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
        "QUICK": "0x831753dd7087cac61ab5644b308642cc1c33dc13",
        "USDT": "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
        "LINK": "0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39"
    }
    useEffect(() => {

        getTokenChartData(timeFrame.count, timeFrame.window, timeFrame.interval, token, latestBlock)
            .then((items) => {
                setChartData(items[0])
                setTokenPriceLocal(items[0][items[0].length -1].close)
                setPrecentPrice(items[1])
                setLoading(false)
            })

    }, [timeFrame, token, latestBlock])

    const handleDateChange = async (timeInt, timeStr, timeInterval) => {
        setLoading(true);
        await setTimeFrame({count: timeInt, window: timeStr, interval: timeInterval});
    }

    const handleTokenChange = async (tokenInput) => {
        setLoading(true);
        setToken(tokens[tokenInput]);
        setTokenHeader(tokenInput);
        setToken(tokens[tokenInput]);
    }

    const handleViewChart = (name) => {
        const newViewTypes = viewTypes.map(button=>button.name === name?{...button, active:true}:{...button, active:false});
        setViewTypes(newViewTypes);
        setChartType(name);
    }

    return (
        <div className={`${theme === "black" ? "tokenChart" : "tokenChart-black"} dashBox`}>
            <div className={'dashBox__header'}>
                <h3 className={'dashBox__h3'}>{tokenHeader}</h3>
                <div className={'dashBox__header__tokenChose'}>
                    <select onChange={(e) => handleTokenChange(e.target.value)}>
                        <option value="WETH"> WETH </option>
                        <option value="MATIC"> MATIC </option>
                        <option value="QUICK"> QUICK </option>
                        <option value="USDT"> USDT </option>
                        <option value="LINK"> LINK </option>


                    </select>
                    <button onClick={() => handleDateChange(24, "hour", 600)} className={timeFrame.count === 24 ? "active-data" : ""}> 1D </button>
                    <button onClick={() => handleDateChange(7, "day", 3600)} className={timeFrame.count === 7 ? "active-data" : ""}> 1W </button>
                    <button onClick={() => handleDateChange(30, "day", 21600)} className={timeFrame.count === 30 ? "active-data" : ""} > 1M </button>
                    <button onClick={() => handleDateChange(90, "day", 86400)} className={timeFrame.count === 90 ? "active-data" : ""} > 3M </button>
                    <button onClick={() => handleDateChange(1, "All time", 86400)} className={timeFrame.count === 1 ? "active-data" : ""} > All </button>
                </div>

            </div>
            <div className={'tokenChart__viewSelect'}>
                <span className={'tokenChart__viewSelect__amount'}>${parseFloat(tokenPriceLocal).toFixed(2)}</span>
                <span className={`tokenChart__viewSelect__percent ${parseFloat(precentPrice) < 0 ? "red-span" : ""}`}>{parseFloat(precentPrice) > 0 ? "+" + precentPrice : precentPrice}</span>
            </div>
            <div className={'dashBox__absoluteArea'}>
                {viewTypes.map((button, _ind) => (
                    <button
                        className={button.active ? 'dashBox__absoluteArea__button dashBox__absoluteArea__button--active' : 'dashBox__absoluteArea__button'}
                        onClick={() => handleViewChart(button.name)}>
                        {button.icon}
                    </button>
                ))}
            </div>
            {loadingData ? <Loader/> :
                <div className={'tokenChart__chartBg'}>
                    <PriceChart themeMode={theme} chartData={chartData} chartType={chartType}/>
                </div>
            }
        </div>
    )

}
