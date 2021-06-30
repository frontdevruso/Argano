import React, {useContext, useEffect, useState} from 'react';
import './token-volume-chart.scss';
import {Loader} from "../../Loader/loader";
import {formattedNum} from "../../../utils/helpers";
import {getTokenVolume} from "../../../utils/getDashboardData";
import {createChart} from "lightweight-charts";
import {DashboardContext} from "../dashboard";
import {ThemeContext} from "../../App/App";


export const TokenVolumeChart = () => {

    const {theme} = useContext(ThemeContext);
    const {latestBlock, token} = useContext(DashboardContext);

    const [view, setView] = useState("W");
    const [containerId, setContainerId] = useState('lightweight_chart_container')
    const [loading, setLoading] = useState(true)
    const [stateChart, setStateChart] = useState(null);
    const [percent, setPercent] = useState(0.00);
    const [lastValue, setLastValue] = useState(0.00);

    useEffect(() => {

        const chart = createChart(containerId, {
            width: 500,
            height: 300,
            localization: {
                priceFormatter: (price) => formattedNum(price, true)
            },
        });

        chart.applyOptions({
            timeScale: {
                barSpacing: 10,
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
            rightPriceScale: {
                scaleMargins: {
                    top: 0.5,
                    bottom: 0,
                },
                borderVisible: false,
            },
            priceScale: {
                alignLabels: true,
                scaleMargins: {
                    top: 0.32,
                    bottom: 0,
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
            layout: {
                backgroundColor: theme === "dark" ? "#292A2D" : "white",
                textColor: theme === "dark" ? "white" : "#444",
                fontSize: 16
            },
        })


        const histogram = chart.addHistogramSeries()

        setStateChart({chart: chart, histogram: histogram})


    },[])



    useEffect(() => {

        const fetchData = async () => {

            setLoading(true);

            const res = await getTokenVolume(latestBlock, view, token)

            stateChart.histogram.setData(res[0])

            stateChart.chart.applyOptions({
                timeScale: {
                    barSpacing: 15,
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
                rightPriceScale: {
                    scaleMargins: {
                        top: 0.5,
                        bottom: 0,
                    },
                    borderVisible: false,
                },
                priceScale: {
                    alignLabels: true,
                    scaleMargins: {
                        top: 0.32,
                        bottom: 0,
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
                layout: {
                    backgroundColor: theme === "dark" ? "#292A2D" : "white",
                    textColor: theme === "dark" ? "white" : "#444",
                    fontSize: 16
                },
            })

            setLastValue(formattedNum(res[0][res[0].length - 1].value));

            setPercent(res[1]);


            setLoading(false)

        }

        if (stateChart !== null) {
            fetchData()
        }


    }, [stateChart, view, token, theme])



    const handleViewChange = (view) => {
        setView(view)
    }
    return(
        <div className={'volume dashBox'}>
            <div className={'dashBox__absoluteArea'}>
                <button className={view === "W" ? 'dashBox__absoluteArea__button dashBox__absoluteArea__button--active':'dashBox__absoluteArea__button'} onClick={()=>handleViewChange("W")}>W</button>
                <button className={ view === "D" ? 'dashBox__absoluteArea__button dashBox__absoluteArea__button--active':'dashBox__absoluteArea__button'} onClick={()=>handleViewChange("D")}>D</button>


            </div>
            <h3 className={'dashBox__h3'}>Volume {view === 'W'?'(7d)':'(1d)'}</h3>
            <div className={'dashBox__price_precentage'}>
                <h5> {lastValue} $ </h5>
                <span className={parseFloat(percent) < 0 ? "red-span" : ""}> {parseFloat(percent) > 0 ? "+" + percent : percent} </span>
            </div>
            {loading ? <Loader/> : ""}
            <div style={{display: loading ? "none" : "block"}} id={containerId}> </div>
        </div>
    )
}