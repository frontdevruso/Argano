import React, { useContext, useEffect, useState } from 'react';
import history_accounts from '../../assets/icons/history-accounts.svg';
import { TokenIcon } from '../TokenIcon/token_icon';
import { ResponsiveContainer, Pie, PieChart, Cell, Tooltip } from 'recharts';
import './accounts.scss';
import { PortfolioPerfomance } from './PortfolioPerfomance/portfolio_perfomance';
import { AccHistory } from './AccHistory/acc-history';
import { useSystemContext } from '../../systemProvider';
import { useWeb3React } from '@web3-react/core';
import { formattedNum } from '../../utils/helpers';

export const Accounts = () => {

    const {theme, userProtfolio} = useSystemContext();
    const [sumUserBalances, setSumUserBalances] = useState(0.00);
    const {account} = useWeb3React();

    useEffect(() => {

        if (userProtfolio) {
            setSumUserBalances(formattedNum(userProtfolio.reduce((a, {userUsdBalance}) => a + userUsdBalance, 0)))
        }
    
    }, [userProtfolio])
 
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

    const CustomToolTip = ({active, payload, label}) => {

        if (active) {
            return (
                <div className='pie-account-custom'> 
                    <TokenIcon iconName={payload[0].name}/>
                    <span> {payload[0].name} </span>
                    <span> {formattedNum(payload[0].value)}$ </span>
                </div>
            )
        }

        return null;
    }


    const PortfolioPieChart = ({assetsList}) => {

        return (
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={0} height={0}>
                    <Pie
                    startAngle={0} 
                    endAngle={360}
                    data={assetsList}
                    labelLine={false}
                    // label={renderCustomizedLabel}
                    stroke="none"
                    dataKey="userUsdBalance"
                    >
                    {assetsList.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    </Pie>
                    <Tooltip
                    content={<CustomToolTip/>}
                    />
                </PieChart>
        </ResponsiveContainer>
        )
    }

    return (
        <>
        {
            account ? 
            <div className={`accounts-wrapper ${theme === "light" ? " accounts-wrapper-light" : ""}`}> 
            <AccHistory isOpened={historyOpened} setIsOpened={setHistoryOpened}/>
            <h1 className='accounts-wrapper-header'> Accounts </h1>
            <PortfolioPerfomance/>
            <div className="accounts-wrapper-portoflio-assets main-block"> 
                <div className='accounts-wrapper-portoflio-assets__header'> 
                    <div> 
                        <h1> ${sumUserBalances} </h1>
                        <h1> -$0.175557 (1.2%) </h1>
                    </div>
                    <button onClick={() => setHistoryOpened(true)}> History <img src={history_accounts} alt={"history"}/> </button>
                </div>
                <div className='accounts-wrapper-portoflio-assets__assets-chart-info'> 
                    <div className='accounts-wrapper-portoflio-assets__assets-chart-info__pie-chart'>
                        <PortfolioPieChart assetsList={userProtfolio}/>
                    </div>
                    <div className='accounts-wrapper-portoflio-assets__assets-chart-info__assets-list'>
                        <h3> All assets </h3>
                        <ul> 
                            {userProtfolio.map((item, _ind) => {
                                return <li key={item.value}> 
                                    <span><TokenIcon iconName={item.name}/> {item.name} </span>
                                    <span className={_ind === 4 ? "negative-change" : ""}> {formattedNum(item.userNativeBalance)} </span>
                                </li> 
                            })}
                        </ul>
                    </div>
                </div>
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
        :
        <h1 className='connect-wallet-alert'> Please connect wallet to use Accounts page. </h1>
        }       
        </>
    )
}