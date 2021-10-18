import React, { useContext, useEffect, useState } from 'react';
import { formattedNum } from '../../../utils/helpers';
import arrowUp from './arrow-up.svg';
import arrowDown from './arrow-down.svg';
import { LineChart, XAxis, Line, ResponsiveContainer, Tooltip } from 'recharts';
import {  } from '../../App/App';
import { useSystemContext } from '../../../systemProvider';
import { useDashboardContext } from '../../../providers/dashboard-provider';
export const TokenPricesCharts = () => {

    const [expandWindow, setExpandWindow] = useState(false);
    const {theme} = useSystemContext();
    const {dashTokens} = useDashboardContext()

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
                    top: 50,
                    right: 30,
                    left: 30,
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
                        minTickGap={5}
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
            {dashTokens.map((item, _ind) => {


                const Arrow = item.change24h.charAt(0) === "-" ? <img src={arrowDown}/> : <img src={arrowUp}/>

                const expandClassName = showChart.active && showChart.index === _ind ? "expand-price-block" : "";

                return (
                    <div className={`price-block ${ expandWindow ? "" : expandClassName}`}
                        onMouseEnter={() => expandWindow ? null : setShowChart({active: true, index: _ind})}
                        onMouseLeave={() => expandWindow ? null : setShowChart({active: false, index: null})}
                        key={_ind}
                    > 
                        <h3> {item.name} </h3>
                        <h1> ${item.currentPrice} </h1>
                        <span> {Arrow} {item.change24h} <span>(24h)</span> </span>
                        {_ind !== dashTokens.length - 1 ? 
                            <div id={_ind + "-line-block"} className='price-block__border-line' style={{display: expandWindow && (_ind === 0 || _ind === 2) ? "none" : "block"}}> </div> 
                            :
                            ""
                        }
                        {showChart.active && showChart.index === _ind ? 

                            <div className='chart-mini-block'>
                                <Chart data={item.chartPrices} fullSize={false}/>
                            </div>
                            :
                            ""
                        }
                        {expandWindow ?
                            <>
                                <Chart data={item.chartPrices} fullSize={true}/>
                                <span className='supply'>  <text>Supply:</text> <b> {formattedNum(item.supply)} $ </b> </span>
                                <span className='market-cap'> <text>Market cap: </text>  <b>{ formattedNum(item.marketCap)} $</b> </span>
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