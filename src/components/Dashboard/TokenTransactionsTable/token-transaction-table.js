import React, {useEffect, useState} from 'react';
import {Loader} from "../../Loader/loader";
import {useSystemContext} from '../../../systemProvider';
import axios from 'axios';
import {formatFromDecimal, calculateTimeDifference} from '../../../utils/helpers';
import {CONTRACT_ADRESESS, TX_OPERATIONS} from '../../../constants';
import styled from 'styled-components';

const TokenTransactionTableWrapper = styled.div`
  width: 100%;
  height: 60vh;
  background: radial-gradient(34.28% 208.17% at 30.1% 58.42%, rgba(30, 91, 72, 0.2) 0%, rgba(9, 33, 25, 0.2) 100%), linear-gradient(97.95deg, #272727 -6.91%, #1C1C1C 101.49%);
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.25);
  border-radius: 2vw;
  box-sizing: border-box;
  padding: 2.5% 5.5% 2%;
  display: grid;
  grid-template-rows: 1fr 10fr 1fr;

  margin-bottom: 70px;

  @media screen and (min-width: 500px) and (max-width: 768px) {
    height: 49vh;
    width: 95%;
    grid-template-rows: 1fr 8fr 1fr;
  }

  // Responsive || Width => Height

  @media only screen and (max-width: 1880px) {
    height 40vw !important;
  }

  @media only screen and (max-width: 1400px) {
    height: 40vw !important;
  }

  @media only screen and (max-width: 900px) {
    height: 45vw !important;
  }

  // Responsive || Height

  @media screen and (min-height: 1710px) and (max-height: 2110px) {
    height: 37vh;
  }
  @media screen and (min-height: 1610px) and (max-height: 1710px) {
    height: 38vh;
  }
  @media screen and (min-height: 1510px) and (max-height: 1610px) {
    height: 46vh;
  }

  @media screen and (min-height: 1340px) and (max-height: 1510px) {
    height: 48vh;
  }

  @media screen and (min-height: 1120px) and (max-height: 1340px) {
    height: 55vh;
  }

  @media screen and (min-height: 1080px) and (max-height: 1120px) {
    height: 63vh;
  }

  @media screen and (min-height: 992px) and (max-height: 1080px) {
    height: 65vh;
  }

  @media screen and (min-height: 850px) and (max-height: 992px) {
    height: 74vh;
  }

  @media screen and (min-height: 800px) and (max-height: 850px) {
    height: 80vh;
  }

  @media screen and (min-height: 690px) and (max-height: 800px) {
    height: 87vh;
  }

  @media screen and (min-height: 590px) and (max-height: 690px) {
    height: 105vh;
  }

  @media screen and (min-height: 550px) and (max-height: 590px) {
    height: 124vh;
  }

  @media screen and (min-height: 500px) and (max-height: 550px) {
    height: 130vh;
  }

  @media screen and (min-height: 450px) and (max-height: 500px) {
    height: 140vh;
  }

  @media screen and (min-height: 450px) and (max-height: 500px) {
    height: 160vh;
  }

  @media screen and (min-height: 400px) and (max-height: 450px) {
    height: 185vh;
  }

  @media screen and (min-height: 350px) and (max-height: 400px) {
    height: 180vh;
  }

  @media screen and (min-height: 300px) and (max-height: 350px) {
    height: 235vh;
  }

  @media screen and (min-height: 250px) and (max-height: 300px) {
    height: 295vh;
  }

  @media screen and (min-height: 200px) and (max-height: 250px) {
    height: 380vh;
  }

  @media screen and (min-height: 50px) and (max-height: 200px) {
    height: 395vh;
  }

  .transactions-heading {
    font-size: 1.5vw;
    color: white;
    @media screen and (min-width: 500px) and (max-width: 768px) {
      font-size: 2vw;
    }
  }
`
const Table = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 0.5fr 15fr 0.1fr;
  row-gap: 15px;
  color: white;
  @media screen and (min-width: 500px) and (max-width: 768px) {
    grid-template-rows: 1fr 14fr;
  }

  .token-transaction-separator {
    width: 100%;
    height: 1px;
    background-color: #333;
    border: 1px solid #333
    border-radius: 5px;
  }
`
const TableHead = styled.div`
  display: grid;
  grid-template-columns: 20% 11.5% 13% 13% 27% 15%;

  position: relative !important;
  
  @media screen and (min-width: 500px) and (max-width: 768px) {
    grid-template-columns: 23.5% 20.5% 15% 13.5% 21.5% 15%;
  }

  span {
    font-style: normal;
    font-weight: 500;
    font-size: 0.8vw;
    @media screen and (min-width: 500px) and (max-width: 768px) {
      font-size: 1.2vw;
    }

    &:last-child {
      justify-self: flex-end;
      padding-right: 45px;
    }
  }
`

const TableBody = styled.div`
  display: grid;
  grid-template-columns: 20% 11.5% 13% 13% 27% 15%;
  @media screen and (min-width: 500px) and (max-width: 768px) {
    grid-template-columns: 23.5% 20.5% 15% 13.5% 18.5% 15%;
  }

  div {
    font-style: normal;
    font-weight: 300;
    font-size: 0.8vw;
    color: #BDBDBD;
    line-height: 21px;
    @media screen and (min-width: 500px) and (max-width: 768px) {
      font-size: 1.4vw;
    }
  }

  .operation {
    color: #40BA93;
  }

  .acc {
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
      font-size: 1vw;
    }

    button {
      background: transparent;
      font-size: 0.8vw;
      color: #4F4F4F;
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
                <div className="token-transaction-separator"></div>
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
                                    <div>{token2 ? parseFloat(token2Spent).toFixed(2) : "-"} {token2 ? token2[0] : ""}</div>
                                    <div
                                        className='acc'>{`${item.account.slice(0, 6)}...${item.account.slice(-4)}`}</div>
                                    <div
                                        className='time'>{item.block_timestamp ? calculateTimeDifference(item.block_timestamp) : "A long time ago"}</div>
                                </>
                            );
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