import React, { useContext } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSystemContext } from '../../../systemProvider';

export const Liquidity = () => {

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



    return(
        <ResponsiveContainer className='liq-chart' width="100%" height={220}>
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme === "light" ? "white" : "#3A3C45"} />
          <XAxis dataKey="time"
                              axisLine={true}
                              tickLine={false}
                              stroke={theme === "light" ? "black" : "white"}
                              interval={8} />
          <Tooltip />
          <Area type="monotone" strokeWidth={3} dataKey="uv" stroke="#40BA93" fill="rgba(64, 186, 147, 0.2)" />
        </AreaChart>
      </ResponsiveContainer>
    )

}