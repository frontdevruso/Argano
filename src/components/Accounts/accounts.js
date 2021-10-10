import React, { useContext, useState } from 'react';
import history_accounts from '../../assets/icons/history-accounts.svg';
import { TokenIcon } from '../TokenIcon/token_icon';
import { ResponsiveContainer, Pie, PieChart, Cell, Tooltip } from 'recharts';
import './accounts.scss';
import { PortfolioPerfomance } from './PortfolioPerfomance/portfolio_perfomance';
import { AccHistory } from './AccHistory/acc-history';
import { useSystemContext } from '../../systemProvider';

export const Accounts = () => {

    const {theme} = useSystemContext();

    const mockAssetsList = [
        {name: "AGO", value: 10, color: "#40BA93"},
        {name: "AGOUSD", value: 5, color: "#EF3725"},
        {name: "CNUSD", value: 15, color: "#b52f22"},
        {name: "USDT", value: 1, color: "#ff7f73"},
        {name: "AGOBTC", value: 10, color: "#EFBF14"},
        {name: "CNBTC", value: 2, color: "#cca61b"},
        {name: "WBTC", value: 1, color: "#ffde69"},
        {name: "MATIC", value: 20, color: "#563EE7"},
    ]

    const [historyOpened, setHistoryOpened] = useState(false);

    const mockUserStaked = [
        {name: "AGO", staked: 12, reward: 0.013},
        {name: "AGOUSD", staked: 12, reward: 0.013},
        {name: "AGOBTC", staked: 12, reward: 0.013},
        {name: "CNUSD", staked: 12, reward: 0.013},
        {name: "CNBTC", staked: 12, reward: 0.013},
    ]

    const mockUserLiquidityPools = [
        {firstToken: "AGO", secondToken: "MATIC", provided: 110, reward: 10},
        {firstToken: "CNBTC", secondToken: "MATIC", provided: 110, reward: 10},
        {firstToken: "AGOBTC", secondToken: "WBTC", provided: 110, reward: 10},
        {firstToken: "AGOUSD", secondToken: "USDT", provided: 110, reward: 10},
        {firstToken: "CNUSD", secondToken: "MATIC", provided: 110, reward: 10},
    ]

    const PortfolioPieChart = ({mockAssetsList}) => {

        const RADIAN = Math.PI / 180;
        const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
          const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
          const x = cx + radius * Math.cos(-midAngle * RADIAN);
          const y = cy + radius * Math.sin(-midAngle * RADIAN);
        
          return (
            <text x={x} y={y} fill="white" style={{fontSize: 12}} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
              {`${(percent * 100).toFixed(0)}%`}
            </text>
          );
        };

        return (
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={0} height={0}>
                    <Pie
                    startAngle={0} 
                    endAngle={360}
                    data={mockAssetsList}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    stroke="none"
                    dataKey="value"
                    >
                    {mockAssetsList.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
        </ResponsiveContainer>
        )
    }

    return (
        <div className={`accounts-wrapper ${theme === "light" ? " accounts-wrapper-light" : ""}`}> 
            <AccHistory isOpened={historyOpened} setIsOpened={setHistoryOpened}/>
            <h1 className='accounts-wrapper-header'> Accounts </h1>
            <PortfolioPerfomance/>
            <div className="accounts-wrapper-portoflio-assets main-block"> 
                <div className='accounts-wrapper-portoflio-assets__header'> 
                    <div> 
                        <h1> $14.25 </h1>
                        <h1> -$0.175557 (1.2%) </h1>
                    </div>
                    <button onClick={() => setHistoryOpened(true)}> History <img src={history_accounts}/> </button>
                </div>
                <div className='accounts-wrapper-portoflio-assets__assets-chart-info'> 
                    <div className='accounts-wrapper-portoflio-assets__assets-chart-info__pie-chart'>
                        <PortfolioPieChart mockAssetsList={mockAssetsList}/>
                    </div>
                    <div className='accounts-wrapper-portoflio-assets__assets-chart-info__assets-list'>
                        <h3> All assets </h3>
                        <ul> 
                            {mockAssetsList.map((item, _ind) => {
                                return <li key={item.value}> 
                                    <span><TokenIcon iconName={item.name}/> {item.name} </span>
                                    <span className={_ind === 4 ? "negative-change" : ""}> {item.value} </span>
                                </li> 
                            })}
                        </ul>
                    </div>
                </div>
                {/* <div className='accounts-wrapper__portoflio-assets__assets-bottom-info'> 
                    {mockAssetsList.map((item, _ind) => {
                                return <div className='accounts-wrapper__portoflio-assets__assets-bottom-info__item'> 
                                    <span> {item.portfolioPrecente}% </span>
                                    <span><TokenIcon iconName={item.name}/></span>
                                    <span> {item.name}</span>
                                </div> 
                    })}    
                </div> */}
            </div>

            <div className='accounts-wrapper-use-staking-pools secondary-block'> 
                <h1> Staking </h1>
                <div className='accounts-wrapper-use-staking-pools__list-header'> 
                    <span> Pool </span>
                    <span> Staked </span>
                    <span> Reward </span>
                </div>
                <ul> 
                    {mockUserStaked.map((item) => {
                        return (
                            <li key={item.name}>
                                <div>
                                    <TokenIcon iconName={item.name}/>
                                    <span> {item.name} </span>
                                </div>
                                <span> {item.staked} </span>
                                <span> {item.reward} </span>
                            </li>
                        )
                    })}    
                </ul>  
            </div>

            <div className='accounts-wrapper-use-liq-pools secondary-block'> 
                <h1> Pools </h1>
                <div className='accounts-wrapper-use-liq-pools__list-header'> 
                    <span> Pool </span>
                    <span> LP provided </span>
                    <span> Reward </span>
                </div>
                <ul> 
                    {mockUserLiquidityPools.map((item) => {
                        return (
                            <li key={item.firstToken + item.secondToken}>
                                <div className='dual-liq-icons'> 
                                    <div>
                                        <TokenIcon iconName={item.firstToken}/>
                                        <TokenIcon iconName={item.secondToken}/>
                                    </div>
                                    <span> {item.firstToken + "-" + item.secondToken} </span>
                                </div>
                                <span> {item.provided} </span>
                                <span> {item.reward} </span>
                            </li>
                        )
                    })}    
                </ul>  
            </div>


        </div>
    )
}