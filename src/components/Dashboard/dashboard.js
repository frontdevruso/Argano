import React, {useContext, useEffect, useState} from 'react';
import Layout from "../AppLayout/applayout";
import {TokenPriceChart} from "./TokenPriceChart/token_price_chart";
import {ThemeContext} from "../App/App";
import TopTokens from "./TopTokens/top-tokens";
import {TokenLiquidityChart} from "./TokenLiquidityChart/token-liquidity-chart";
import {TokenVolumeChart} from "./TokenVolumeChart/token-volume-chart";
import {TokenHoldersDiagram} from "./TokenHoldersDiagram/token-holders-diagram";
import {TokenTransactionTable} from "./TokenTransactionsTable/token-transaction-table";
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
            <Layout>
                {error ? <Error/> :
                    <DashboardContext.Provider value={dashboardProviderValue}>
                        <div className={theme === "dark" ? 'dashboard dashboard__black' : 'dashboard'}>
                                {loading ? <Loader/> :
                                    <>
                                        <TokenPriceChart/>
                                        <TopTokens/>
                                        <TokenLiquidityChart/>
                                        <TokenVolumeChart/>
                                        <TokenHoldersDiagram/>
                                        <TokenTransactionTable/>
                                    </>
                                }
                        </div>
                    </DashboardContext.Provider>
                }
            </Layout>
        </>
    )
}
export default Dashboard