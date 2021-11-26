import React, {useState, useRef} from 'react';
import {BarChart, XAxis, Bar, Tooltip, ResponsiveContainer} from 'recharts';
import {useSystemContext} from '../../../systemProvider';
import {formattedNum} from '../../../utils/helpers';
import {useMediaQuery} from 'react-responsive';
import styled from 'styled-components';

const Volume24hChartWrapper = styled.div`
  background: ${props => props.mobile ? "transparent" : " radial-gradient(61.16% 3404.86% at 48.28% 79.61%, rgba(30, 117, 89, 0.3) 0%, rgba(9, 33, 25, 0.3) 100%), linear-gradient(90.99deg, #272727 2.18%, #1C1C1C 104.4%)"};
  box-shadow: ${props => props.mobile ? "none" : "0px 4px 16px rgba(0, 0, 0, 0.25)"};
  border-radius: 2vw;
  height: ${props => props.mobile ? "100%" : "50vh"};
  width: 100%;
  display: grid;
  align-self: center;
  box-sizing: border-box;
  justify-self: flex-start;
  grid-template-rows: 30% 70%;
  padding: ${props => props.mobile ? "0" : "4.5% 11.5%"};
  @media screen and (max-width: 480px) {
    grid-template-rows: 20% 70%;
  }

  // Responsive || Width => Height

  @media only screen and (max-width: 1880px) {
    height: ${props => props.mobile ? "100%" : "30vw"} !important;
  }

  @media only screen and (max-width: 1780px) {
    height: ${props => props.mobile ? "100%" : "31vw"} !important;
  }

  @media only screen and (max-width: 1680px) {
    height: ${props => props.mobile ? "100%" : "28vw"} !important;
  }

  // Responsive || HEIGHT

  @media screen and (min-height: 1710px) and (max-height: 2110px) {
    height: ${props => props.mobile ? "100%" : "29vh"};
  }
  @media screen and (min-height: 1610px) and (max-height: 1710px) {
    height: ${props => props.mobile ? "100%" : "30vh"};
  }
  @media screen and (min-height: 1510px) and (max-height: 1610px) {
    height: ${props => props.mobile ? "100%" : "32vh"};
  }

  @media screen and (min-height: 1340px) and (max-height: 1510px) {
    height: ${props => props.mobile ? "100%" : "35vh"};
  }

  @media screen and (min-height: 1120px) and (max-height: 1340px) {
    height: ${props => props.mobile ? "100%" : "40vh"};
  }

  @media screen and (min-height: 1080px) and (max-height: 1120px) {
    height: ${props => props.mobile ? "100%" : "45vh"};
  }

  @media screen and (min-height: 992px) and (max-height: 1080px) {
    height: ${props => props.mobile ? "100%" : "50vh"};
  }

  @media screen and (min-height: 850px) and (max-height: 992px) {
    height: ${props => props.mobile ? "100%" : "55vh"};
  }

  @media screen and (min-height: 800px) and (max-height: 850px) {
    height: ${props => props.mobile ? "100%" : "60vh"};
  }

  @media screen and (min-height: 690px) and (max-height: 800px) {
    height: ${props => props.mobile ? "100%" : "70vh"};
  }

  @media screen and (min-height: 500px) and (max-height: 690px) {
    height: ${props => props.mobile ? "100%" : "80vh"};
  }

  @media screen and (min-height: 500px) and (max-height: 590px) {
    height: ${props => props.mobile ? "100%" : "90vh"};
  }

  @media screen and (min-height: 500px) and (max-height: 550px) {
    height: ${props => props.mobile ? "100%" : "100vh"};
  }

  @media screen and (min-height: 450px) and (max-height: 500px) {
    height: ${props => props.mobile ? "100%" : "110vh"};
  }

  @media screen and (min-height: 450px) and (max-height: 500px) {
    height: ${props => props.mobile ? "100%" : "110vh"};
  }

  @media screen and (min-height: 400px) and (max-height: 450px) {
    height: ${props => props.mobile ? "100%" : "120vh"};
  }

  @media screen and (min-height: 350px) and (max-height: 400px) {
    height: ${props => props.mobile ? "100%" : "130vh"};
  }

  @media screen and (min-height: 300px) and (max-height: 350px) {
    height: ${props => props.mobile ? "100%" : "150vh"};
  }

  @media screen and (min-height: 250px) and (max-height: 300px) {
    height: ${props => props.mobile ? "100%" : "200vh"};
  }

  @media screen and (min-height: 200px) and (max-height: 250px) {
    height: ${props => props.mobile ? "100%" : "220vh"};
  }

  @media screen and (min-height: 50px) and (max-height: 200px) {
    height: ${props => props.mobile ? "100%" : "280vh"};
  }

  Responsive || Width

  @media screen and (min-width: 500px) and (max-width: 768px) {
    height: ${props => props.mobile ? "100%" : "23vh"};
  }

  .volume24-info {
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
  }
`

