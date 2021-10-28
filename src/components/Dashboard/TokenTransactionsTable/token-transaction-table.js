import React, {useEffect, useState} from 'react';
import {Loader} from "../../Loader/loader";
import { useSystemContext } from '../../../systemProvider';
import axios from 'axios';
import { formatFromDecimal } from '../../../utils/helpers';
import { CONTRACT_ADRESESS, TX_OPERATIONS } from '../../../constants';
import socketIOClient from "socket.io-client";
const ENDPOINT = "https://dashboard.heroku.com/apps/argano-rest-api-sever";

export const TokenTransactionTable = () => {

    const {theme, tokens} = useSystemContext();

    const [data, setData] = useState(null);

    const [totalPages, setTotalPages] = useState(null);
    const [currentClickedNumber, setCurrentClickedNumber] = useState(1);
    const [dataPaginated, setDataPaginated] = useState(null);

    const [loading, setLoading] = useState(true);

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
            determineNumberOfPages();
        }

    }, [data])


    const determineNumberOfPages = () => {
        const itemsPerPage = 10;
    
        let paginatedDataObject = {};
    
        let index = 0;
        let dataLength = data.length;
        let chunkArray = [];
    
        for (index = 0; index < dataLength; index += itemsPerPage) {
          let newChunk = data.slice(index, index + itemsPerPage);
          chunkArray.push(newChunk);
        }
    
        chunkArray.forEach((chunk, i) => {
          paginatedDataObject[i + 1] = chunk;
        });
    
        setTotalPages(chunkArray.length);
        setDataPaginated(paginatedDataObject);
    };

    const TableBody = () => {

        return (
            <>
                {dataPaginated && dataPaginated[`${currentClickedNumber}`].map((item) => {


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

                <div className={'transactions__table__pagination'}>
                    <div>
                        <button onClick={() => setCurrentClickedNumber(prevNum => prevNum !== 1 ? prevNum - 1 : prevNum)}> Prev </button>
                        <span>Page {currentClickedNumber} of {totalPages} </span>
                        <button onClick={() => setCurrentClickedNumber(prevNum => prevNum < totalPages ? prevNum + 1 : prevNum)}> Next </button>
                    </div>
                </div>
            </div>
        </div>
    )

}