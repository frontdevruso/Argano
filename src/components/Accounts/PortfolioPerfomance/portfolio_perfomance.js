import React, {useState} from 'react';

import { ResponsiveContainer, LineChart, Line, Tooltip, XAxis} from 'recharts';
import { useSystemContext } from '../../../systemProvider';
import { formattedNum } from '../../../utils/helpers';

export const PortfolioPerfomance = () => {

    const {userPortfolio} = useSystemContext();

    const mockPortfolioPerfChart = [
        {time: '01', uv: 100, date: "Jul 1, 2021"},
        {time: '02', uv: 200, date: "Jul 2, 2021"},
        {time: '03', uv: 100, date: "Jul 3, 2021"},
        {time: '04', uv: 250, date: "Jul 4, 2021"},
        {time: '05', uv: 300, date: "Jul 5, 2021"},
        {time: '06', uv: 100, date: "Jul 6, 2021"},
        {time: '07', uv: 200, date: "Jul 7, 2021"},
        {time: '08', uv: 300, date: "Jul 8, 2021"},
        {time: '09', uv: 250, date: "Jul 9, 2021"},
        {time: '10', uv: 500, date: "Jul 10, 2021"},
        {time: '11', uv: 400, date: "Jul 11, 2021"},
        {time: '12', uv: 300, date: "Jul 12, 2021"},
        {time: '13', uv: 500, date: "Jul 13, 2021"},
        {time: '14', uv: 200, date: "Jul 14, 2021"},
        {time: '15', uv: 100, date: "Jul 15, 2021"},
        {time: '16', uv: 150, date: "Jul 16, 2021"},
    ]

    const getPortfolioData = async () => {

    }

    const [portfolioPerfValue, setPortfolioPerfValue] = useState(mockPortfolioPerfChart[mockPortfolioPerfChart.length - 1].uv);


    return (
        <div className="accounts-wrapper-portoflio-perf main-block"> 
        <div className='accounts-wrapper-portoflio-perf__header-control-panel'>
            <h1> Portfolio perfomance </h1>
            <div className='accounts-wrapper-portoflio-perf__header-control-panel__time-frame-list'> 
                <button className='active-frame'> 1H </button>
                <button> 1D </button>
                <button> 1W </button>
                <button> 1M </button>
                <button> 1Y </button>
            </div>
        </div>
        <div className='accounts-wrapper-portoflio-perf__price-change'>
            <h1> ${formattedNum(portfolioPerfValue)} </h1>
        </div>
        <div className='accounts-wrapper-portoflio-perf__chart'>
        <ResponsiveContainer width={"100%"} height={"90%"}>
            <LineChart
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 1,
                }}  
                data={mockPortfolioPerfChart}
                >
                <Line
                    type="monotone"
                    dataKey="uv"
                    stroke="#40BA93"
                    strokeWidth={5}
                    dot={false}
                    activeDot={true}
                />
                <Tooltip
                    contentStyle={{ display: 'none' }}
                    formatter={(value, name, props) => {
                        const {payload: {uv}} = props;
                        if (portfolioPerfValue.value !== uv) {
                            setPortfolioPerfValue(uv)
                        }
                      }}
                />
                <XAxis
                    dataKey="time"
                    axisLine={false}
                    tickLine={false}
                    tick={{ color: "white" }}
                />

            </LineChart>
        </ResponsiveContainer>
        </div>

    </div>
    )

}