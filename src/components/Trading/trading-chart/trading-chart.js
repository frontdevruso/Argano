import React, { useContext, useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import { formatDate } from '../../../utils/helpers';
import { useSystemContext } from '../../../systemProvider';

export const TradingChart = ({candleData, lineData, chartType }) => {

    const ref = useRef();
    const parentRef = useRef(null);
    const {theme} = useSystemContext();
    const [chart, setChart] = useState(null);
    const [lineSeries, setLineSeries] = useState(null);
    const [candleSeries, setCandleSeries] = useState(null);
    
    const calculateChangeBetweenCandles = (firstCandle, secondCandle) => {


        // FIXME: There is a bug that always set new value to a 0 wtf.
        // FIXME: Probably error with state.
        // TODO: we should left just 1 positions its "Open" for less code and this is not will lose logic at all.

        return ((firstCandle - secondCandle) / ((firstCandle + secondCandle) / 2)) * 100;

    }

    const [tradingInfo, setTradingInfo] = useState(null);


    useEffect(() => {
        if (!tradingInfo) {
            setTradingInfo({
                time: formatDate(new Date(candleData[candleData.length - 1][0])),
                open: candleData[candleData.length - 1][1],
                high: candleData[candleData.length - 1][2],
                low: candleData[candleData.length - 1][3],
                close: candleData[candleData.length - 1][4],
                // change: calculateChangeBetweenCandles(candleData[candleData.length - 1][1], candleData[candleData.length - 2][1])
            })
        }
    }, [])


    useEffect(() => {

        if (chart) {
            if (theme === "light"){
                chart.applyOptions({
                    layout: {
                        textColor: 'black',
                    },
                    grid: {
                        vertLines: {
                            color: 'white',
                        },
                        horzLines: {
                            color: 'white',
                        },
                    },
                })
            }
            else {


                chart.applyOptions({
                    layout: {
                        textColor: 'white',
                    },
                    grid: {
                        vertLines: {
                            color: '#3A3C45',
                        },
                        horzLines: {
                            color: '#3A3C45',
                        },
                    },
                })
            }
        }
    }, [theme])

    function handleCrosshairMoved(param) {

        if (!param.point)  {


            return;
        }

        if (!param.time) {


            setTradingInfo(prevState => ({
                ...prevState 
            }))
            return;
        }
    
        const mapIterator = param.seriesPrices.values()
        const selectedOhlc = mapIterator.next().value

        // FIXME: TIME CHANGES TAKE ATTENTION ON TIMEFRAME MAYBE ITS 1 DAY OR IDK..

        setTradingInfo(prevState => ({
            time: formatDate(new Date(param.time * 1000)),
            open: selectedOhlc.open,
            high: selectedOhlc.high,
            low: selectedOhlc.low,
            close: selectedOhlc.close,
            // FIXME: we need to do something with that =>
            // change: calculateChangeBetweenCandles(selectedOhlc.open, prevState.open)
        }))
    }

    useEffect(() => {

        if (parentRef) {

            const chartInst = createChart(ref.current, {  width: parentRef.current.offsetWidth, height: parentRef.current.offsetHeight });

            chartInst.applyOptions({
                //TODO:  replace chart options to new file some sort "trade-chart-conf.js" and add CONST for light theme too. 
                // TODO: add price formatter for y axis 
                layout: {
                    background: {
                        color: "transparent"
                    },
                    textColor: 'white',
                    fontSize: 14,
                },
                grid: {
                    vertLines: {
                        color: '#3A3C45',
                        style: 3,
                        visible: true,
                    },
                    horzLines: {
                        color: '#3A3C45',
                        style: 1,
                        visible: true,
                    },
                },
                priceScale: {
                    autoScale: true,
                    invertScale: false,
                    alignLabels: false,
                    borderVisible: false,
                    borderColor: theme === "light" ? "black" : "white",
                    scaleMargins: {
                        top: 0.2,
                        bottom: 0.2,
                    },
                },
            })
    
            // TODO: https://github.com/tradingview/lightweight-charts/issues/50 => Spot this Issue to figure out multiple panes on chart. In our case this is a volume
    
            const candlestickSeries = chartInst.addCandlestickSeries({
                upColor: '#40BA93',
                downColor: '#028E62',
                borderVisible: false,
                wickVisible: true,
                wickUpColor: "#40BA93",
                wickDownColor: "#028E62",
            });
    
            const lineSeriesInst = chartInst.addLineSeries({
                color: '#40BA93',
                lineWidth: 3,
                crosshairMarkerVisible: false,
                lineType: 0,
            });
    
            setChart(chartInst);
            setLineSeries(lineSeriesInst);
            setCandleSeries(candlestickSeries);
    
        }
    }, [parentRef]);

    useEffect(() => {

        if (lineSeries && candleSeries) {
            if (chartType === "candle" && candleData) {

                chart.subscribeCrosshairMove(handleCrosshairMoved)

                const candles = candleData.map((item) => {

                    return {
                        time: item[0] / 1000,
                        open: item[1],
                        high: item[2],
                        low: item[3],
                        close: item[4]
                    }
                })

                lineSeries.setData([])
                candleSeries.setData(candles)
            }
            else {
                const lineChartData = lineData.map(item => ({time: item[0] / 1000, value: item[1]}))

                lineSeries.setData(lineChartData)
                candleSeries.setData([])
            }
        }
    }, [chartType, chart, candleData, lineData]);


     return (
        <>
            <div ref={parentRef} className='chart-self'> 
                <div ref={ref} id='chart'> </div>
            </div>
            <div className='chart-control-data'> 
            {tradingInfo && chartType === "candle" ? 
                <>
                    <ul> 
                        <li> {tradingInfo.time} </li> 
                        <li> O: <b>{tradingInfo.open}</b> </li>
                        <li> H: <b>{tradingInfo.high}</b> </li>
                        <li> L: <b>{tradingInfo.low}</b> </li>
                        <li> C: <b>{tradingInfo.close}</b> </li>
                    </ul>
                    <span> Change:  <b>{tradingInfo.change} </b> </span>
                </>
                :
                ""
            }
            </div>
        </>
    )

}