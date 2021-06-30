import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import {
    PRICES_BY_BLOCK,
    TOKEN_DATA,
    TOKEN_DATA_TEST,
    ETH_PRICE,
    LIQUDITY_BY_BLOCK,
    VOLUME_BY_BLOCK,
    TOP_TOKEN_LIST,
    FILTERED_TRANSACTIONS
} from '../api/queries';

import {getBlocks, getBlockFromTimestamp, getLatestBlock} from "./getBlocksData";
import {splitQuery, getEthPrice} from "./helpers";
import {client, quickSwapTxSwapClient} from '../api/clients';


// Get data for price chart (Linear, Candle);
export const getTokenChartData = async (number, timeWindow, interval=3600, tokenAddress, latestBlock) => {

    dayjs.extend(utc);
    const currentTime = dayjs.utc();

    const startTime = timeWindow === "All time" ? 1590872400 : currentTime.subtract(number, timeWindow).startOf('hour').unix()
    const lastDay = currentTime.subtract(24, 'hours').startOf('hour').unix()

    let time = startTime

    const timestamps = []
    while (time < currentTime.unix()) {
        timestamps.push(time)
        time += interval
    }

    if (timestamps.length === 0) {
        return []
    }

    // Here we fetching blocks
    let blocks;
    let blocksLastDay;
    try {
        blocks = await getBlocks(timestamps, 100);
        blocksLastDay = await getBlocks([lastDay], 100);

        if (!blocks || blocks.length === 0) {
            return []
        }

        if (latestBlock) {
            blocks = blocks.filter((b) => {
                return parseFloat(b.number) <= parseFloat(latestBlock)
            })
        }


        let result = await splitQuery(PRICES_BY_BLOCK, client, [tokenAddress], blocks, 50);
        let resultLastDay = await splitQuery(PRICES_BY_BLOCK, client, [tokenAddress], blocksLastDay, 50);

        const ethPrice = await getEthPrice()

        let values = []
        for (var row in result) {
            let timestamp = row.split('t')[1]
            let derivedETH = parseFloat(result[row]?.derivedETH)
            if (timestamp) {
                values.push({
                    timestamp,
                    derivedETH,
                })
            }
        }

        let pastPrice;

        for (let pastRow in resultLastDay) {
            let timestamp = pastRow.split('t')[1]
            let derivedETH = parseFloat(resultLastDay[pastRow]?.derivedETH)

            if (timestamp) {
                pastPrice = derivedETH * ethPrice[0]
            }
        }

        let index = 0
        for (var brow in result) {
            let timestamp = brow.split('b')[1]
            if (timestamp) {
                values[index].priceUSD = result[brow].ethPrice * values[index].derivedETH
                index += 1
            }
        }

        const currentPrice = values[values.length - 1].priceUSD;

        let precent = (((currentPrice - pastPrice) / pastPrice) * 100).toFixed(2) + "%"

        let formattedHistory = []

        // for each hour, construct the open and close price
        for (let i = 0; i < values.length; i++) {


            if (i === values.length - 1) {

                formattedHistory.push({
                    time: parseInt(values[i].timestamp),
                    open: parseFloat(values[i].priceUSD).toString(),
                    high: parseFloat(values[i].priceUSD).toString(),
                    low: parseFloat(values[i].priceUSD).toString(),
                    close: parseFloat(values[i].priceUSD).toString(),
                })
            }

            else {
                formattedHistory.push({
                    time: parseInt(values[i].timestamp),
                    open: parseFloat(values[i].priceUSD).toString(),
                    high: parseFloat(values[i].priceUSD).toString(),
                    low: parseFloat(values[i].priceUSD).toString(),
                    close: parseFloat(values[i + 1].priceUSD).toString(),
                })

            }
        }


        let allTimeFormatedHistory = []

        if(timeWindow === "All time") {
            formattedHistory.map((item) => {
                if (item.open !== "NaN") {
                    allTimeFormatedHistory.push(item)
                }
            })

            formattedHistory = allTimeFormatedHistory
        }

        return [formattedHistory, precent];

    }
    catch (e) {
        console.log(e)
        console.log('error fetching blocks')
        return []
    }
}

// Get data for token liquidity chart.
export const getTokenLiqudity = async (latestBlock, tokenAddress) => {
    dayjs.extend(utc);


    const currentTime = dayjs.utc();

    let startTime = currentTime.subtract(180, "day").startOf('hour').unix();
    let dayAgo = currentTime.subtract(24, "hour").startOf('hour').unix();


    const mounthInterval = 2592000;

    const timestamps = []

    let time = startTime;

    while (time < currentTime.unix()) {
        timestamps.push(time)
        time += mounthInterval
    }

    if (timestamps.length === 0) {
        return []
    }

    let blocks
    let blocksDayAgo

    try {
        blocks = await getBlocks(timestamps, 100);
        blocksDayAgo = await getBlocks([dayAgo], 100)

        if (!blocks || blocks.length === 0) {
            return []
        }

        if (latestBlock) {
            blocks = blocks.filter((b) => {
                return parseFloat(b.number) <= parseFloat(latestBlock)
            })
        }

        let result = await splitQuery(LIQUDITY_BY_BLOCK, client,[tokenAddress] ,blocks, 50);
        let pastResult = await splitQuery(LIQUDITY_BY_BLOCK, client,[tokenAddress] ,blocksDayAgo, 50)


        const ethPrice = await getEthPrice()

        let values = []
        for (var row in result) {
            let timestamp = parseFloat(row.split('t')[1])
            let totalLiquidity = parseFloat(result[row]?.totalLiquidity)
            if (timestamp) {
                values.push({
                    time: parseFloat(timestamp),
                    value: totalLiquidity * ethPrice[0],
                })
            }
        }

        let pastValue;
        for (var rowPast in pastResult) {
            pastValue = parseFloat(pastResult[rowPast]?.totalLiquidity) * ethPrice[0]
        }

        const currentValue = values[values.length - 1].value;



        let precent = (((currentValue - pastValue) / pastValue) * 100).toFixed(2) + "%"


        return [values, precent]

    }
    catch (e) {
        console.log(e)
        return []
    }
}

