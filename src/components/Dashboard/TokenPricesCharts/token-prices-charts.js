import React, { useContext, useEffect, useState } from 'react';
import { formattedNum } from '../../../utils/helpers';
import arrowUp from './arrow-up.svg';
import arrowDown from './arrow-down.svg';
import { LineChart, XAxis, Line, ResponsiveContainer, Tooltip } from 'recharts';
import { ThemeContext } from '../../App/App';
export const TokenPricesCharts = () => {

    const [expandWindow, setExpandWindow] = useState(false);
    const {theme} = useContext(ThemeContext);

    const [tokensData, setTokensData] = useState([
        {
            name: "AGOUSD",
            price: formattedNum(1),
            dayPercent: "-3%",
            priceData: [
                {value: 10, time: "01"},
                {value: 20, time: "02"},
                {value: 20, time: "03"},
                {value: 17, time: "04"},
                {value: 20, time: "05"},
                {value: 15, time: "06"},
                {value: 13, time: "07"},
                {value: 14, time: "08"},
                {value: 10, time: "09"},
                {value: 12, time: "10"},
                {value: 9, time: "11"},
                {value: 7, time: "12"},
            ]
        },
        {
            name: "CNUSD",
            price: formattedNum(10),
            dayPercent: "+10%",
            priceData: [
                {value: 10, time: "01"},
                {value: 20, time: "02"},
                {value: 20, time: "03"},
                {value: 17, time: "04"},
                {value: 20, time: "05"},
                {value: 15, time: "06"},
                {value: 13, time: "07"},
                {value: 14, time: "08"},
                {value: 10, time: "09"},
                {value: 12, time: "10"},
                {value: 9, time: "11"},
                {value: 7, time: "12"},
            ]
        },
        {
            name: "AGOBTC",
            price: formattedNum(38369),
            dayPercent: "+20%",
            priceData: [
                {value: 10, time: "01"},
                {value: 20, time: "02"},
                {value: 20, time: "03"},
                {value: 17, time: "04"},
                {value: 20, time: "05"},
                {value: 15, time: "06"},
                {value: 13, time: "07"},
                {value: 14, time: "08"},
                {value: 10, time: "09"},
                {value: 12, time: "10"},
                {value: 9, time: "11"},
                {value: 7, time: "12"},
            ]
        },
        {
            name: "CNBTC",
            price: formattedNum(220),
            dayPercent: "-15%",
            priceData: [
                {value: 10, time: "01"},
                {value: 20, time: "02"},
                {value: 20, time: "03"},
                {value: 17, time: "04"},
                {value: 20, time: "05"},
                {value: 15, time: "06"},
                {value: 13, time: "07"},
                {value: 14, time: "08"},
                {value: 10, time: "09"},
                {value: 12, time: "10"},
                {value: 9, time: "11"},
                {value: 7, time: "12"},
            ]
        }    
    ])

    const CustomToolTip = ({active, payload, label}) => {


        if (payload[0]) {
            const value = payload[0].payload.value;
            if (active) {
                return (
                    <div className='custom-tooltip'>
                        <span> {value}$ </span>
                    </div>
    
                )
            }
        }


        return null;

    }


    const Chart = ({data, fullSize}) => {

        const tickColor = theme === "light" ? "black" : "white"
        
        return (
            <ResponsiveContainer width={'100%'} height={"80%"}>
                <LineChart
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 1,
                }}  
                data={data}
                >
                
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#40BA93"
                    strokeWidth={5}
                    dot={false}
                    activeDot={true}
                />
                <Tooltip
                    content={<CustomToolTip/>}
                />
                {fullSize ? 
                    <XAxis 
                        dataKey="time"
                        axisLine={false}
                        tickLine={false}
                        stroke={tickColor}
                        // tickFormatter={(time) => dayjs(time).format('DD')}
                        minTickGap={10}
                    />
                    :
                    ""
                }

            </LineChart>
        </ResponsiveContainer>
        )

    }

    const [showChart, setShowChart] = useState({active: false, index: null })

    return (
        <div 
            onClick={() => setExpandWindow(!expandWindow)}
            className={`charts-wrapper-block ${expandWindow ? "expanded-chart-block" : ""} dashBox ${theme === "light" ? " dashBoxLight" : ""}`}

        >
            {tokensData.map((item, _ind) => {

                const Arrow = item.dayPercent.charAt(0) === "+" ? <img src={arrowUp}/> : <img src={arrowDown}/>

                const expandClassName = showChart.active && showChart.index === _ind ? "expand-price-block" : "";

                return (
                    <div className={`price-block ${ expandWindow ? "" : expandClassName}`}
                        onMouseEnter={() => expandWindow ? null : setShowChart({active: true, index: _ind})}
                        onMouseLeave={() => expandWindow ? null : setShowChart({active: false, index: null})}
                        key={_ind}
                    > 
                        <h3> {item.name} </h3>
                        <h1> ${item.price} </h1>
                        <span> {Arrow} {item.dayPercent} <span>(24h)</span> </span>
                        {_ind !== tokensData.length - 1 ? 
                            <div id={_ind + "-line-block"} className='price-block__border-line' style={{display: expandWindow && (_ind === 0 || _ind === 2) ? "none" : "block"}}> </div> 
                            :
                            ""
                        }
                        {showChart.active && showChart.index === _ind ? 

                            <div className='chart-mini-block'>
                                <Chart data={item.priceData} fullSize={false}/>
                            </div>
                            :
                            ""
                        }
                        {expandWindow ?
                            <>
                                <Chart data={item.priceData} fullSize={true}/>
                                <span className='supply'>  <text>Supply:</text> <b> $253.22k </b> </span>
                                <span className='market-cap'> <text>Market cap: </text>  <b>$253.22k</b> </span>
                            </>
                            :
                            ""                        
                        }

                    </div>
                )

            })}                
        </div>
    )

}