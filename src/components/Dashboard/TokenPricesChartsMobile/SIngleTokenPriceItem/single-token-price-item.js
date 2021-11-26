import React from 'react';
import styled from 'styled-components';
import { formattedNum } from '../../../../utils/helpers';
import { AreaChart, XAxis, Area, ResponsiveContainer } from 'recharts';
import { useSystemContext } from '../../../../systemProvider';
import arrowUp from '../../TokenPricesCharts/arrow-up.svg';
import arrowDown from '../../TokenPricesCharts/arrow-down.svg';

const SingleTokenItemWrapper = styled.div`
    display: grid;
    grid-template-rows: 10% 10% 10% 48% 10% 2% 10%;
    border-right: 1px solid #40BA93;
    box-sizing: border-box;
    padding: 0px 10px;
    &:last-child {
        border-right: none;
    }
    h1 {
        width: 100%;
        font-size: 18px;
        color: #40BA93;
        justify-self: flex-start;
    }
    h3 {
        font-size: 14px;
    }
    h5 {
        font-size: 12px;
        img {
            width: 12px;
            height: 12px;
        }
    }

    .single-token-name-time {
        font-size: 14px;

        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`

const BottomInfo = styled.div`
    background: #EAEBEF;
    border-radius: 12px;
    display: grid;
    align-items: center;
    grid-template-columns: auto auto;
    padding: 0px 14px;
    span {
        font-size: 10px;
        color: #838995;
        &:last-child {
            color: black;
            justify-self: flex-end;
        }
    }
`

export const SingleTokenPriceItem = ({token}) => {

    console.log(token);

    const {name, currentPrice, change24h, chartPrices, supply, marketCap} = token;

    const {theme} = useSystemContext();

    const Arrow = change24h.charAt(0) === "-" ? <img src={arrowDown} alt="arrow-down-percent"/> : <img src={arrowUp} alt="arrow-up-percent"/>

    return (
        <SingleTokenItemWrapper> 
            <div className='single-token-name-time'>
                <h3> {name} </h3>
                <p>(24)</p>
            </div>
            <h1> $ {formattedNum(currentPrice)} </h1>
            <h5> {Arrow} {change24h} </h5>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartPrices}>
                    <defs> 
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="10%" stopColor="#40BA93" stopOpacity={1}/>
                        <stop offset="90%" stopColor="rgba(64, 186, 147, 0)" stopOpacity={0}/>
                    </linearGradient>
                    </defs>
                    <XAxis dataKey="time"
                        axisLine={false}
                        tickLine={false}
                        tick={{fontSize: 10, color: "#828282", fontWeight: 300}}
                        interval={1}
                        stroke={theme === "light" ? "white" : "black"}
                    />
                    <Area type="monotone" strokeWidth={1} dataKey="value" stroke="#40BA93" fill="url(#colorUv)" />
                </AreaChart>
            </ResponsiveContainer>
            <BottomInfo> <span>Supply:</span> <span> {formattedNum(supply)} </span></BottomInfo>
            <div></div>
            <BottomInfo> <span>Market cap:</span> <span> {formattedNum(marketCap)} </span></BottomInfo>
        </SingleTokenItemWrapper>
    )
}