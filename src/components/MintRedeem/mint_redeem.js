import React, {useContext, useState} from 'react'
import {Layout} from "../Layout/layout"
import './mint_redeem.scss'
import {TokenIcon} from "../TokenIcon/token_icon"
import Mint from './Mint/mint';
import { Redeem } from './Redeem/redeem'
import { useSystemContext } from '../../systemProvider';

export const MintRedeem = () => {

    const [activeTab, setActiveTab] = useState("Mint")
    const {theme} = useSystemContext();

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
            <div className={`mint-redeem-wrapper ${theme === "light" ? " mint-redeem-wrapper-light" : ""}`}>
                <div className='mint-redeem-header'> 
                    <h1>Mint/Redeem</h1>
                </div>   
                <div className='mint-redeem-tx-info'> 
                    <div>
                        <span> Minting fee: <b>0.20%</b></span>
                        <i class="fas fa-circle"></i>
                        <span> Pool balance: <b>$9,003,073.6227</b></span>
                        <i class="fas fa-circle"></i>
                        <span> Slippage: <b>0.10%</b></span>
                        <i class="fas fa-circle"></i>
                        <span> Rates: <span> 51 <b>WBTC</b> = 51.500 <b>AGOBTC</b> </span> </span>
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
    )
}

export default MintRedeem;