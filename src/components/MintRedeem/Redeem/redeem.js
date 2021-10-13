import React, { useEffect, useState } from 'react';
import { TokenIcon } from '../../TokenIcon/token_icon';
import setting_cog from '../../../assets/icons/setting-cog.svg';
import { useWeb3React } from '@web3-react/core';
import { useSystemContext } from '../../../systemProvider';
import { CONTRACT_ADRESESS } from '../../../constants';
import { MAX_INT } from '../../../constants';
import { formatToDecimal } from '../../../utils/helpers';

export const Redeem = () => {


    const { account } = useWeb3React();
    const { setMintRedeemCurrencyModal, mintRedeemCurrency, contracts, tokens, getTokenBalance } = useSystemContext();
    const [approved, setApproved] = useState(null);
    const [input, setInput] = useState(null);

    useEffect(() => {
        getAllowance()
    }, [])


    console.log(contracts);

    const getAllowance = async () => {

        let token;

        if (mintRedeemCurrency === "AGOUSD") {
            token = await tokens.AGOUSD.instance.methods.allowance(account, CONTRACT_ADRESESS.POOL_AGOUSD).call();
        }
        else {
            token = await tokens.AGOBTC.instance.methods.allowance(account, CONTRACT_ADRESESS.POOL_AGOBTC).call();
        }

        setApproved(token === "0")

    }


    console.log(approved);

    const handleRedeem = async () => {
        if (mintRedeemCurrency === "AGOUSD") {
            await contracts.POOL_AGOUSD.methods.redeem(formatToDecimal(input, tokens.AGOUSD.decimals), 0, 0).send({from: account})
        }
    }

    const handleApprove = async () => {
        if (mintRedeemCurrency === "AGOUSD") {
            await tokens.AGOUSD.instance.methods.approve(CONTRACT_ADRESESS.POOL_AGOUSD, MAX_INT).send({from: account})
        }
        else {
            await tokens.AGOBTC.instance.methods.approve(CONTRACT_ADRESESS.POOL_AGOBTC, MAX_INT).send({from: account})
        }
    }


    return (
        <div className='redeem-wrapper'>
            <div className='collect-redemption'> 
                <div>
                    <h3> Collect redemption </h3>
                    <button> Collect </button>
                </div>
                <div> 
                    <h3> 0.0 <b>{mintRedeemCurrency === "AGOUSD" ? "USDT" : "WBTC"}</b> </h3>
                    <h3> 0.0 <b>{mintRedeemCurrency}</b> </h3>
                </div>
            </div>
        <div className='redeem-window'>
            <div className='redeem-window-header'> 
                <h3> Redeem </h3>
                <button onClick={() => setMintRedeemCurrencyModal(true)}> <img src={setting_cog}/> </button>
            </div>
            <div className='redeem-window-input-row'> 
                <span> <h3> Input </h3> </span>
                <span className='balance'> <h3> Balance: {getTokenBalance(mintRedeemCurrency)} </h3> </span>
                <input onChange={(e) => setInput(e.target.value)} className='inpunt-redeem' type='number' placeholder="0.00"/>
                <span className='currency'> <TokenIcon iconName={mintRedeemCurrency}/> {mintRedeemCurrency} </span>
            </div>
            <div className='redeem-window-op-sign-row'> 
                <i className="fas fa-plus"/>
            </div>
            <div className='redeem-window-input-row'> 
                <span> <h3> Output USDT - <b> 91.6392% </b> </h3> </span>
                <span className='balance'> <h3> Balance: {getTokenBalance(mintRedeemCurrency === "AGOUSD" ? "USDT" : "WBTC")}0.0 </h3> </span>
                <input disabled type='number' placeholder="0.00"/>
                <span className='currency'> <TokenIcon iconName={mintRedeemCurrency === "AGOUSD" ? "USDT" : "WBTC"}/> {mintRedeemCurrency === "AGOUSD" ? "USDT" : "WBTC"} </span>
            </div>
            <div className='redeem-window-op-sign-row'> 
                <i className="fas fa-arrow-down"/>
            </div>
            <div className='redeem-window-input-row output'> 
                <span> <h3> Output CNUSD - <b> 8.3608% </b> </h3> </span>
                <span className='balance'> <h3> Balance: {getTokenBalance(mintRedeemCurrency === "AGOUSD" ? "CNUSD" : "CNBTC")}0.0 </h3> </span>
                <input disabled type='number' placeholder="0.00"/>
                <span className='currency'> <TokenIcon iconName={mintRedeemCurrency === "AGOUSD" ? "CNUSD" : "CNBTC"}/> {mintRedeemCurrency === "AGOUSD" ? "CNUSD" : "CNBTC"} </span>
            </div>
            <button onClick={approved ? handleRedeem : handleApprove} className='redeem-window-run-mint'> {approved > "0" ? "Redeem" : `Approve ${mintRedeemCurrency}`}</button>
        </div>
    </div>
    )

}