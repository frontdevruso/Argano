import React, {useState, useRef, useContext} from 'react';
import { BarChart, XAxis, Bar, Tooltip, ResponsiveContainer, Cell, YAxis, CartesianGrid } from 'recharts';
import { useSystemContext } from '../../../systemProvider';
import { formattedNum } from '../../../utils/helpers';

export const Volume = () => {

    const {theme} = useSystemContext();

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
        {time: '31', uv: 1000000, date: "Jul 15, 2021"},
        {time: '01', uv: 900000, date: "Jul 16, 2021"},
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
            <rect x={x} y={y} fill={fill} width={10} height={height} rx="7" />
          </g>
        )
    }

    return (
        <ResponsiveContainer className="liq-chart" width={"100%"} height={250}>
            <BarChart
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 1,
                }}  
                data={data}

                // onMouseLeave={() => setChartValue({
                //     time: data[data.length-1].date,
                //     value: data[data.length-1].uv
                // })}
                >
                <defs>
                    <linearGradient
                    id="colorUv"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="100%"
                    gradientUnits="userSpaceOnUse"
                    >
                    <stop offset="0" stopColor="#40BA93" />
                    <stop offset="1" stopColor="rgba(64, 186, 147, 0)" />
                    </linearGradient>
                    <linearGradient id="colorUvLightTheme" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0" stopColor="#40BA93"/>
                                <stop offset="1" stopColor="rgba(64, 186, 147, 0.72)"/>
                    </linearGradient>
                    <linearGradient id="colorUvSecondLightTheme" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0" stopColor="#40BA93"/>
                                <stop offset="1" stopColor="#114D3A"/>
                    </linearGradient>
                </defs>
                <defs> 
                    <linearGradient
                    id="colorUvSecond"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="100%"
                    gradientUnits="userSpaceOnUse"
                    >
                    <stop offset="0" stopColor="#40BA93" />
                    <stop offset="1" stopColor="rgba(64, 186, 147, 0.72)" />
                    </linearGradient>
                </defs>
                <CartesianGrid stroke={theme === "light" ? "white" : "#3A3C45"}   strokeDasharray="7 7"/>
                <Bar
                    dataKey="uv"
                    radius={[10, 10, 10, 10]}
                    shape={<CustomBar/>}
                >
                    {data.map((entry, _ind )=> {
                        return <Cell fill={_ind % 2 === 0 || _ind % 3 === 0 ? 'url(#colorUvLightTheme)' : 'url(#colorUvSecondLightTheme)' }/>
                    })}
                </Bar>

                <Tooltip
                    contentStyle={{ display: 'none' }}
                    cursor={{ fill: "rgba(255, 255, 255, 0.15)" }}
                    // formatter={(value, name, props) => {
                    //     const {payload: {date, uv}} = props;
                    //     if (chartValue.value !== uv) {
                    //         setChartValue({time: date, value: uv})
                    //     }
                    // }}
                />
                <XAxis
                    dataKey="time"
                    axisLine={true}
                    tickLine={false}
                    stroke={theme === "light" ? "black" : "white"}
                    interval={8}
                    // tickCount={8}
                    // minTickGap={100}
                />
                <YAxis
                    dataKey="uv"
                    axisLine={true}
                    tickLine={false}
                    stroke={theme === "light" ? "black" : "white"}

                    tickFormatter={(tick) => {
                        return `${formattedNum(tick)}`
                    }}
                    interval="preserveStartEnd"
                    domain={[0, Math.max.apply(Math, data.map((obj) => obj.uv ))]}
                    // minTickGap={30}
                />

            </BarChart>
        </ResponsiveContainer>
    )

}