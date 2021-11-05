import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { useSwipeable } from 'react-swipeable';
import axios from 'axios';
import { TX_OPERATIONS, CONTRACT_ADRESESS } from '../../../constants';
import { formatFromDecimal, calculateTimeDifference } from '../../../utils/helpers';
import { useSystemContext } from '../../../systemProvider';

const TransactionsWrapper = styled.div`
    position: fixed;
    display: grid;
    grid-template-rows: 1fr 1fr 5fr;
    transition: 0.3s all;
    bottom: 0;
    height: 55vh;
    transform: ${props => props.opened ? "translateY(0)" : "translateY(55vh)"};
    width: 100%;
    background: white;
    border-radius: 40px 40px 0px 0px;
    padding: 0px 22px 0px 22px;
    box-sizing: border-box;
    h1 {
        font-size: 18px;
        justify-self: center;
    }
`

const SwipeDownCloseStripe = styled.div`
    place-self: center;
    width: 15%;
    height: 100%;
    display: grid;
    div {
        width: 100%;
        background: #BDBDBD;
        border-radius: 10px;
        height: 5px;
        place-self: center;
    }
`

const TableBody = styled.div`
    height: 100%;
    overflow-y: auto;
`

const TableItem = styled.div`
    margin-bottom: 10px;
    &:last-child {
        margin-bottom: 0px;
    }
    span {
        color: #40BA93;
        font-size: 14px;
    }
    div {
        background: #EAECEF;
        border-radius: 20px;
        height: 20vh;
        display: grid;
        grid-template-rows: repeat(5, 1fr);
        box-sizing: border-box;
        padding: 15px;
        align-items: center;
        span {
            display: grid;
            grid-template-columns: 1fr 1fr;
            h5 {
                &:first-child {
                    color: #838995;
                }
            }
        }
    }

`

export const TokenTransactionsMobile = ({opened, setOpened}) => {


    const [data, setData] = useState();

    const {tokens} = useSystemContext();

    useEffect(() => {

        const fetchTxs = async () => {
            const {data} = await axios.get("https://argano-rest-api-sever.herokuapp.com/api/transactionsOverall");
            setData(data);
        }

        fetchTxs();

    }, [])

    const handlers = useSwipeable({
        onSwipedDown: () => setOpened(false),
        preventDefaultTouchmoveEvent: true,
    })

    return (
        <TransactionsWrapper opened={opened}>
            <SwipeDownCloseStripe {...handlers}> 
                <div> </div>
            </SwipeDownCloseStripe>
            <h1> Transactions </h1>
            <TableBody> 
                {data && data.map(item => {

                    const token1 = Object.entries(CONTRACT_ADRESESS).find(item_loc => item_loc[1].toLocaleLowerCase() === item.token_flow[0].token.toLowerCase())
                    const token2 = Object.entries(CONTRACT_ADRESESS).find(item_loc => item_loc[1].toLocaleLowerCase() === item.token_flow[1]?.token.toLowerCase())

                    const token1Spent = formatFromDecimal(item.token_flow[0].amount.$numberDecimal, tokens[token1[0]].decimals); 
                    const token2Spent = item.token_flow[1] ? formatFromDecimal(item.token_flow[1]?.amount.$numberDecimal, tokens[token2[0]].decimals) : "-";

                    return (
                        <TableItem> 
                            <span> {TX_OPERATIONS[item.method]} </span>
                            <div>
                                <span> <h5> Total Value </h5> <h5> {token2 ? (parseFloat(token1Spent) + parseFloat(token2Spent)).toFixed(2) : parseFloat(token1Spent).toFixed(2)} </h5> </span>
                                <span> <h5> Token Amount </h5> <h5> {parseFloat(token1Spent).toFixed(2)} {token1[0]} </h5> </span>
                                <span> <h5> Token Amount </h5> <h5> {token2 ?  parseFloat(token2Spent).toFixed(2) : "-"} {token2 ? token2[0] : ""}</h5> </span>
                                <span> <h5> Account </h5> <h5 style={{color: "#40BA93"}}> {`${item.account.slice(0, 6)}...${item.account.slice(-4)}`} </h5> </span>
                                <span> <h5> Time </h5> <h5> {item.block_timestamp ? calculateTimeDifference(item.block_timestamp) : "A long time ago" } </h5> </span>
                            </div>
                        </TableItem>
                    )
                })}
            </TableBody>
        </TransactionsWrapper>
    )

}