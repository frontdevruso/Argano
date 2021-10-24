import React, {useEffect, useState} from 'react';
import line from '../../../assets/icons/chart-switcher/line.svg';
import candle from '../../../assets/icons/chart-switcher/candle.svg';
import line_active from '../../../assets/icons/chart-switcher/line-active.svg';
import candle_active from '../../../assets/icons/chart-switcher/candle-active.svg';
import { useSystemContext } from '../../../systemProvider';
import {COINGECKO_IDS} from '../../../constants';
import { TradingChart } from '../trading-chart/trading-chart';
import { TokenIcon } from '../../TokenIcon/token_icon';
import '../trading.scss';
import axios from 'axios';

const TradingWindow = () => {

    const {tokens} = useSystemContext();

    const [chartType, setChartType] = useState("candle");

    const [chartTimeStamp, setChartTimeStamp] = useState([
        {timeframe: "1", active: true, value: "1D"},
        {timeframe: "30", active: false, value: "1M"},
        {timeframe: "max", active: false, value: "All"},
    ]);

    const [candleChart, setCandleChart] = useState(null);
    const [lineChart, setLineChart] = useState(null);

    const [tokensCoinGecko, setTokensCoingecko] = useState(null);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        if (tokens) {
            const tokensArr = Object.entries(tokens).map((item, _ind) => ({name: item[0], coindgeckoId: COINGECKO_IDS[item[0]], active: _ind === 0}));
            setTokensCoingecko(tokensArr);
        }

    }, [tokens])


    useEffect(() => {

        if (tokensCoinGecko && chartTimeStamp) {
            fetchChartTokenData(tokensCoinGecko.find(item => item.active).coindgeckoId, chartTimeStamp.find(item => item.active).timeframe);
        }

    }, [tokensCoinGecko, chartTimeStamp])

    const fetchChartTokenData = async (token, timestamp) => {

        try {

            setLoading(true)

            const candle = await axios.get(`https://api.coingecko.com/api/v3/coins/${token}/ohlc?vs_currency=usd&days=${timestamp}`)
            const line = await axios.get(`https://api.coingecko.com/api/v3/coins/${token}/market_chart?vs_currency=usd&days=max`)
            setCandleChart(candle.data);
            setLineChart(line.data.prices);

            setLoading(false);

        }
        catch (e) {
            console.log(e)
        }
    }

    const onChangeTimeStamp = (value) => {
        const newTime = chartTimeStamp.map(item => item.value === value ? {...item, active: true} : {...item, active: false})
        setChartTimeStamp(newTime);
    }

    const onChangeTokenSelect = (value) => {
        const newTokens = tokensCoinGecko.map(item => item.name === value ? {...item, active: true} : {...item, active: false})
        setTokensCoingecko(newTokens)
    }


    return (
        <div className='trading-wrapper-chart trading-window-box'>
            {loading ? 
                null
                :
                <>
                <div className="chart-switcher">
                    <button onClick={() => setChartType("candle")} className={chartType === "candle" ? "active-chart-type" : ""}> <img src={chartType === "candle" ? candle_active : candle} width={20} height={20} alt="candle"/> </button>
                    <button onClick={() => setChartType("line")} className={chartType === "line" ? "active-chart-type" : ""}> <img src={chartType === "line" ? line_active : line} width={20} height={20} alt="line"/> </button>
                    </div>

                    <div className='trading-wrapper-chart__header'> 
                        <h1> Chart </h1>
                    </div>
                    <div className='trading-wrapper-chart__control-panel'> 
                        {chartType === "line" ? 
                            null    
                            :
                            <>
                                <span> Time </span>
                                {chartTimeStamp.map((item) => {
                                    return (
                                        <button onClick={() => onChangeTimeStamp(item.value)} className={item.active ?  "active-time-frame" : null}> {item.value} </button> 
                                    )
                                })}
                            </>
                        }

                        <select value={tokensCoinGecko.find(item => item.active).name} onChange={(e) => onChangeTokenSelect(e.target.value)} > 
                            {tokensCoinGecko.map((item) => {
                                return (
                                    <option> {item.name} </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='trading-wrapper-chart__chart-graph'>
                        <TradingChart candleData={candleChart} lineData={lineChart} chartType={chartType}/> 
                </div>  
                </>
            }
            </div>


    )
}

export default TradingWindow;