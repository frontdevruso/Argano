import React, {useEffect} from 'react';
import Layout from "../AppLayout/applayout";
import SideBar from '../AppLayout/SideBar/sidebar';
import './dashboard.scss';

export const Dashboard = () => {

    return (
        <>

            <Layout>
                <div className={'dashboard_wrapper'}>
                    <div className={'dashboard_wrapper__token-chart'}>
                        <h1> Token Chart (Wider) </h1>
                    </div>
                    <div className={'dashboard_wrapper__top-tokens'}>
                        <h1> Top Tokens </h1>
                    </div>
                    <div className={'dashboard_wrapper__liquidity'}>
                        <h1> Liquidity </h1>
                    </div>
                    <div className={'dashboard_wrapper__volume'}>
                        <h1> Volume </h1>
                    </div>
                    <div className={'dashboard_wrapper__total-users'}>
                        <h1> Total users </h1>
                    </div>
                    <div className={'dashboard_wrapper__txs-window'}>
                        <h1> Txs block </h1>
                    </div>
                </div>
            </Layout>


        </>
    )
}
export default Dashboard