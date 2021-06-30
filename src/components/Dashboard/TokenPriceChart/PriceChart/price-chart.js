import React, {useState, useEffect} from 'react';
import Chart from 'kaktana-react-lightweight-charts';
import {formattedNum} from "../../../../utils/helpers";
export const PriceChart = ({themeMode, chartData, chartType}) => {

    const [lineChartData, setLineChartData] = useState(null);

    const options = {
        alignLabels: true,
        timeScale: {
            barSpacing: 10,
            rightOffset: 12,
            borderVisible: false,
            borderColor: "#fff000",
            visible: true,
            timeVisible: true,
            secondsVisible: false
        },
        rightPriceScale: {
            scaleMargins: {
                top: 0.3,
                bottom: 0.25,
            },
            borderVisible: false,
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
        localization: {
            locale: "en-EN",
            priceFormatter: (price) => formattedNum(price, true)
        },
        layout: {
            backgroundColor: themeMode === "dark" ? "#292A2D" : "white",
            textColor: themeMode === "dark" ? "white" : "#444",
            fontSize: 16
        },
    }



    const candlestickSeries = [{
        data: chartData,
        options: {
            upColor: '#40BA93',
            downColor: '#B3362A',
            borderVisible: true,
            borderDownColor: '#B3362A',
            borderUpColor: '#40BA93',
            wickDownColor: '#B3362A',
            wickUpColor: '#40BA93'
        }
    }]


    useEffect(() => {
        if (chartType === "Line") {
            let tempArr = []
            chartData.map((item) => {
                let middleArithemticValue = (parseFloat(item.open) + parseFloat(item.low) + parseFloat(item.high) + parseFloat(item.close)) / 4
                tempArr.push({time: item.time, value: middleArithemticValue})
            })

            setLineChartData([{
                data: tempArr,
                options: {
                    color: '#40BA93',
                    lineStyle: 0,
                    lineWidth: 3,
                }
            }])
        }
    }, [chartData, chartType])

    return (
        <>
            {lineChartData !== null && chartType === "Line" ? <Chart options={options} lineSeries={lineChartData} autoWidth height={300}/> : <Chart options={options} candlestickSeries={candlestickSeries} autoWidth height={300}/>}
        </>
    )
}
