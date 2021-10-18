import React, {useContext, useState} from 'react'
import {Layout} from "../Layout/layout"
import './mint_redeem.scss'
import {TokenIcon} from "../TokenIcon/token_icon"
import Mint from './Mint/mint';
import { Redeem } from './Redeem/redeem'
import { useSystemContext } from '../../systemProvider';
import { formattedNum } from '../../utils/helpers';
import { useWeb3React } from '@web3-react/core';

export const MintRedeem = () => {

    const [activeTab, setActiveTab] = useState("Mint");
    const {account} = useWeb3React();
    const {theme, mintRedeemSlipage, mintRedeemInfo} = useSystemContext();

    const Content = () => {

        switch (activeTab) {
            case "Mint":
                return (<Mint/>)
            case "Redeem":
                return (<Redeem/>)
            default:
                return <Redeem/>
        }
    }

    return (

        <>
            {account ? 
                <div className={`mint-redeem-wrapper ${theme === "light" ? " mint-redeem-wrapper-light" : ""}`}>
                <div className='mint-redeem-header'> 
                    <h1>Mint/Redeem</h1>
                </div>   
                <div className='mint-redeem-tx-info'> 
                    <div>
                        <span> {activeTab === "Mint" ? "Minting" : "Redeem"} fee: <b>{activeTab === "Mint" ?  mintRedeemInfo.mintFee : mintRedeemInfo.redeemFee}%</b></span>
                        <i class="fas fa-circle"></i>
                        <span> Pool balance: <b>${formattedNum(mintRedeemInfo.poolBalance)}</b></span>
                        <i class="fas fa-circle"></i>
                        <span> Slippage: <b>{mintRedeemSlipage}%</b></span>
                        <i class="fas fa-circle"></i>
                        <span> Rates: <span> 1 <b>AGOUSD</b> = {mintRedeemInfo.rates} <b>USDT</b> </span> </span>
                        <span> <a href="https://polygonscan.com/"> View contracts on PolygonScan </a> <i class="fas fa-external-link-alt"></i> </span>
                    </div>
                </div>
                <div className='mint-redeem-switcher'> 
                    <div> 
                        <button className={activeTab === "Mint" ? "active-switcher-button" : ""} onClick={() => setActiveTab("Mint")}> Mint </button>
                        <button className={activeTab === "Redeem" ? "active-switcher-button" : ""} onClick={() => setActiveTab("Redeem")}> Redeem </button>
                    </div>
                </div>
                <Content/>
            </div>
            :
            <h1 className='connect-wallet-alert'> Please connect wallet to use Mint/Redeem page </h1>            
        }

        </>
    )
}

export default MintRedeem;