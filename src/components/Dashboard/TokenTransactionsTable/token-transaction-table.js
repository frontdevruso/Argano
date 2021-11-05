import React, {useEffect, useState} from 'react';
import {Loader} from "../../Loader/loader";
import { useSystemContext } from '../../../systemProvider';
import axios from 'axios';
import { formatFromDecimal, calculateTimeDifference } from '../../../utils/helpers';
import { CONTRACT_ADRESESS, TX_OPERATIONS } from '../../../constants';
import styled from 'styled-components';

const TokenTransactionTableWrapper = styled.div`
    width: 100%;
    height: 60vh;
    background: radial-gradient(34.28% 208.17% at 30.1% 58.42%, rgba(30, 91, 72, 0.2) 0%, rgba(9, 33, 25, 0.2) 100%), linear-gradient(97.95deg, #272727 -6.91%, #1C1C1C 101.49%);
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.25);
    border-radius: 2vw;
    box-sizing: border-box;
    padding: 2.25% 5.5%;
    display: grid;
    grid-template-rows: 1fr 5fr 1fr;
    .transactions-heading {
        font-size: 1.5vw;
        color: white;
    }
`
const Table = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 7fr;
    row-gap: 15px;
    color: white;
`
const TableHead = styled.div`
    display: grid;
    grid-template-columns: 25% 10% 15% 15% 15% 15%;
    span {
        font-style: normal;
        font-weight: 500;
        font-size: 1vw;  
        &:last-child {
            justify-self: flex-end;
            padding-right: 45px;
        }
    }
`

const TableBody = styled.div`
    display: grid;
    grid-template-columns: 25% 10% 15% 15% 15% 15%;
    div {
        font-style: normal;
        font-weight: 300;
        font-size: 1vw;
        line-height: 21px;
    }
    .operation{
        color: #40BA93;
    }
    .acc{
        color: #40BA93;
    }
    .time {
        justify-self: flex-end;
    }
`

const TablePagination = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    div {
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        span {
            color: white;
            font-size: 1.1vw;
        }
        button {
            background: transparent;
            font-size: 0.8vw;
            color: #40BA93;
            border: none;
            cursor: pointer;
            &:active {
                outline: none;
                border: none;
                box-shadow: none;
            }
        }
    }
`

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


    return (
        <TokenTransactionTableWrapper>
            <h2 className={'transactions-heading'}>Transactions</h2>
            <Table>
                <TableHead>
                    <span></span>
                    <span>Total Value</span>
                    <span>Token Amount</span>
                    <span>Token Amount</span>
                    <span>Account</span>
                    <span>Time</span>
                </TableHead>
                {loading
                    ? 
                    <Loader/>
                    : 
                    <TableBody>
                        {dataPaginated && dataPaginated[`${currentClickedNumber}`].map((item) => {

                            const token1 = Object.entries(CONTRACT_ADRESESS).find(item_loc => item_loc[1].toLocaleLowerCase() === item.token_flow[0].token.toLowerCase())
                            const token2 = Object.entries(CONTRACT_ADRESESS).find(item_loc => item_loc[1].toLocaleLowerCase() === item.token_flow[1]?.token.toLowerCase())

                            const token1Spent = formatFromDecimal(item.token_flow[0].amount.$numberDecimal, tokens[token1[0]].decimals); 
                            const token2Spent = item.token_flow[1] ? formatFromDecimal(item.token_flow[1]?.amount.$numberDecimal, tokens[token2[0]].decimals) : "-";

                            return (
                                <>
                                    <div className='operation'>{TX_OPERATIONS[item.method]}</div>
                                    {/* TODO: Need to calculate sum depends on USD price of each token (Use our/coingecko current token-price) */}
                                    <div> {token2 ? (parseFloat(token1Spent) + parseFloat(token2Spent)).toFixed(2) : parseFloat(token1Spent).toFixed(2)}</div>
                                    <div>{parseFloat(token1Spent).toFixed(2)} {token1[0]}</div>
                                    <div>{token2 ?  parseFloat(token2Spent).toFixed(2) : "-"} {token2 ? token2[0] : ""}</div>
                                    <div className='acc'>{`${item.account.slice(0, 6)}...${item.account.slice(-4)}`}</div>
                                    <div className='time'>{item.block_timestamp ? calculateTimeDifference(item.block_timestamp) : "A long time ago" }</div>
                                </>
                            )
                        })}
                    </TableBody>
                }
            </Table>
            <TablePagination>
                <div>
                    <button 
                        onClick={() => setCurrentClickedNumber(prevNum => prevNum !== 1 ? prevNum - 1 : prevNum)}>
                        Prev 
                    </button>
                    <span>Page {currentClickedNumber} of {totalPages} </span>
                    <button 
                        onClick={() => setCurrentClickedNumber(prevNum => prevNum < totalPages ? prevNum + 1 : prevNum)}>
                        Next 
                    </button>
                </div>
            </TablePagination>
        </TokenTransactionTableWrapper>
    )
}