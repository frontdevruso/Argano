import React, {useCallback, useContext, useEffect, useState} from 'react'
import {Layout} from "../Layout/layout"
import './mint_redeem.scss'
import {TokenIcon} from "../TokenIcon/token_icon"
import Mint from './Mint/mint';
import { Redeem } from './Redeem/redeem'
import { useSystemContext } from '../../systemProvider';
import { formattedNum, formatFromDecimal } from '../../utils/helpers';
import { useWeb3React } from '@web3-react/core';

export const MintRedeem = () => {

    const [activeTab, setActiveTab] = useState("Mint");
    const [mintRedeemInfo, setMintRedeemInfo] = useState(null);
    const { account } = useWeb3React();
    const { theme, mintRedeemCurrency, mintRedeemSlipage, contracts } = useSystemContext();

    useEffect(() => {
        getMintRedeemInfo(mintRedeemCurrency);
    }, [mintRedeemCurrency]);

    const getMintRedeemInfo = useCallback(async (currency) => {

        let info;
        let poolBalance;

        if (currency === "AGOUSD") {
            info = await contracts.TREASURY_AGOUSD.methods.info(account).call();
            poolBalance = formatFromDecimal(await contracts.POOL_AGOUSD.methods.collateralDollarBalance().call(), 18);
        }
        else {
            info = await contracts.TREASURY_AGOBTC.methods.info(account).call();
            poolBalance = formatFromDecimal(await contracts.POOL_AGOBTC.methods.collateralDollarBalance().call(), 18);
        }

        console.log(info);

        setMintRedeemInfo({
            stablePrice: formatFromDecimal(info["0"], 6),
            sharePrice: formatFromDecimal(info["1"], 18),
            targetCollateralRatio: formatFromDecimal(info["2"], 6) * 100,
            effectiveCollateralRatio: formatFromDecimal(info["3"], 6),
            globalCollateralValue: info["4"], 
            mintFee: formatFromDecimal(info["5"], 6) * 100,
            redeemFee: formatFromDecimal(info["6"], 6) * 100,
            poolBalance,
        })

    }, [mintRedeemCurrency]);

    return (
        <>
            {account && mintRedeemInfo ? 
                <div className={`mint-redeem-wrapper ${theme === "light" ? " mint-redeem-wrapper-light" : ""}`}>
                <div className='mint-redeem-tx-info'> 
                    <div>
                        <span> {activeTab === "Mint" ? "Minting" : "Redeem"} fee: <b>{activeTab === "Mint" ?  mintRedeemInfo.mintFee : mintRedeemInfo.redeemFee}%</b></span>
                        <i class="fas fa-circle"></i>
                        <span> Pool balance: <b>${formattedNum(mintRedeemInfo.poolBalance)}</b></span>
                        <i class="fas fa-circle"></i>
                        <span> Slippage: <b>{mintRedeemSlipage}%</b></span>
                        <i class="fas fa-circle"></i>
                        <span> Rates: <span> 1 <b>{mintRedeemCurrency}</b> = {mintRedeemInfo.stablePrice} <b> {mintRedeemCurrency === "AGOUSD" ? "USDT" : "WBTC"}</b> </span> </span>
                    
                        <span className='contract__link-polygon'> <a href="https://polygonscan.com/"> View contracts on PolygonScan </a> <i class="fas fa-external-link-alt"></i> </span>
                    </div>
                </div>
                <div className='mint-redeem-switcher'> 
                    <div> 
                        <button className={activeTab === "Mint" ? "active-switcher-button" : ""} onClick={() => setActiveTab("Mint")}> Mint </button>
                        <button className={activeTab === "Redeem" ? "active-switcher-button" : ""} onClick={() => setActiveTab("Redeem")}> Redeem </button>
                    </div>
                </div>
                {activeTab === "Mint" ? <Mint info={mintRedeemInfo}/> : <Redeem info={mintRedeemInfo}/>}
            </div>
            :
            <h1 className='connect-wallet-alert'> Please connect wallet to use Mint/Redeem page </h1>            
            }
        </>
    )
}

export default MintRedeem;