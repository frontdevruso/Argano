import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';
// Dark theme icons.
import dashboard_black from './assets/icons/nav-links/dark-theme/dashboard-black.svg';
import mint_redeem_black from './assets/icons/nav-links/dark-theme/mint-redeem-black.svg';
import staking_black from './assets/icons/nav-links/dark-theme/staking-black.svg';
import liquidity_pools_black from './assets/icons/nav-links/dark-theme/liquidity-pools-black.svg';
import trading_black from './assets/icons/nav-links/dark-theme/trading-black.svg';
import accounts_black from './assets/icons/nav-links/dark-theme/accounts-black.svg';
// Light theme icons.

// Active icons.
import dashboard_active from './assets/icons/nav-links/active/dashboard-active.svg';
import mint_redeem_active from './assets/icons/nav-links/active/mint-redeem-active.svg';
import staking_active from './assets/icons/nav-links/active/staking-active.svg';
import liquidity_pools_active from './assets/icons/nav-links/active/liq-pools-active.svg';
import trading_active from './assets/icons/nav-links/active/trading-active.svg';
import accounts_acitve from './assets/icons/nav-links/active/accounts-active.svg';

export const USD_PRICE_ENDPOINT = (contractAddress) => {

    return `https://api.coingecko.com/api/v3/simple/token_price/polygon-pos?contract_addresses=${contractAddress}&vs_currencies=usd`;
}

export const MATIC_USD_PRICE_ENDPOINT = 'https://api.coingecko.com/api/v3/simple/token_price/polygon-pos?contract_addresses=0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270&vs_currencies=usd';


export const COINGECKO_IDS = {
    AGO: "uniswap",
    AGOUSD: "tether", 
    CNUSD: "usd-coin",
    AGOBTC: "wrapped-bitcoin",
    CNBTC: "adamant",
    WMATIC: "wmatic", 
    USDT: "tether", 
    WBTC: "wrapped-bitcoin",
}


export const CONTRACT_ADRESESS = {
    AGO: "0xc3e2A3Aca375c5408C2DeA4ACcb518C26cb0cb3C",
    AGOUSD: "0x16Cf2E9b884E1E355995Dc094BA38e2dc3c09d9D", 
    CNUSD: "0x529A833bD70868Af24c5BF9BCF891C83DB022A99",
    AGOBTC: "0x36F1c6dcd73c246Ae557585a839e8437C8Bd8558",
    CNBTC: "0x6b2Cff0e587C9Ad77a3e913Aa25cd97c25a45369",
    WMATIC: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270", 
    USDT: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f", 
    WBTC: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
    POOL_AGOUSD: "0xF0c04bb6Af39a3fb06dD8E7f45d70bcb588Ac148",
    ORACLE_AGOUSD: "0x39dFCFF38d9BA1deA0CEe694097376349be567EE",
    TREASURY_AGOUSD: "0xA566508d5dF315d4abF01Db781bBD86fA77Baf6b",
    POOL_AGOBTC: "0x98273aEC2E1157BAfA77cfAe5d02e4F70Bd14aB7",
    ORACLE_AGOBTC: "0x4877533A6B6C717432316d278b2789D47907200D",
    TREASURY_AGOBTC: "0x3DD514281E4aFd5EDaB6261Face66A1bCA207bcE"
}

export const MOCK_PRICE_ADDRESS = {
    AGO: "0xb33eaad8d922b1083446dc23f610c2567fb5180f",
    AGOUSD: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    CNUSD: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    AGOBTC: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
    CNBTC: "0xc3fdbadc7c795ef1d6ba111e06ff8f16a20ea539",
    WMATIC: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
    USDT: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    WBTC: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6"
}

export const TX_OPERATIONS = {
    collectRedemption: "Collect Redemption",
    mint: "Mint",
    redeem: "Redeem"
}


// Connectors
export const metaMask = new InjectedConnector({ supportedChainIds: [137] });
export const network = new NetworkConnector({ urls: { 137: "https://rpc-mainnet.maticvigil.com/" }, defaultChainId: 137 })

// Message keys
export const MINT_REDEEM_KEY = "MINT_REDEEM_KEY";

// Other
export const MAX_INT = '115792089237316195423570985008687907853269984665640564039457584007913129639935';

export const PAGES = [
    {path: "/", name: "Dashboard", img: dashboard_black, imgActive: dashboard_active},
    {path: "/mint-redeem", name: "Mint/Redeem", img: mint_redeem_black, imgActive: mint_redeem_active},
    {path: "/staking", name: "Staking", img: staking_black, imgActive: staking_active},
    {path: "/liqudity-pools", name: "Liquidity-Pools", img: liquidity_pools_black, imgActive: liquidity_pools_active},
    {path: "/trading", name: "Trading", img: trading_black, imgActive: trading_active},
    {path: "/accounts", name: "Accounts", img: accounts_black, imgActive: accounts_acitve},
]