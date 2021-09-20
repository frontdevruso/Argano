import {blockClient, healthClient} from "../api/clients";
import {GET_BLOCK, GET_BLOCKS,  SUBGRAPH_HEALTH} from "../api/queries";
import {splitQuery} from "./helpers";
import {READ_TODO} from "../components/App/App";

// Gets the latest healthy block;
export const getLatestBlock = async () => {

    let blocksArr = []
    await healthClient
        .query({
            query: SUBGRAPH_HEALTH,
        })
        .then((res) => {
            const syncedBlock = res.data.indexingStatusForCurrentVersion.chains[0].latestBlock.number
            const headBlock = res.data.indexingStatusForCurrentVersion.chains[0].chainHeadBlock.number
            if (syncedBlock && headBlock) {
                blocksArr.push(syncedBlock); // NOTE: Always use first block from this array hi is 100% legit.
                blocksArr.push(headBlock);
            }
        })
        .catch((e) => {
            console.log(e)
        })

    return blocksArr;
}

// Get a array of Polygon blocks and returns number and timestamp
export const getBlocks = async (timestamps, skipCount=500) => {

    if (timestamps?.length === 0) {
        return []
    }

    let fetchedData = await splitQuery(GET_BLOCKS, blockClient, [], timestamps, skipCount)
    let blocks = []

    if (fetchedData) {
        for (var t in fetchedData) {
            if (fetchedData[t].length > 0) {
                blocks.push({
                    timestamp: t.split('t')[1],
                    number: fetchedData[t][0]['number'],
                })
            }
        }
    }

    return blocks
}

// Get a single block by a timestamp
export async function getBlockFromTimestamp(timestamp) {
    let result = await blockClient.query({
        query: GET_BLOCK,
        variables: {
            timestampFrom: timestamp,
            timestampTo: timestamp + 600,
        },
        fetchPolicy: 'cache-first',
    })
    return result?.data?.blocks?.[0]?.number
}