export const Volume24h = () => {

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
        {time: '16', uv: 1100000, date: "Jul 16, 2021"},
        {time: '17', uv: 1100000, date: "Jul 1, 2021"},
        {time: '18', uv: 1310000, date: "Jul 2, 2021"},
        {time: '19', uv: 900000, date: "Jul 3, 2021"},
        {time: '20', uv: 1000000, date: "Jul 4, 2021"},
        {time: '21', uv: 1050000, date: "Jul 5, 2021"},
        {time: '22', uv: 1025000, date: "Jul 6, 2021"},
        {time: '23', uv: 1260000, date: "Jul 7, 2021"},
        {time: '24', uv: 900000, date: "Jul 8, 2021"},
        {time: '25', uv: 1030000, date: "Jul 9, 2021"},
        {time: '26', uv: 200000, date: "Jul 10, 2021"},
        {time: '27', uv: 400000, date: "Jul 11, 2021"},
        {time: '28', uv: 500000, date: "Jul 12, 2021"},
        {time: '29', uv: 600000, date: "Jul 13, 2021"},
        {time: '30', uv: 800000, date: "Jul 14, 2021"},
        {time: '31', uv: 1000000, date: "Jul 15, 2021"},
        {time: '01', uv: 900000, date: "Jul 16, 2021"},
    ];

    const [chartValue, setChartValue] = useState({
        time: data[data.length - 1].date,
        value: data[data.length - 1].uv
    })


    const block = useRef(null)

    const CustomBar = ({
                           x,
                           y,
                           width,
                           height,
                           fill,
                       }) => {
        return (
            <g>
                <rect x={x} y={y} fill={fill} width={width} height={height} rx="1%"/>
            </g>
        )
    }

    return (
        <Volume24hChartWrapper mobile={isMobileScreen}>
            <div className={'volume24-info'}>
                {!isMobileScreen ? <p>Volume 24h</p> : null}
                <h1>${formattedNum(chartValue.value)}</h1>
                <p>{chartValue.time}</p>
            </div>
            <div className={'volume24-chart'}>
                <ResponsiveContainer width={"100%"} height={'100%'}>
                    <BarChart
                        margin={{
                            top: 5,
                            bottom: 1,
                        }}
                        width={block?.current?.clientWidth - 200}
                        height={block?.current?.clientHeight - 50}
                        data={data}
                        onMouseLeave={() => setChartValue({
                            time: data[data.length - 1].date,
                            value: data[data.length - 1].uv
                        })}
                    >
                        <Bar
                            dataKey="uv"
                            shape={(props) => {
                                return <CustomBar height={props.height} width={props.width} x={props.x} y={props.y}
                                                  fill={"#40BA93"}/>
                            }}
                        />
                        <Tooltip
                            contentStyle={{display: 'none'}}
                            cursor={{fill: "rgba(255, 255, 255, 0.15)"}}
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
                            tick={{fontSize: isMobileScreen ? "14px" : "1vw"}}
                            stroke={theme === "light" ? "black" : "white"}
                            minTickGap={isMobileScreen ? 0 : 15}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Volume24hChartWrapper>
    )

}