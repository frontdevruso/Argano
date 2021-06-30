import React, {useContext, useEffect, useState} from 'react';
import './token-liquidity-chart.scss';
import {Loader} from "../../Loader/loader";
import Chart from 'kaktana-react-lightweight-charts';
import {ThemeContext} from "../../App/App";
import {DashboardContext} from "../dashboard";
import {getTokenLiqudity} from "../../../utils/getDashboardData";
import {formatDate, formattedNum} from "../../../utils/helpers";

export const TokenLiquidityChart = () => {

    const { theme } = useContext(ThemeContext);
    const { latestBlock, token } = useContext(DashboardContext);

    const [percent, setPercent] = useState(0.00);
    const [lastValue, setLastValue] = useState(0.00);
    const [liqudityArray, setLiquidityArray] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(()=>{

        const fetchDataLiqudity = async () => {
            setLoading(true)
            const liqudity = await getTokenLiqudity(latestBlock, token);

            liqudity[0].forEach((item) => {
                item.time = formatDate(item.time * 1000)
            })

            setLastValue(formattedNum(liqudity[0][liqudity[0].length - 1].value))
            setPercent(liqudity[1])
            setLiquidityArray(liqudity[0])
        }
        if (latestBlock !== 0) {
            fetchDataLiqudity()
            if (liqudityArray.length !== 0) {
                setLoading(false)
            }
        }
    }, [latestBlock, liqudityArray.length, token])

    const addSeriesData = [{
        data: liqudityArray,
        options: {
            lineColor: '#40BA93',
            topColor: theme === "dark" ? 'rgba(64, 186, 147, 0.36)' : 'rgba(12, 229, 190, 0.4)',
            bottomColor: theme === "dark" ? 'rgba(64, 186, 147, 0.36)' : 'rgba(12, 229, 190, 0.4)',
            lineStyle: 0,
            lineWidth: 3,
        }
    }]


    const options = {
        alignLabels: true,
        timeScale: {
            barSpacing: 61,
            borderVisible: false,
            borderColor: "#fff000",
            visible: true,
            timeVisible: true,
            secondsVisible: false
        },
        handleScale: {
            mouseWheel: false,
            pressedMouseMove: false,
            horzTouchDrag: false,
            vertTouchDrag: false
        },
        handleScroll: {
            mouseWheel: false,
            pressedMouseMove: false,
            horzTouchDrag: false,
            vertTouchDrag: false
        },
        priceScale: {
            alignLabels: true,
            scaleMargins: {
                top: 0.05,
                bottom: 0.05,
            },
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
            backgroundColor: theme === "dark" ? "#292A2D" : "white",
            textColor: theme === "dark" ? "white" : "#444",
            fontSize: 16,
        },
    }


    return(
        <div className={'liquidity dashBox'}>
            <h3 className={'dashBox__h3'}>Liquidity</h3>
            <div className={'dashBox__price_precentage'}>
                <h5> {lastValue} $ </h5>
                <span className={parseFloat(percent) < 0 ? "red-span": ""}> {parseFloat(percent) > 0 ? "+" + percent : percent} </span>
            </div>
            {loading ? <Loader/> : <Chart options={options} areaSeries={addSeriesData} width={500} height={300}/>}
        </div>
    )
}



