import React, {useContext, useState} from 'react';
import {Layout} from '../Layout/layout';
import {TokenIcon} from '../TokenIcon/token_icon';
import {ProvideLiquidity} from './ProvideLiquidity/provide_liquidity';
import {Liquidity} from './Liquidity/liquidity';
import {Volume} from './Volume/volume';
import {PieChart, Pie, Sector, Cell, ResponsiveContainer} from 'recharts';
import './liquidity-pools.scss';
import {useSystemContext} from '../../systemProvider';

export const LiquidityPools = () => {

    const [liquidityPools, setLiquidityPools] = useState([
        {firstToken: "AGO", secondToken: "MATIC", liquidity: "$400,000,000", myLiquidity: "-", apy: "30%"},
        {firstToken: "CNBTC", secondToken: "MATIC", liquidity: "$400,000,000", myLiquidity: "-", apy: "30%"},
        {firstToken: "AGOBTC", secondToken: "WBTC", liquidity: "$400,000,000", myLiquidity: "-", apy: "30%"},
        {firstToken: "AGOUSD", secondToken: "USDT", liquidity: "$400,000,000", myLiquidity: "-", apy: "30%"},
        {firstToken: "CNUSD", secondToken: "MATIC", liquidity: "$400,000,000", myLiquidity: "-", apy: "30%"},
        {firstToken: "CNUSD", secondToken: "MATIC", liquidity: "$400,000,000", myLiquidity: "-", apy: "30%"},
    ]);
    const {theme} = useSystemContext();

    const [itemChoosenWindow, setItemChoosenWindow] = useState("Volume");


    const [openedWindows, setOpenedWindows] = useState([]);

    const handleLiquidityPoolsOpened = (name) => {

        const isName = openedWindows.findIndex((item) => item === name);

        if (isName === -1) {
            setOpenedWindows([...openedWindows, name]);
        } else {

            const tempArr = openedWindows;
            tempArr.splice(isName, 1);
            setOpenedWindows([...tempArr]);

        }
    }

    const ExpandedTab = (pool) => {

        switch (itemChoosenWindow) {
            case "Provide Liquidity":
                return (<ProvideLiquidity pool={pool}/>)
            case "Volume":
                return (<Volume/>)
            case "Liquidity":
                return (<Liquidity/>)
            default:
                return (<ProvideLiquidity/>)
        }
    }

    const ProvideLiquidityPieChart = ({token1, token2}) => {


        const data = [
            {name: token1, value: 400},
            {name: token2, value: 400},
        ];

        const RADIAN = Math.PI / 180;
        const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
                <text x={x > cx ? x - 20 : x + 20} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central">
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
            );
        };

        return (
            <div className='chart-block'>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={100} height={100}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0" stopColor="#40BA93"/>
                                <stop offset="1" stopColor="rgba(64, 186, 147, 0.25)"/>
                            </linearGradient>
                        </defs>
                        <defs>
                            <linearGradient id="colorUvSecond" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0" stopColor="#358269"/>
                                <stop offset="1" stopColor="rgba(53, 130, 105, 0.25)"/>
                            </linearGradient>
                        </defs>
                        <Pie
                            startAngle={90}
                            endAngle={450}
                            data={data}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={100}
                            stroke="none"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`}
                                      fill={index === 0 ? "url(#colorUv)" : "url(#colorUvSecond)"}/>
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        )

    }


    return (
        <div className={`luqidity-pools-wrapper ${theme === "light" ? " luqidity-pools-wrapper-light" : ""}`}>
            {/*<h1> Liquidity Pools </h1>*/}
            <div className='luqidity-pools-wrapper__list-header'>
                <h5> Pool </h5>
                <h5> Liquidity </h5>
                <h5> My Liquidity </h5>
                <h5> APY </h5>
            </div>
            <ul className='luqidity-pools-wrapper-list'>
                {liquidityPools.map((item) => {

                    const windowExpanded = openedWindows.findIndex((name) => name === item.firstToken + item.secondToken) !== -1;

                    return (
                        <li className={`${windowExpanded ? "luqidity-pools-wrapper-list-item liq-item-opened" : "luqidity-pools-wrapper-list-item"}`}>
                            <div className='pair'>
                                <TokenIcon iconName={item.firstToken}/>
                                <TokenIcon iconName={item.secondToken}/>
                                <h3> {item.firstToken}-{item.secondToken} </h3>
                            </div>
                            <h3> {item.liquidity} </h3>
                            <h3> {item.myLiquidity} </h3>
                            <h3> {item.apy} </h3>
                            <button className='chart-expand'
                                    onClick={() => handleLiquidityPoolsOpened(item.firstToken + item.secondToken)}> {windowExpanded ?
                                <i class="fas fa-times"></i> : <i class="fas fa-chart-line"></i>} </button>
                            {windowExpanded ?
                                <div className='control-panel'>
                                    <div className='control-panel__header'>
                                        <button onClick={() => setItemChoosenWindow("Provide Liquidity")}
                                                className={`${itemChoosenWindow === "Provide Liquidity" ? "active" : ""}`}> Provide
                                            Liquidity
                                        </button>
                                        <button onClick={() => setItemChoosenWindow("Volume")}
                                                className={`${itemChoosenWindow === "Volume" ? "active" : ""}`}> Volume
                                        </button>
                                        <button onClick={() => setItemChoosenWindow("Liquidity")}
                                                className={`${itemChoosenWindow === "Liquidity" ? "active" : ""}`}> Liquidity
                                        </button>
                                    </div>
                                    <div className="control-panel__content">
                                        {/* TODO: Make this stuff work just for choosen item */}
                                        <ExpandedTab pool={item}/>
                                        {itemChoosenWindow === "Provide Liquidity" ?
                                            <div className='provide-liq-wrapper'>
                                                <ProvideLiquidityPieChart token1={item.firstToken}
                                                                          token2={item.secondToken}/>
                                                <button> Porvide</button>
                                            </div>
                                            :
                                            <div className='liq-info'>
                                                <span> <h5>Liquidity </h5> <b> $685,105,818 </b> </span>
                                                <span> <h5>Volume (24H) </h5> <b> $11,552,984 </b> </span>
                                                <span> <h5>Earnings (24H) </h5> <b> $51,544 </b> </span>
                                                <span> <h5>Total APY </h5> <b> 31.84% </b> </span>
                                                <span> <h5>My Liquidity </h5> <b> $0 </b> </span>
                                            </div>
                                        }

                                    </div>
                                </div>
                                :
                                ""
                            }
                        </li>
                    )
                })}
            </ul>
        </div>

    )

}

export default LiquidityPools;
