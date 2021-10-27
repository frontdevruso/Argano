import React, {useEffect, useState} from 'react';
import {Loader} from "../../Loader/loader";
import { useSystemContext } from '../../../systemProvider';
import axios from 'axios';
import { formatDate, formatFromDecimal } from '../../../utils/helpers';
import { CONTRACT_ADRESESS, TX_OPERATIONS } from '../../../constants';
import socketIOClient from "socket.io-client";
const ENDPOINT = "https://dashboard.heroku.com/apps/argano-rest-api-sever";

export const TokenTransactionTable = () => {

    const {theme, tokens} = useSystemContext();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {

        const fetchTxs = async () => {
            const {data} = await axios.get("https://argano-rest-api-sever.herokuapp.com/api/transactionsOverall");
            setData(data);
        }

        fetchTxs();

    }, [])


    useEffect(() => {

        if (data) {
            setLoading(false);
        }

    }, [data])


    // useEffect(() => {
    //     const socket = socketIOClient(ENDPOINT);
    //     socket.on("new_tx", data => {
    //         console.log(data);
    //     });
    // }, []);


    console.log(data);


    const TableBody = () => {

        return (
            <>
                {data && data.map((item) => {


                    const token1 = Object.entries(CONTRACT_ADRESESS).find(item_loc => item_loc[1].toLocaleLowerCase() === item.token_flow[0].token.toLowerCase())
                    const token2 = Object.entries(CONTRACT_ADRESESS).find(item_loc => item_loc[1].toLocaleLowerCase() === item.token_flow[1]?.token.toLowerCase())

                    const token1Spent = formatFromDecimal(item.token_flow[0].amount.$numberDecimal, tokens[token1[0]].decimals); 
                    const token2Spent = item.token_flow[1] ? formatFromDecimal(item.token_flow[1]?.amount.$numberDecimal, tokens[token2[0]].decimals) : "-";

                    return (
                        <div className={'transactions__table__body'}>
                            <div className={'transactions__table__body__item transactions__table__body__item__name'}>{TX_OPERATIONS[item.method]}</div>
                            {/* TODO: Need to calculate sum depends on USD price of each token (Use our/coingecko current token-price) */}
                            <div className={'transactions__table__body__item'}> {token2 ? (parseFloat(token1Spent) + parseFloat(token2Spent)).toFixed(2) : parseFloat(token1Spent).toFixed(2)}</div>
                            <div className={'transactions__table__body__item'}>{parseFloat(token1Spent).toFixed(2)} {token1[0]}</div>
                            <div className={'transactions__table__body__item'}>{token2 ?  parseFloat(token2Spent).toFixed(2) : "-"} {token2 ? token2[0] : ""}</div>
                            <div className={'transactions__table__body__item transactions__table__body__item__acc'}>{`${item.account.slice(0, 6)}...${item.account.slice(-4)}`}</div>
                            <div className={'transactions__table__body__item transactions__table__body__item__time'}>{item.block_timestamp ? calculateTimeDifference(item.block_timestamp) : "A long time ago" }</div>
                        </div>
                    )
                })}
            </>
        )
    }

    const calculateTimeDifference = (timestamp) => {

        const currentTime = new Date();
        const txTime = new Date(timestamp * 1000);
        let diff = (Math.abs(currentTime - txTime))/(1000 * 60);


        if (diff >= 60) {
            diff = (diff / 60).toFixed(0) + " hour ago"
        }
        else if (diff < 1) {
            diff = "< 1 minute ago"
        }
        else {
            diff = parseFloat(diff).toFixed(0) + " minutes ago"
        }

        return diff;
    }


    return (
        <div className={`transactions dashBox ${theme === "light" ? " dashBoxLightTxs" : ""}`}>
            <div className={'transactions-heading'}>
                <h2>Transactions</h2>
                <div className={'transactions-heading__viewTypes'}>
                    {/* <button onClick={() => handleTabChange("All")} className={activeTab === "All" ? 'transactions-heading__viewTypes__button transactions-heading__viewTypes__button--active' : 'transactions-heading__viewTypes__button'}> All </button> */}
                    {/* <button onClick={() => handleTabChange("Swap")} className={activeTab === "Swap" ? 'transactions-heading__viewTypes__button transactions-heading__viewTypes__button--active' : 'transactions-heading__viewTypes__button'}> Swaps </button> */}
                    {/* <button onClick={() => handleTabChange("Add")} className={activeTab === "Add" ?'transactions-heading__viewTypes__button transactions-heading__viewTypes__button--active' : 'transactions-heading__viewTypes__button'}> Adds </button> */}
                    {/* <button onClick={() => handleTabChange("Remove")} className={activeTab === "Remove" ? 'transactions-heading__viewTypes__button transactions-heading__viewTypes__button--active' : 'transactions-heading__viewTypes__button'}> Removes </button> */}
                </div>
            </div>
            <div className={'transactions__table'}>
                <div className={'transactions__table__head'}>
                    <div className={'transactions__table__head__item'}></div>
                    <div className={'transactions__table__head__item'}>Total Value</div>
                    <div className={'transactions__table__head__item'}>Token Amount</div>
                    <div className={'transactions__table__head__item'}>Token Amount</div>
                    <div className={'transactions__table__head__item'}>Account</div>
                    <div className={'transactions__table__head__item transactions__table__head__item__time'}>Time</div>
                </div>
                <div className={'border-line-transactions'}></div>


                {loading ? <Loader/> : <TableBody/>}

                {/* <div className={'transactions__table__pagination'}>
                    <div>
                        <button onClick={() => handlePageChange("-")}> Prev </button>
                        <span>Page {page} of {pageMax} </span>
                        <button onClick={() => handlePageChange("+")}> Next </button>

                    </div>
                </div> */}
            </div>
        </div>
    )

}