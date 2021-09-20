import React, {useContext, useEffect, useState} from 'react';
import { Layout } from "../Layout/layout";

import { TokenPricesCharts } from './TokenPricesCharts/token-prices-charts';
import { TVLChart } from './TVLChart/TVLChart';
import { Volume24h } from './Volume24h/volume24h';
import { TokenTransactionTable } from './TokenTransactionsTable/token-transaction-table';

import {ThemeContext} from "../App/App";
import {getLatestBlock} from "../../utils/getBlocksData";
import {Error} from "../Error/error";
import {Loader} from "../Loader/loader";

import './dashboard.scss';

// Dashboard context init
export const DashboardContext = React.createContext({
    latestBlock: null,
    setLatestBlock: () => {},
    token: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    setToken: () => {}
});

export const Dashboard = () => {

    const {theme} = useContext(ThemeContext);

    //Dashboard context consumer
    const [latestBlock, setLatestBlock] = useState(null);
    const [token, setToken] = useState("0x7ceb23fd6bc0add59e62ac25578270cff1b9f619");
    const dashboardProviderValue = {latestBlock, setLatestBlock, token, setToken};

    // Local state
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchLatestBlock = getLatestBlock();

        fetchLatestBlock
            .then((res) => {
                setLatestBlock(+res[0]);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setError(true)
            });

    }, [])



    return (
        <>
                {error ? <Error/> :
                    <DashboardContext.Provider value={dashboardProviderValue}>
                        <div className={theme === "dark" ? 'dashboard' : 'dashboard dash-light'}>
                                {loading ? <Loader/> :
                                    <>
                                        <div className='dash-header'>
                                            <h1> Dashboard </h1> 
                                        </div>
                                        <TokenPricesCharts/>
                                        <div className='dash-tvl-volume'>
                                            <TVLChart/>
                                            <Volume24h/>
                                        </div>
                                        <TokenTransactionTable/>
                                    </>
                                }
                        </div>
                    </DashboardContext.Provider>
                }
        </>
    )
}
export default Dashboard