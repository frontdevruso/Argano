import {getBlockFromTimestamp} from "./getBlocksData";
import dayjs from 'dayjs';
import {client} from "../api/clients";
import {ETH_PRICE} from "../api/queries";
import Numeral from 'numeral';

// Splits final query output for better understandingΩ
export async function splitQuery(query, localClient, vars, list, skipCount) {
    let fetchedData = {}
    let allFound = false
    let skip = 0


    while (!allFound) {
        let end = list.length
        if (skip + skipCount < list.length) {
            end = skip + skipCount
        }
        let sliced = list.slice(skip, end)
        let result = await localClient.query({
            query: query(...vars, sliced),
            fetchPolicy: 'cache-first',
        })

        fetchedData = {
            ...fetchedData,
            ...result.data,
        }
        if (Object.keys(result.data).length < skipCount || skip + skipCount > list.length) {
            allFound = true
        } else {
            skip += skipCount
        }
    }


    // Null check for chart correct work.
    for (let item in fetchedData) {
        if (fetchedData[item] === null) {
            delete fetchedData[item]
        }
    }

    return fetchedData
}

// Get current ETH price to format tokens derivedETH to USD
export const getEthPrice = async () => {
    const utcCurrentTime = dayjs()
    const utcOneDayBack = utcCurrentTime.subtract(1, 'day').startOf('minute').unix()

    let ethPrice = 0
    let ethPriceOneDay = 0
    let priceChangeETH = 0

    try {
        let oneDayBlock = await getBlockFromTimestamp(utcOneDayBack)
        let result = await client.query({
            query: ETH_PRICE(),
            fetchPolicy: 'cache-first',
        })

        let resultOneDay = await client.query({
            query: ETH_PRICE(oneDayBlock),
            fetchPolicy: 'cache-first',
        })

        const currentPrice = result?.data?.bundles[0]?.ethPrice
        const oneDayBackPrice = resultOneDay?.data?.bundles[0]?.ethPrice
        priceChangeETH = getPercentChange(currentPrice, oneDayBackPrice)
        ethPrice = currentPrice
        ethPriceOneDay = oneDayBackPrice
    } catch (e) {
        console.log(e)
    }

    return [ethPrice, ethPriceOneDay, priceChangeETH]
}

// Percent change between current time and yesterday
export const getPercentChange = (valueNow, value24HoursAgo) => {
    const adjustedPercentChange =
        ((parseFloat(valueNow) - parseFloat(value24HoursAgo)) / parseFloat(value24HoursAgo)) * 100
    if (isNaN(adjustedPercentChange) || !isFinite(adjustedPercentChange)) {
        return 0
    }
    return adjustedPercentChange
}


// Format number for more human readable for example (100k $, 1b $, 150m $)
export const formattedNum = (number, usd = false, acceptNegatives = false) => {
    if (isNaN(number) || number === '' || number === undefined) {
        return usd ? '$0' : 0
    }
    let num = parseFloat(number)

    if (num > 500000000) {
        return (usd ? '$' : '') + toK(num.toFixed(0), true)
    }

    if (num === 0) {
        if (usd) {
            return '$0'
        }
        return 0
    }

    if (num < 0.0001 && num > 0) {
        return usd ? '< $0.0001' : '< 0.0001'
    }

    if (num > 1000) {
        return usd ? formatDollarAmount(num, 0) : Number(parseFloat(num).toFixed(0)).toLocaleString()
    }

    if (usd) {
        if (num < 0.1) {
            return formatDollarAmount(num, 4)
        } else {
            return formatDollarAmount(num, 2)
        }
    }

    return Number(parseFloat(num).toFixed(4)).toString()
}

// Addition for "formattedNum"
export const formatDollarAmount = (num, digits) => {
    const formatter = new Intl.NumberFormat([], {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
    })
    return formatter.format(num)
}

// Addition for "formattedNum"
export const toK = (num) => {
    return Numeral(num).format('0.[00]a')
}

// Format date for chart
export const formatDate = (date) => {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}