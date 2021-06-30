import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import {getBlocks} from "./getBlocksData";
import {splitQuery} from "./helpers";
import {PRICES_BY_BLOCK} from "../api/queries";
import {client} from "../api/clients";

export const getDataForPortfolio = async (number, timeWindow, interval=3600, latestBlock, balances) => {

    // const testElement = balances.balances.find((item) =>  item.name === "MATIC")

    dayjs.extend(utc);
    const currentTime = dayjs.utc();

    const startTime = timeWindow === "All time" ? 1590872400 : currentTime.subtract(number, timeWindow).startOf('hour').unix()

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
    try {
        blocks = await getBlocks(timestamps, 100);

        if (!blocks || blocks.length === 0) {
            return []
        }

        if (latestBlock) {
            blocks = blocks.filter((b) => {
                return parseFloat(b.number) <= parseFloat(latestBlock - 1500)
            })
        }

        let result = await splitQuery(PRICES_BY_BLOCK, client, ['0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270'], blocks, 50);


        // format token ETH price results
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


        // go through eth usd prices and assign to original values array
        let index = 0
        for (var brow in result) {
            let timestamp = brow.split('b')[1]
            if (timestamp) {
                values[index].priceUSD = result[brow].ethPrice * values[index].derivedETH
                values[index].priceUSD = values[index].priceUSD * 11 // This is emulation of user token count
                index += 1
            }
        }



        // let formattedHistory = []

        // // for each hour, construct the open and close price
        // for (let i = 0; i < values.length - 1; i++) {
        //     formattedHistory.push({
        //         time: parseFloat(values[i].timestamp),
        //         open: parseFloat(values[i].priceUSD).toString(),
        //         high: parseFloat(values[i].priceUSD).toString(),
        //         low: parseFloat(values[i].priceUSD).toString(),
        //         close: parseFloat(values[i + 1].priceUSD).toString(),
        //     })
        // }


        // let allTimeFormatedHistory = []

        // if(timeWindow === "All time") {
        //     formattedHistory.map((item) => {
        //         if (item.open !== "NaN") {
        //             allTimeFormatedHistory.push(item)
        //         }
        //     })

        //     formattedHistory = allTimeFormatedHistory
        // }

        // return formattedHistory;

    }
    catch (e) {
        console.log(e)
        console.log('error fetching blocks')
        return []
    }
}