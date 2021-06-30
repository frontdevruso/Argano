import React, {useState} from 'react';
import { createChart } from 'lightweight-charts';

export const TokenPriceChart = () => {

    const [chartId, setChartId] = useState([
        {name: "line", id: "dashboard-line-token-price-chart", active: true},
        {name: "candle", id: "dashboard-candle-token-price-chart", active: false},

    ])

    const [lineChart, setLineChart] = useState(null);
    const [candleChart, setCandle] = useState(null);
    const [viewTypes, setViewTypes] = useState([
        { icon: <LineSvg color={themeMode === "black" ?'#fff':'#444'}/>, name: 'Line', active: true },
        { icon: <BounceSvg color={themeMode === "black" ?'#fff':'#444'}/>, name: 'Bounce', active: false },
    ]);

    const handleChartTypeChanges = (type) => {



    }

    return (
        <>
            <button onClick={() => handleChartTypeChanges("Line")}>Line</button>
            <button onClick={() => handleChartTypeChanges("Candle")}>Candle</button>
            <div id={chartId.filter((item) => item.active === true)[0].id}></div>
        </>
    )


}