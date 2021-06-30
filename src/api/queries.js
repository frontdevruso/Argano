import gql from 'graphql-tag';

const TokenFields = `
  fragment TokenFields on Token {
    id
    name
    symbol
    derivedETH
    tradeVolume
    tradeVolumeUSD
    untrackedVolumeUSD
    totalLiquidity
    txCount
  }
`

const PairFields = `
  fragment PairFields on Pair {
    id
    txCount
    token0 {
      id
      symbol
      name
      totalLiquidity
      derivedETH
    }
    token1 {
      id
      symbol
      name
      totalLiquidity
      derivedETH
    }
    reserve0
    reserve1
    reserveUSD
    totalSupply
    trackedReserveETH
    reserveETH
    volumeUSD
    untrackedVolumeUSD
    token0Price
    token1Price
    createdAtTimestamp
  }
`

export const PRICES_BY_BLOCK = (tokenAddress, blocks) => {
    let queryString = 'query blocks {'
    queryString += blocks.map(
        (block) => `
        t${block.timestamp}:token(id:"${tokenAddress}", block: { number: ${block.number} }) { 
          derivedETH
        }
      `
    )
    queryString += ','
    queryString += blocks.map(
        (block) => `
        b${block.timestamp}: bundle(id:"1", block: { number: ${block.number} }) { 
          ethPrice
        }
      `
    )

    queryString += '}'
    return gql(queryString)
}

export const LIQUDITY_BY_BLOCK = (tokenAddress, blocks) => {
    let queryString = 'query blocks {'
    queryString += blocks.map(
        (block) => `
      t${block.timestamp}:token(id:"${tokenAddress}", block: { number: ${block.number} }) { 
        totalLiquidity
      }
    `
    )
    queryString += '}'
    return gql(queryString);

}


export const PAIR_LIQUIDITY_VOLUME = (pairAddress, blocks) => {
    let queryString = 'query blocks {'
    queryString += blocks.map(
        (block) => `
      t${block.timestamp}:pair(id:"${pairAddress}", block: { number: ${block.number} }) { 
        reserveUSD
        volumeUSD

      }
    `
    )
    queryString += '}'
    return gql(queryString);

}


export const VOLUME_BY_BLOCK = (tokenAddress, blocks) => {
    let queryString = 'query blocks {'
    queryString += blocks.map(
        (block) => `
      t${block.timestamp}:token(id:"${tokenAddress}", block: { number: ${block.number} }) { 
        tradeVolumeUSD
      }
    `
    )
    queryString += '}'
    return gql(queryString);
}
// This is for better chart loading.
export const GET_SINGLE_BLOCK = gql`
    query ($time_gt: Int!, $time_lt: Int!) {
        blocks(first: 1, orderBy:timestamp, orderDirection:asc, where: {timestamp_gt: $time_gt, timestamp_lt: $time_lt}) {
            number
            timestamp
        }
    }
`

export const GET_BLOCKS = (timestamps) => {
    let queryString = 'query blocks {'
    queryString += timestamps.map((timestamp) => {
        return `t${timestamp}:blocks(first: 1, orderBy: timestamp, orderDirection: desc, where: { timestamp_gt: ${timestamp}, timestamp_lt: ${
            timestamp + 600
        } }) {
        number
      }`
    })
    queryString += '}'
    return gql(queryString)
}


export const PAIRS = `

  query {
    pairs {
      pairs()
    }
  }


`


export const TOKEN_DATA = (tokenAddress) => {
    const queryString = `
    ${TokenFields}
    query tokens {
      pairs0: pairs(where: {token0: "${tokenAddress}"}, first: 50, orderBy: reserveUSD, orderDirection: desc){
        id
      }
      pairs1: pairs(where: {token1: "${tokenAddress}"}, first: 50, orderBy: reserveUSD, orderDirection: desc){
        id
      }
    }
  `
    return gql(queryString)
}




