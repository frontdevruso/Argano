import React, { useEffect, useState } from 'react';
import { TokenIcon } from '../../TokenIcon/token_icon';
import setting_cog from '../../../assets/icons/setting-cog.svg';
import { useWeb3React } from '@web3-react/core';
import { useSystemContext } from '../../../systemProvider';
import { CONTRACT_ADRESESS, MINT_REDEEM_KEY } from '../../../constants';
import { MAX_INT } from '../../../constants';
import { formatFromDecimal, formatToDecimal } from '../../../utils/helpers';
import { message } from 'antd';

export const Redeem = () => {


    const { account } = useWeb3React();
    const { setMintRedeemCurrencyModal, mintRedeemCurrency, contracts, tokens, getTokenBalance } = useSystemContext();
    const [approved, setApproved] = useState(null);
    const [input, setInput] = useState(null);
    const [redeemBalances, setRedeemBalances] = useState(null)


    useEffect(() => {
        getAllowance()
        getRedemption()
    }, [mintRedeemCurrency])


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

    const getRedemption = async () => {

        let redemptionCollateral;
        let redemptionShare;

        if (mintRedeemCurrency === "AGOUSD") {
            redemptionCollateral = formatFromDecimal(await contracts.POOL_AGOUSD.methods.redeem_collateral_balances(account).call(), tokens.USDT.decimals);
            redemptionShare = formatFromDecimal(await contracts.POOL_AGOUSD.methods.redeem_share_balances(account).call(), tokens.CNUSD.decimals); 
        }

        else {
            redemptionCollateral = formatFromDecimal(await contracts.POOL_AGOBTC.methods.redeem_collateral_balances(account).call(), tokens.WBTC.decimals);
            redemptionShare = formatFromDecimal(await contracts.POOL_AGOBTC.methods.redeem_share_balances(account).call(), tokens.CNBTC.decimals); 
        }

        setRedeemBalances({redemptionCollateral, redemptionShare})

    }

    const handleRedeem = async () => {
        if (input === "0" || !input) {
            message.error({content: `Please enter amount greather than 0`, key: MINT_REDEEM_KEY, duration: 3, className: "ant-argano-message"})
            return
        }
        try {
            message.loading({content: `Redeeming ${mintRedeemCurrency}`, key: MINT_REDEEM_KEY, duration: 3000, className: "ant-argano-message"})
            if (mintRedeemCurrency === "AGOUSD") {
                await contracts.POOL_AGOUSD.methods.redeem(formatToDecimal(input, tokens.AGOUSD.decimals), 0, 0).send({from: account}) 
            }
            else {
                await contracts.POOL_AGOBTC.methods.redeem(formatFromDecimal(input, tokens.AGOBTC.decimals), 0, 0).send({from: account})
            }
            message.success({content: `Successfully redeemed ${mintRedeemCurrency} !`, key: MINT_REDEEM_KEY, duration: 3, className: "ant-argano-message"})
        }
        catch {
            message.error({content: `Something went wrong !`, key: MINT_REDEEM_KEY, duration: 3, className: "ant-argano-message"})
        }

    }

    const handleApprove = async () => {
        try {
            message.loading({content: `Approve`, key: MINT_REDEEM_KEY, duration: 3000, className: "ant-argano-message"})
            if (mintRedeemCurrency === "AGOUSD") {
                await tokens.AGOUSD.instance.methods.approve(CONTRACT_ADRESESS.POOL_AGOUSD, MAX_INT).send({from: account})
            }
            else {
                await tokens.AGOBTC.instance.methods.approve(CONTRACT_ADRESESS.POOL_AGOBTC, MAX_INT).send({from: account})
            }
            message.success({content: `Successfully approved !`, key: MINT_REDEEM_KEY, duration: 3, className: "ant-argano-message"})
        }
        catch {
            message.error({content: `Something went wrong !`, key: MINT_REDEEM_KEY, duration: 3, className: "ant-argano-message"})
        }

    }

    const collectRedemption = async () => {

        try {
            message.loading({content: `Collect redemption`, key: MINT_REDEEM_KEY, duration: 3000, className: "ant-argano-message"})
            if (mintRedeemCurrency === "AGOUSD") {
                await contracts.POOL_AGOUSD.methods.collectRedemption().send({from: account});
            }
    
            else {
                await contracts.POOL_AGOBTC.methods.collectRedemption().send({from: account}); 
            }
            message.success({content: `Successfully collected redemption !`, key: MINT_REDEEM_KEY, duration: 3, className: "ant-argano-message"})

        }
        catch {
            message.error({content: `Something went wrong !`, key: MINT_REDEEM_KEY, duration: 3, className: "ant-argano-message"})
        }

    }


    return (
        <div className='redeem-wrapper'>
            <div className='collect-redemption'> 
                <div>
                    <h3> Collect redemption </h3>
                    <button disabled={collectRedemption.redemptionCollateral === "0" && collectRedemption.redemptionShare === "0"} onClick={() => collectRedemption()}> Collect </button>
                </div>
                <div> 
                    <h3> {redeemBalances?.redemptionCollateral} <b>{mintRedeemCurrency === "AGOUSD" ? "USDT" : "WBTC"}</b> </h3>
                    <h3> {redeemBalances?.redemptionShare} <b>{mintRedeemCurrency}</b> </h3>
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