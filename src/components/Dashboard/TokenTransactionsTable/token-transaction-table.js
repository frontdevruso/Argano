import React, {useContext, useEffect, useState} from 'react';
import {DashboardContext} from "../dashboard";
import {Loader} from "../../Loader/loader";
import {getTokenPairs, getTokenTransactions} from "../../../utils/getDashboardData";
import { useSystemContext } from '../../../systemProvider';


export const TokenTransactionTable = () => {

    const {theme} = useSystemContext();
    const [activeTab, setActiveTab] = useState("All");
    const [transactionDataAll, setTransactionDataAll] = useState([]);
    const [filteredTransactionData, setFilteredTransactionData] = useState([]);
    const [tempArr, setTempArr] = useState([]);

    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [pageMax, setPageMax] = useState(10);

    const { token } = useContext(DashboardContext);

    useEffect(() => {

        const currentTime = new Date()

        const fetchPairs = async () => {
            setLoading(true)
            const result = await getTokenPairs(token)

            const resultFinal = await getTokenTransactions(result);

            let tempArr = []

            resultFinal.mints.forEach((item) => {

                let transaction_time = new Date(item.transaction.timestamp * 1000)
                let transaction_was = (Math.abs(currentTime - transaction_time))/(1000 * 60)

                tempArr.push({
                    type: "Add",
                    name: "Add " + item.pair.token0.symbol + " and " + item.pair.token1.symbol,
                    totalValue: "$" + parseFloat(item.amountUSD).toFixed(2),
                    token1Amount: parseFloat(item.amount0).toFixed(2) + " " + item.pair.token0.symbol,
                    token2Amount:parseFloat(item.amount1).toFixed(2) + " " + item.pair.token1.symbol,
                    account: item.to,
                    time: transaction_was
                })
            })


            resultFinal.swaps.forEach((item) => {

                let transaction_time = new Date(item.transaction.timestamp * 1000)
                let transaction_was = (Math.abs(currentTime - transaction_time))/(1000 * 60)

                let name = ""
                let token1Amount = 0
                let token2Amount = 0

                if (item.amount0In === "0") {
                    name = "Swap " + item.pair.token1.symbol + " for " + item.pair.token0.symbol
                    token1Amount = item.amount1In
                    token2Amount = item.amount0Out
                }
                else {
                    name = "Swap " + item.pair.token0.symbol + " for " + item.pair.token1.symbol
                    token1Amount = item.amount0In
                    token2Amount = item.amount1Out
                }

                tempArr.push({
                    type: "Swap",
                    name: name,
                    totalValue: "$" + parseFloat(item.amountUSD).toFixed(2),
                    token1Amount: parseFloat(token1Amount).toFixed(4) + " " + item.pair.token0.symbol,
                    token2Amount: parseFloat(token2Amount).toFixed(4) + " " + item.pair.token1.symbol,
                    account: item.to,
                    time: transaction_was
                })
            })

            resultFinal.burns.forEach((item) => {

                let transaction_time = new Date(item.transaction.timestamp * 1000)
                let transaction_was = (Math.abs(currentTime - transaction_time))/(1000 * 60)

                tempArr.push({
                    type: "Remove",
                    name: "Remove " + item.pair.token0.symbol + " and " + item.pair.token1.symbol,
                    totalValue: "$" + parseFloat(item.amountUSD).toFixed(2),
                    token1Amount: parseFloat(item.amount0).toFixed(2) + " " + item.pair.token0.symbol,
                    token2Amount:parseFloat(item.amount1).toFixed(2) + " " + item.pair.token1.symbol,
                    account: item.sender,
                    time: transaction_was
                })
            })

            tempArr.sort((a, b) => a.time - b.time);

            tempArr.forEach((item) => {

                if (item.time >= 60) {
                    item.time = (item.time / 60).toFixed(0) + " hour ago"
                }
                else if (item.time < 1) {
                    item.time = "< 1 minute ago"
                }
                else {
                    item.time = parseFloat(item.time).toFixed(0) + " minutes ago"
                }
            })
            setTransactionDataAll(tempArr)
            setFilteredTransactionData(tempArr.slice(0, 9))

        }
        fetchPairs()

        if (filteredTransactionData.length !== 0) {
            setLoading(false)
        }

    }, [filteredTransactionData.length, token])

    useEffect(() => {


        if (activeTab === "All") {
            setFilteredTransactionData(transactionDataAll.slice((page * 10) - 10, (page * 10) - 1))
        }
        else {
            setFilteredTransactionData(tempArr.slice((page * 10) - 10, (page * 10) - 1))

        }
    }, [page, activeTab])


    const filterTxn = (flag) => {

        let tempArr = []

        if (flag === "All") {
            return transactionDataAll
        }

        transactionDataAll.forEach((item) => {
            if (item.type === flag) {
                tempArr.push(item)
            }
        })

        return tempArr
    }

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);

        const filteredArray = filterTxn(tabName);
        setPageMax(filteredArray.length / 10);
        setTempArr(filteredArray);

        setPage(1);

    }


    const handlePageChange = (expr) => {

        if (expr === "+" && page + 1 !== pageMax + 1) {
            setPage(page + 1)
        }
        else if (expr === "-" && page - 1 !== 0) {
            setPage(page - 1)
        }


    }


    const TableBody = () => {

        return (
            <>
                {filteredTransactionData.map((el) => (
                    <div className={'transactions__table__body'}>
                        <div className={'transactions__table__body__item transactions__table__body__item__name'}>{el.name}</div>
                        <div className={'transactions__table__body__item'}>{el.totalValue}</div>
                        <div className={'transactions__table__body__item'}>{el.token1Amount}</div>
                        <div className={'transactions__table__body__item'}>{el.token2Amount}</div>
                        <div className={'transactions__table__body__item transactions__table__body__item__acc'}>{`0x${el.account.slice(0, 6)}...${el.account.slice(-4)}`}</div>
                        <div className={'transactions__table__body__item transactions__table__body__item__time'}>{el.time}</div>
                    </div>
                ))}
            </>
        )
    }


    return (
        <div className={`transactions dashBox ${theme === "light" ? " dashBoxLightTxs" : ""}`}>
            <div className={'transactions-heading'}>
                <h2>Transactions</h2>
                <div className={'transactions-heading__viewTypes'}>
                    <button onClick={() => handleTabChange("All")} className={activeTab === "All" ? 'transactions-heading__viewTypes__button transactions-heading__viewTypes__button--active' : 'transactions-heading__viewTypes__button'}> All </button>
                    <button onClick={() => handleTabChange("Swap")} className={activeTab === "Swap" ? 'transactions-heading__viewTypes__button transactions-heading__viewTypes__button--active' : 'transactions-heading__viewTypes__button'}> Swaps </button>
                    <button onClick={() => handleTabChange("Add")} className={activeTab === "Add" ?'transactions-heading__viewTypes__button transactions-heading__viewTypes__button--active' : 'transactions-heading__viewTypes__button'}> Adds </button>
                    <button onClick={() => handleTabChange("Remove")} className={activeTab === "Remove" ? 'transactions-heading__viewTypes__button transactions-heading__viewTypes__button--active' : 'transactions-heading__viewTypes__button'}> Removes </button>
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
                        <button onClick={() => handlePageChange("-")}> Prev </button>
                        <span>Page {page} of {pageMax} </span>
                        <button onClick={() => handlePageChange("+")}> Next </button>

                    </div>
                </div>
            </div>
        </div>
    )

}