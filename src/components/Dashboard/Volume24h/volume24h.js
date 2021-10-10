import React, {useState, useRef, useContext} from 'react';
import { BarChart, XAxis, Bar, Tooltip, ResponsiveContainer } from 'recharts';
import { useSystemContext } from '../../../systemProvider';
import { formattedNum } from '../../../utils/helpers';
export const Volume24h = () => {

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
    ];

    const [chartValue, setChartValue] = useState({
        time: data[data.length-1].date,
        value: data[data.length-1].uv
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
            <rect x={x} y={y} fill={fill} width={width} height={height} rx="7" />
          </g>
        )
    }

    return (
        <div className={`dashBox volume24 ${theme === "light" ? " dashBoxLight" : ""}`}> 
            <div className={'volume24-info'}>
                <p>Volume 24h</p>
                <h1>${formattedNum(chartValue.value)}</h1>
                <p>{chartValue.time}</p>
            </div>
            <div className={'volume24-chart'}>
                <ResponsiveContainer width={"100%"} height={'90%'}>
                    <BarChart
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 1,
                        }}  
                        width={block?.current?.clientWidth - 200} 
                        height={block?.current?.clientHeight - 50} 
                        data={data}
                        onMouseLeave={() => setChartValue({
                            time: data[data.length-1].date,
                            value: data[data.length-1].uv
                        })}
                        >
                        <Bar
                            dataKey="uv"
                            shape={(props) => {
                                return <CustomBar height={props.height} width={props.width} x={props.x} y={props.y} fill={"#40BA93"}  />
                            }}
                        />
                        <Tooltip
                            contentStyle={{ display: 'none' }}
                            cursor={{ fill: "rgba(255, 255, 255, 0.15)" }}
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
                            minTickGap={10}
                        />

                    </BarChart>
                </ResponsiveContainer>

            </div>
        </div>
    )

}