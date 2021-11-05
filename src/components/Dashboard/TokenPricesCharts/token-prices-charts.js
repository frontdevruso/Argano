import React, { useContext, useEffect, useState, useRef } from 'react';
import { formattedNum } from '../../../utils/helpers';
import arrowUp from './arrow-up.svg';
import arrowDown from './arrow-down.svg';
import { LineChart, XAxis, YAxis, Line, ResponsiveContainer, Tooltip } from 'recharts';
import {  } from '../../App/App';
import { useSystemContext } from '../../../systemProvider';
import { useDashboardContext } from '../../../providers/dashboard-provider';
import styled from 'styled-components';


const TokenPriceChartWrapper = styled.div`
    position: relative;
    width: 100%;
    transition: 0.3s all;
    height: ${props => props.isWindowExpanded ? "51vh" : "21vh"};
    background: radial-gradient(61.16% 3404.86% at 48.28% 79.61%, rgba(30, 117, 89, 0.3) 0%, rgba(9, 33, 25, 0.3) 100%), linear-gradient(90.99deg, #272727 2.18%, #1C1C1C 104.4%);
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.25);
    border-radius: 2vw;
    box-sizing: border-box;
    padding: 2.5% 3%;
    display: grid;
    align-items: ${props => props.isWindowExpanded ? "flex-start" : "center"};;
    grid-template-columns: repeat(4, 1fr);
`

const SinglePriceBlock = styled.div`
    border-right: ${props => props.isWindowExpanded ? props.isShowDivider ? "1px solid #40BA93" : "none" : "1px solid #40BA93"};
    padding-left: 40px;
    &:last-child {
        border-right: none;
    }
    h3 {
        font-size: 1vw;
        color: white;
    }
    h1 {
        font-size: 2.1vw;
        color: #40BA93;
    }
    span {
        font-size: 0.8vw;
        color: white;
        img {
            width: 1.1vw;
            height: 1.1vw;
        }
        span {
            color: #4F4F4F;
        }
    }

`

export const TokenPricesCharts = () => {

    const [expandWindow, setExpandWindow] = useState(false);
    const {theme} = useSystemContext();
    const {dashTokens} = useDashboardContext();

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
            <ResponsiveContainer width={'100%'} height={"100%"}>
                <LineChart
                margin={{
                    top: 50,
                    bottom: 1,
                }}  
                data={data}
                >
                
                <Line
                    type="basis"
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

    const [showChart, setShowChart] = useState({active: true, index: 0 })

    return (
        <TokenPriceChartWrapper isWindowExpanded={expandWindow} onClick={() => setExpandWindow(!expandWindow)}>
            {dashTokens.map((item, _ind) => {

                const Arrow = item.change24h.charAt(0) === "-" ? <img src={arrowDown} alt="arrow-down-percent"/> : <img src={arrowUp} alt="arrow-up-percent"/>

                return (
                    <SinglePriceBlock
                        onMouseEnter={() => expandWindow ? null : setShowChart({active: true, index: _ind})}
                        onMouseLeave={() => expandWindow ? null : setShowChart({active: false, index: null})}
                        key={_ind}
                        isShowDivider={_ind === 1}
                        isWindowExpanded={expandWindow}
                    > 
                        <h3> {item.name} </h3>
                        <h1> ${item.currentPrice} </h1>
                        <span> {Arrow} {item.change24h} <span>(24h)</span> </span>

                    </SinglePriceBlock>
                )
            })}                
        </TokenPriceChartWrapper>
    )

}