export const PAIR_DATA_FIRST = gql`
  
  query($id: String!) {
      pair(id: $id)  {
        id
        token0 {
          symbol
          id
        }     
        token1 {
          symbol
          id
        }
        reserveUSD
        volumeUSD
        createdAtTimestamp
      }
  }

`

export const PAIR_VOLUME_LIQUDITY = gql`

  query($id: String!, $number: Int!) {
    pair(id: $id, block: {number: $number}) {
      reserveUSD
      volumeUSD
    }
  }

`


export const FILTERED_TRANSACTIONS = gql`
  query($allPairs: [Bytes]!) {
    mints(first: 30, where: { pair_in: $allPairs }, orderBy: timestamp, orderDirection: desc) {
      transaction {
        id
        timestamp
      }
      pair {
        token0 {
          id
          symbol
        }
        token1 {
          id
          symbol
        }
      }
      to
      liquidity
      amount0
      amount1
      amountUSD
    }
    burns(first: 30, where: { pair_in: $allPairs }, orderBy: timestamp, orderDirection: desc) {
      transaction {
        id
        timestamp
      }
      pair {
        token0 {
          id
          symbol
        }
        token1 {
          id
          symbol
        }
      }
      sender
      liquidity
      amount0
      amount1
      amountUSD
    }
    swaps(first: 40, where: { pair_in: $allPairs }, orderBy: timestamp, orderDirection: desc) {
      transaction {
        id
        timestamp
      }
      id
      pair {
        token0 {
          id
          symbol
        }
        token1 {
          id
          symbol
        }
      }
      amount0In
      amount0Out
      amount1In
      amount1Out
      amountUSD
      to
    }
  }
`

export const FILTERED_SWAPS = gql`
  query($allPairs: [Bytes]!) {
    swaps(first: 100, where: { pair_in: $allPairs }, orderBy: timestamp, orderDirection: desc) {
      transaction {
        id
        timestamp
      }
      id
      pair {
        token0 {
          id
          symbol
        }
        token1 {
          id
          symbol
        }
      }
      amount0In
      amount0Out
      amount1In
      amount1Out
      amountUSD
      to
      timestamp
    }
  }
`

export const PAIR_DATA = (pairAddress, block) => {
    const queryString = `
    ${PairFields}
    query pairs {
      pairs(${block ? `block: {number: ${block}}` : ``} where: { id: "${pairAddress}"} ) {
        ...PairFields
      }
    }`
    return gql(queryString)
}



export const ETH_PRICE = (block) => {
    const queryString = block
        ? `
    query bundles {
      bundles(where: { id: 1 } block: {number: ${block}}) {
        id
        ethPrice
      }
    }
  `
        : ` query bundles {
      bundles(where: { id: 1 }) {
        id
        ethPrice
      }
    }
  `
    return gql(queryString)
}

export const TOKEN_DATA_TEST = gql`
  query token($id: String!, $number: Int!) {
    token(id: $id, block: {number: $number}) {
      derivedETH
    }
  }
`

export const TOP_TOKEN_LIST = gql`
  query tokens {
    tokens(orderBy: tradeVolumeUSD, orderDirection: desc, first: 5) {
      name
      symbol
      id
    }
  }
`

export const GET_BLOCK = gql`
  query blocks($timestampFrom: Int!, $timestampTo: Int!) {
    blocks(
      first: 1
      orderBy: timestamp
      orderDirection: asc
      where: { timestamp_gt: $timestampFrom, timestamp_lt: $timestampTo }
    ) {
      id
      number
      timestamp
    }
  }
`

export const SUBGRAPH_HEALTH = gql`
  query health {
    indexingStatusForCurrentVersion(subgraphName: "sameepsi/quickswap06") {
      synced
      health
      chains {
        chainHeadBlock {
          number
        }
        latestBlock {
          number
        }
      }
    }
  }
`


/// IDK WTF is doing ? but it does something important
