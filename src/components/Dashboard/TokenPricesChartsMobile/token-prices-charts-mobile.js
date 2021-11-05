import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useSwipeable, UP, DOWN, SwipeEventData } from 'react-swipeable';
import { useDashboardContext } from '../../../providers/dashboard-provider';
import { SingleTokenPriceItem } from './SIngleTokenPriceItem/single-token-price-item';

const TokenPricesWrapper = styled.div`
    position: fixed;
    transition: 0.3s all;
    bottom: 0;
    height: 55vh;
    width: 100%;
    background: white;
    padding: 0px 22px 42px 22px;
    transform: ${props => props.opened ? "translateY(0)" : "translateY(55vh)"};
    border-radius: 40px 40px 0px 0px;
    display: grid;
    grid-template-rows: 0.5fr 0.5fr 0.5fr 3fr;
    h1 {
        font-size: 18px;
        place-self: center;
    }
`

const SwipeDownCloseStripe = styled.div`
    place-self: center;
    width: 15%;
    height: 100%;
    display: grid;
    div {
        width: 100%;
        background: #BDBDBD;
        border-radius: 10px;
        height: 5px;
        place-self: center;
    }
`

const TokenSwitcher = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    box-sizing: border-box;
    button {
        height: 75%;
        border-radius: 15px;
        border: 0;
        font-size: 14px;
        &:first-child {
            font-weight: ${props => props.currency === "AGOUSD" ? "600" : "500"};
            color: ${props => props.currency === "AGOUSD" ? "white" : "#B0B0B0"};
            background: ${props => props.currency === "AGOUSD" ? "#40BA93" : "transparent"}
        }
        &:last-child {
            font-weight: ${props => props.currency === "AGOBTC" ? "600" : "500"};
            color: ${props => props.currency === "AGOBTC" ? "white" : "#B0B0B0"};
            background: ${props => props.currency === "AGOBTC" ? "#40BA93" : "transparent"}
        }
    }
`

const ChartsBlock = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    border: 1px solid #E0E0E0;
    padding: 10px 0px;
    border-radius: 20px;
    box-sizing: border-box;
`

export const TokenPricesChartsMobile = ({opened, setOpened}) => {

    const [currency, setCurrency] = useState("AGOUSD");
    const {dashTokens, dashboardLoading} = useDashboardContext();

    const handlers = useSwipeable({
        onSwipedDown: () => setOpened(false),
        preventDefaultTouchmoveEvent: true,
    })

    return (
        <TokenPricesWrapper opened={opened}> 
            <SwipeDownCloseStripe {...handlers}>
                <div></div>
            </SwipeDownCloseStripe>
            <h1> Informations </h1>
            <TokenSwitcher currency={currency}> 
                <button onClick={() => setCurrency("AGOUSD")}> AGOUSD/CNUSD </button>
                <button onClick={() => setCurrency("AGOBTC")}> AGOBTC/CNBTC </button>
            </TokenSwitcher>
            <ChartsBlock>
                {dashboardLoading && !dashTokens ?
                    <h1> Loading... </h1>
                    :
                    <>
                        <SingleTokenPriceItem token={currency === "AGOUSD" ? dashTokens.find(item => item.name === "AGOUSD") : dashTokens.find(item => item.name === "AGOBTC")}/>
                        <SingleTokenPriceItem token={currency === "AGOUSD" ? dashTokens.find(item => item.name === "CNUSD") : dashTokens.find(item => item.name === "CNBTC")}/>
                    </> 
                }
            </ChartsBlock>
        </TokenPricesWrapper>
    )

}