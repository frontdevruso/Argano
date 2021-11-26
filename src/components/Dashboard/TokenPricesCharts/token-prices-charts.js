import React, {useContext, useEffect, useState, useRef} from 'react';
import {formattedNum} from '../../../utils/helpers';
import arrowUp from './arrow-up.svg';
import arrowDown from './arrow-down.svg';
import {LineChart, XAxis, YAxis, Line, ResponsiveContainer, Tooltip} from 'recharts';
import {} from '../../App/App';
import {useSystemContext} from '../../../systemProvider';
import {useDashboardContext} from '../../../providers/dashboard-provider';
import styled from 'styled-components';


const TokenPriceChartWrapper = styled.div`
  position: relative;
  width: 100%;
  transition: 0.3s all;
  height: ${props => props.isWindowExpanded ? "51vh" : "200px"};
  background: radial-gradient(61.16% 3404.86% at 48.28% 79.61%, rgba(30, 117, 89, 0.3) 0%, rgba(9, 33, 25, 0.3) 100%), linear-gradient(90.99deg, #272727 2.18%, #1C1C1C 104.4%);
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.25);
  border-radius: 2vw;
  box-sizing: border-box;
  padding: 2.5% 2.3%;
  display: grid;
  align-items: ${props => props.isWindowExpanded ? "flex-start" : "center"};;
  grid-template-columns: 0.85fr 1.1fr 1fr 0.95fr;
  
  // Responsive || Width => Height

  @media only screen and (max-width: 1880px) {
    height: ${props => props.isWindowExpanded ? "51vh" : "11vw"} !important;
  }

  @media only screen and (max-width: 1780px) {
    height: ${props => props.isWindowExpanded ? "51vh" : "12vw"} !important;
  }

  // Responsive || Height

  @media screen and (min-height: 1710px) and (max-height: 2110px) {
    height: ${props => props.isWindowExpanded ? "51vh" : "13vh"};
  }
  
  @media screen and (min-height: 1610px) and (max-height: 1710px) {
    height: ${props => props.isWindowExpanded ? "51vh" : "14vh"};
  }

  @media screen and (min-height: 1510px) and (max-height: 1610px) {
    height: ${props => props.isWindowExpanded ? "51vh" : "14vh"};
  }

  @media screen and (min-height: 1340px) and (max-height: 1510px) {
    height: ${props => props.isWindowExpanded ? "51vh" : "15vh"};
  }

  @media screen and (min-height: 1240px) and (max-height: 1340px) {
    height: ${props => props.isWindowExpanded ? "51vh" : "16vh"};
  }
  @media screen and (min-height: 1120px) and (max-height: 1240px) {
    height: ${props => props.isWindowExpanded ? "51vh" : "18vh"};
  }

  @media screen and (min-height: 1080px) and (max-height: 1120px) {
    height: ${props => props.isWindowExpanded ? "51vh" : "19vh"};
  }

  @media screen and (min-height: 992px) and (max-height: 1080px) {
    height: ${props => props.isWindowExpanded ? "51vh" : "21vh"};
  }

  @media screen and (min-height: 850px) and (max-height: 992px) {
    height: ${props => props.isWindowExpanded ? "51vh" : "23vh"};
  }

  @media screen and (min-height: 800px) and (max-height: 850px) {
    height: ${props => props.isWindowExpanded ? "51vh" : "25vh"};
  }

  @media screen and (min-height: 690px) and (max-height: 800px) {
    height: ${props => props.isWindowExpanded ? "51vh" : "29vh"};
  }

  @media screen and (min-height: 590px) and (max-height: 690px) {
    height: ${props => props.isWindowExpanded ? "51vh" : "33vh"};
  }

  @media screen and (min-height: 550px) and (max-height: 590px) {
    height: ${props => props.isWindowExpanded ? "51vh" : "38vh"};
  }

  @media screen and (min-height: 500px) and (max-height: 550px) {
    height: ${props => props.isWindowExpanded ? "51vh" : "41vh"};
  }

  @media screen and (min-height: 450px) and (max-height: 500px) {
    height: ${props => props.isWindowExpanded ? "51vh" : "44vh"};
  }

  @media screen and (min-height: 400px) and (max-height: 450px) {
    height: ${props => props.isWindowExpanded ? "51vh" : "49vh"};
  }

  @media screen and (min-height: 350px) and (max-height: 400px) {
    height: ${props => props.isWindowExpanded ? "51vh" : "55vh"};
  }

  @media screen and (min-height: 300px) and (max-height: 350px) {
    height: ${props => props.isWindowExpanded ? "51vh" : "65vh"};
  }

  @media screen and (min-height: 250px) and (max-height: 300px) {
    height: ${props => props.isWindowExpanded ? "51vh" : "75vh"};
  }

  @media screen and (min-height: 200px) and (max-height: 250px) {
    height: ${props => props.isWindowExpanded ? "51vh" : "89vh"};
  }

  @media screen and (min-height: 50px) and (max-height: 200px) {
    height: ${props => props.isWindowExpanded ? "51vh" : "124vh"};
  }

  // Responsive || Width

  @media screen and (min-width: 500px) and (max-width: 768px) {
    width: 95%;
    height: ${props => props.isWindowExpanded ? "51vh" : "12vh"};
    padding: 0;
  }
`

const SinglePriceBlock = styled.div`
  border-right: ${props => props.isWindowExpanded ? props.isShowDivider ? "1px solid #40BA93" : "none" : "1px solid #40BA93"};
  padding-left: 40px;
  @media screen and (min-width: 500px) and (max-width: 768px) {
    padding-left: 28px;
  }

  &:last-child {
    border-right: none;
  }

  h3 {
    font-size: 1vw;
    color: white;
    @media screen and (min-width: 500px) and (max-width: 768px) {
      font-size: 2vw;
    }
  }

  h1 {
    font-size: 2.1vw;
    color: #40BA93;
    @media screen and (min-width: 500px) and (max-width: 768px) {
      font-size: 2.6vw;
    }
  }

  span {
    display: flex;
    align-items: center;

    font-size: 0.6vw;
    color: white;

    @media screen and (min-width: 500px) and (max-width: 768px) {
      font-size: 1.2vw;
    }

    img {
      width: 0.8vw;
      height: 1.1vw;
      margin-right: 6px;
      margin-left: 5px;
      @media screen and (min-width: 500px) and (max-width: 768px) {
        width: 1vw;
        margin-right: 2px;
      }
    }

    span {
      color: #4F4F4F;
      margin-left: 9px;
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
            <ResponsiveContainer width={'100%'} height={"100%"}>//
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

    const [showChart, setShowChart] = useState({active: true, index: 0})

    return (
        <TokenPriceChartWrapper isWindowExpanded={expandWindow} onClick={() => setExpandWindow(!expandWindow)}>
            {dashTokens.map((item, _ind) => {

                const Arrow = item.change24h.charAt(0) === "-" ? <img src={arrowDown} alt="arrow-down-percent"/> :
                    <img src={arrowUp} alt="arrow-up-percent"/>

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