// Get data for token volume chart.
export const getTokenVolume = async (latestBlock,viewType, tokenAddress) => {
    dayjs.extend(utc);

    const currentTime = dayjs.utc();


    let number;
    let windowSize;
    let interval;
    if (viewType === "W") {
        number = 7;
        windowSize = "day";
        interval = 20000
    }
    else {
        number = 24;
        windowSize = "hour"
        interval = 3600
    }

    let startTime = currentTime.subtract(number, windowSize).startOf('hour').unix();
    let dayAgoTime = currentTime.subtract(24, "hour").startOf('hour').unix();
    const timestamps = []

    let time = startTime;

    while (time < currentTime.unix()) {
        timestamps.push(time)
        time += interval
    }

    if (timestamps.length === 0) {
        return []
    }


    let blocks
    let blocksDayAgo
    try {
        blocks = await getBlocks(timestamps, 100);
        blocksDayAgo = await getBlocks([dayAgoTime], 100)


        if (!blocks || blocks.length === 0) {
            return []
        }

        if (!blocksDayAgo || blocksDayAgo.length === 0) {
            return []
        }

        if (latestBlock) {
            blocks = blocks.filter((b) => {
                return parseFloat(b.number) <= parseFloat(latestBlock)
            })
        }

        const result = await splitQuery(VOLUME_BY_BLOCK, client, [tokenAddress],blocks, 50);
        const pastResult = await splitQuery(VOLUME_BY_BLOCK, client, [tokenAddress], blocksDayAgo, 50);

        let values = []
        for (var row in result) {
            let timestamp = parseFloat(row.split('t')[1])
            let tradeVolumeUSD = parseFloat(result[row]?.tradeVolumeUSD)
            if (timestamp) {
                values.push({
                    time: parseFloat(timestamp),
                    value: tradeVolumeUSD.toFixed(0),
                    color: "#40BA93"
                })
            }
        }
        let pastValue;

        for (let row in pastResult) {
            pastValue = parseFloat(pastResult[row]?.tradeVolumeUSD)
        }

        const currentValue = parseFloat(values[values.length - 1].value).toFixed(0)


        let percent = (((currentValue - pastValue) / pastValue) * 100).toFixed(2) + "%";

        return [values, percent]

    }
    catch (e) {
        console.log(e)
        return []
    }
}

// Get top 5 list of tokens by transactions count.
export const getTopTokenList = async (latestBlock) => {

    let result = await client.query({
        query: TOP_TOKEN_LIST,
        fetchPolicy: 'cache-first',
    })

    dayjs.extend(utc);
    const currentTime = dayjs.utc();
    const startTime = currentTime.subtract(24, "hour").startOf('hour').unix()


    let tokens = result.data.tokens.map((item) => ({name: item.name,symbol: item.symbol, id: item.id}))

    let blocksDayAgo;
    try {


        blocksDayAgo = await getBlocks([startTime], 100);

        let finalArr = []
        let ethPrice = await getEthPrice();

        for (let i = 0; i < tokens.length; i++) {

            let result = await client.query({
                query: TOKEN_DATA_TEST,
                variables: {id: tokens[i].id, number: parseInt(latestBlock)},
                fetchPolicy: 'cache-first'
            })

            let resultPast = await client.query({
                query: TOKEN_DATA_TEST,
                variables: {id: tokens[i].id, number: parseInt(blocksDayAgo[0].number)},
                fetchPolicy: 'cache-first'
            })


            let priceNow = parseFloat(ethPrice[0]) * parseFloat(result.data.token.derivedETH)
            let pricePast = parseFloat(ethPrice[0]) * parseFloat(resultPast.data.token.derivedETH)


            let prec = (((priceNow - pricePast) / pricePast) * 100).toFixed(2) + "%";

            finalArr.push({name: tokens[i].name, symbol: tokens[i].symbol, precent: prec})

        }
        return finalArr

    }
    catch(e) {
        console.log(e)
    }

}

// Getting pairs for fetch swaps removes and adds further.
export const getTokenPairs = async (tokenAddress) => {
    try {
        // fetch all current and historical data
        let result = await client.query({
            query: TOKEN_DATA(tokenAddress),
            fetchPolicy: 'cache-first',
        })


        console.log(result);

        let finalArray = []

        result.data.pairs0.forEach((item) => finalArray.push(item.id))
        result.data.pairs1.forEach((item) => finalArray.push(item.id))

        return finalArray
    } catch (e) {
        console.log(e)
    }
}

// Get swap, removes, adds.
export const getTokenTransactions = async (allPairsFormatted) => {
    const transactions = {}
    try {
        let result = await quickSwapTxSwapClient.query({
            query: FILTERED_TRANSACTIONS,
            variables: {
                allPairs: allPairsFormatted,
            },
            fetchPolicy: 'cache-first',
        })
        transactions.mints = result.data.mints
        transactions.burns = result.data.burns
        transactions.swaps = result.data.swaps



    } catch (e) {
        console.log(e)
    }
    return transactions
}
