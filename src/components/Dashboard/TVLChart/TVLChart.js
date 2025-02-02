import React, {useContext, useEffect, useRef, useState} from 'react';
import {AreaChart, Area, LineChart, Line, Tooltip, XAxis, ResponsiveContainer} from 'recharts';
import {useSystemContext} from '../../../systemProvider';
import {formattedNum} from '../../../utils/helpers';
import styled from 'styled-components';
import {useMediaQuery} from 'react-responsive';

const TVLChartWrapper = styled.div`
  background: ${props => props.mobile ? "transparent" : " radial-gradient(61.16% 3404.86% at 48.28% 79.61%, rgba(30, 117, 89, 0.3) 0%, rgba(9, 33, 25, 0.3) 100%), linear-gradient(90.99deg, #272727 2.18%, #1C1C1C 104.4%)"};
  box-shadow: ${props => props.mobile ? "none" : "0px 4px 16px rgba(0, 0, 0, 0.25)"};
  border-radius: 2vw;
  height: ${props => props.mobile ? "100%" : "45vh"};
  width: 100%;
  display: grid;
  align-self: center;
  box-sizing: border-box;
  justify-self: flex-start;
  grid-template-rows: 28% 70%;
  padding: ${props => props.mobile ? "0" : "3.5% 10.5%"};
  @media screen and (max-width: 480px) {
    grid-template-rows: 20% 70%;
    padding-top: 19px;
  }
  @media screen and (min-width: 500px) and (max-width: 768px) {
    height: ${props => props.mobile ? "100%" : "23vh"};
  }

  .tvl-info {
    display: grid;
    padding: ${props => props.mobile ? "0 7.5%" : "0"};
    grid-template-rows: ${props => props.mobile ? " 2fr 1fr" : " 1fr 3fr 1fr"};

    p {
      font-weight: 500;
      font-size: ${props => props.mobile ? "12px" : "1.1vw"};
      color: ${props => props.mobile ? "#BDBDBD" : "white"};
    }

    h1 {
      color: ${props => props.mobile ? "white" : "#40BA93"};
      font-weight: ${props => props.mobile ? "600" : "500"};
      font-size: ${props => props.mobile ? "24px" : "2.1vw"};
      align-self: flex-end;
    }

    @media screen and (max-width: 480px) {
      margin-bottom: 24px;
    }
  }
`

export const TVLChart = () => {

    const {theme} = useSystemContext();
    const isMobileScreen = useMediaQuery({query: '(max-width: 767px)'})

    const data = [
        {time: '01', uv: 100000, date: "Jul 1, 2021"},
        {time: '02', uv: 110000, date: "Jul 2, 2021"},
        {time: '03', uv: 90000, date: "Jul 3, 2021"},
        {time: '04', uv: 100000, date: "Jul 4, 2021"},
        {time: '05', uv: 150000, date: "Jul 5, 2021"},
        {time: '06', uv: 125000, date: "Jul 6, 2021"},
        {time: '07', uv: 126000, date: "Jul 7, 2021"},
        {time: '08', uv: 143000, date: "Jul 8, 2021"},
        {time: '09', uv: 130000, date: "Jul 9, 2021"},
        {time: '10', uv: 200000, date: "Jul 10, 2021"},
        {time: '11', uv: 400000, date: "Jul 11, 2021"},
        {time: '12', uv: 500000, date: "Jul 12, 2021"},
        {time: '13', uv: 600000, date: "Jul 13, 2021"},
        {time: '14', uv: 800000, date: "Jul 14, 2021"},
        {time: '15', uv: 1000000, date: "Jul 15, 2021"},
        {time: '16', uv: 900000, date: "Jul 16, 2021"},
    ];

    const [chartValue, setChartValue] = useState({
        time: data[data.length - 1].date,
        value: data[data.length - 1].uv
    })

    // TODO: Make a more better and accurate styles for this window. See /dashboards
    return (
        <TVLChartWrapper mobile={isMobileScreen}>
            <div className={'tvl-info'}>
                {!isMobileScreen ? <p>Total Value Locked</p> : null}
                <h1>${formattedNum(chartValue.value)}</h1>
                <p>{chartValue.time}</p>
            </div>
            <div className={'tvl-chart'}>
                <ResponsiveContainer width={"100%"} height={"100%"}>
                    {isMobileScreen ?
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="10%" stopColor="#40BA93" stopOpacity={1}/>
                                    <stop offset="90%" stopColor="rgba(64, 186, 147, 0)" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="time"
                                   axisLine={false}
                                   tickLine={false}
                                   stroke={theme === "light" ? "black" : "white"}
                            />
                            <Area type="monotone" strokeWidth={1} dataKey="uv" stroke="#40BA93" fill="url(#colorUv)"/>
                        </AreaChart>
                        :
                        <LineChart
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 1,
                            }}
                            data={data}
                            onMouseLeave={() => setChartValue({
                                time: data[data.length - 1].date,
                                value: data[data.length - 1].uv
                            })}
                        >
                            <Line
                                type="monotone"
                                dataKey="uv"
                                stroke="rgba(64, 186, 147, 0.05)"
                                strokeWidth={"1vw"}
                                dot={false}
                                activeDot={true}
                            />
                            <Line
                                type="monotone"
                                dataKey="uv"
                                stroke="#40BA93"
                                strokeWidth={"0.25vw"}
                                dot={false}
                                activeDot={true}
                            />
                            <Tooltip
                                contentStyle={{display: 'none'}}
                                formatter={(value, name, props) => {
                                    const {payload: {date, uv}} = props;
                                    if (chartValue.value !== uv) {
                                        setChartValue({time: date, value: uv})
                                    }
                                }}
                            />
                            <XAxis
                                dataKey="time"
                                axisLine={false}
                                tickLine={false}
                                tick={{fontSize: "1vw"}}
                                stroke={theme === "light" ? "black" : "white"}
                            />
                        </LineChart>
                    }
                </ResponsiveContainer>
            </div>
        </TVLChartWrapper>
    )

}
