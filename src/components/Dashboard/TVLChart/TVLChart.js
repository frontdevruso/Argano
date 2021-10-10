import React, {useContext, useEffect, useRef, useState} from 'react';
import { LineChart, Line, Tooltip, XAxis, ResponsiveContainer } from 'recharts';
import { useSystemContext } from '../../../systemProvider';
import { formattedNum } from '../../../utils/helpers';
export const TVLChart = () => {

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
        {time: '16', uv: 900000, date: "Jul 16, 2021"},
    ];

    const [chartValue, setChartValue] = useState({
        time: data[data.length-1].date,
        value: data[data.length-1].uv
    })




    // TODO: Make a more better and accurate styles for this window. See /dashboards
    return (

        <div className={`dashBox tvl ${theme === "light" ? " dashBoxLight" : ""}`}>
            <div className={'tvl-info'}>
                <p>Total Value Locked</p>
                <h1>${formattedNum(chartValue.value)}</h1>
                <p>{chartValue.time}</p>
            </div>
            <div className={'tvl-chart'}>
                <ResponsiveContainer width={"100%"} height={"90%"}>
                    <LineChart
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 1,
                        }}  
                        data={data}
                        onMouseLeave={() => setChartValue({
                            time: data[data.length-1].date,
                            value: data[data.length-1].uv
                        })}
                        >
                        
                        <Line
                            type="monotone"
                            dataKey="uv"
                            stroke="rgba(64, 186, 147, 0.1)"
                            strokeWidth={10}
                            dot={false}
                            activeDot={true}
                        />
                        <Line
                            type="monotone"
                            dataKey="uv"
                            stroke="#40BA93"
                            strokeWidth={5}
                            dot={false}
                            activeDot={true}
                        />
                        <Line
                            type="monotone"
                            dataKey="uv"
                            stroke="rgba(0, 0, 0, 0.6);"
                            strokeWidth={10}
                            dot={false}
                            activeDot={true}
                        />
                        <Tooltip
                            contentStyle={{ display: 'none' }}
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
                            stroke={theme === "light" ? "black" : "white"}
                        />

                    </LineChart>
                </ResponsiveContainer>

            </div>
        </div>
    )

}
