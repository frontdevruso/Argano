import React, { useEffect, useState } from 'react';
import { TokenIcon } from '../../TokenIcon/token_icon';
import setting_cog from '../../../assets/icons/setting-cog.svg';
import { useWeb3React } from '@web3-react/core';
import { useSystemContext } from '../../../systemProvider';
import { CONTRACT_ADRESESS, MINT_REDEEM_KEY } from '../../../constants';
import { MAX_INT } from '../../../constants';
import { formatFromDecimal, formatToDecimal } from '../../../utils/helpers';
import { message } from 'antd';

export const Redeem = ({info}) => {


    const { account } = useWeb3React();
    const { setMintRedeemCurrencyModal, mintRedeemCurrency, contracts, tokens, getTokenBalance } = useSystemContext();
    const [approved, setApproved] = useState(null);
    const [input, setInput] = useState(null);
    const [collateralOutput, setCollateralOutput] = useState(0);
    const [catenaOutput, setCatenaOutput] = useState(0);
    const [redeemBalances, setRedeemBalances] = useState(null)


    useEffect(() => {
        getAllowance()
        getRedemption()
    }, [mintRedeemCurrency])

    console.log(info);

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

    const handleStableInput = (value) => {

        const collateralOutput = ((value / info.stablePrice) - ((value / info.stablePrice) * (info.redeemFee / 100))) * (info.targetCollateralRatio / 100);
        const shareOutput = ((value / info.sharePrice) - ((value / info.sharePrice) * (info.redeemFee / 100))) * ((100 - info.targetCollateralRatio) / 100);

        setCollateralOutput(collateralOutput);
        setCatenaOutput(shareOutput);
        
        setInput(value);
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
                    <h3> {redeemBalances?.redemptionShare} <b>{mintRedeemCurrency === "AGOUSD" ? "CNUSD" : "CNBTC"}</b> </h3>
                </div>
            </div>
        <div className='redeem-window'>
            <div className='redeem-window-header'> 
                <h3> Redeem </h3>
                <button className='mint-window-settings-btn' onClick={() => setMintRedeemCurrencyModal(true)}> <img src={setting_cog} alt={"settings"}/> </button>
            </div>
            <div className='redeem-window-input-row'> 
                <span> <h3> Input </h3> </span>
                <span className='balance'> <h3> Balance: {getTokenBalance(mintRedeemCurrency)} </h3> </span>
                <input onChange={(e) => handleStableInput(e.target.value)} className='inpunt-redeem' type='number' placeholder="0.00" value={input}/>
                <span className='currency'> <TokenIcon iconName={mintRedeemCurrency}/> {mintRedeemCurrency} </span>
            </div>
            <div className='redeem-window-op-sign-row'> 
                <i className="fas fa-plus"/>
            </div>
            <div className='redeem-window-input-row'> 
                <span> <h3> Output USDT - <b> {info.targetCollateralRatio}% </b> </h3> </span>
                <span className='balance'> <h3> Balance: {getTokenBalance(mintRedeemCurrency === "AGOUSD" ? "USDT" : "WBTC")} </h3> </span>
                <input disabled type='number' placeholder="0.00" value={collateralOutput}/>
                <span className='currency'> <TokenIcon iconName={mintRedeemCurrency === "AGOUSD" ? "USDT" : "WBTC"}/> {mintRedeemCurrency === "AGOUSD" ? "USDT" : "WBTC"} </span>
            </div>
            <div className='redeem-window-op-sign-row'> 
                <i className="fas fa-arrow-down"/>
            </div>
            <div className='redeem-window-input-row output'> 
                <span> <h3> Output CNUSD - <b> {100 - info.targetCollateralRatio}% </b> </h3> </span>
                <span className='balance'> <h3> Balance: {getTokenBalance(mintRedeemCurrency === "AGOUSD" ? "CNUSD" : "CNBTC")} </h3> </span>
                <input disabled type='number' placeholder={info.targetCollateralRatio === 100 ? "TCR is 100%" : "0.00"} value={info.targetCollateralRatio === 100 ? null : catenaOutput}/>
                <span className='currency'> <TokenIcon iconName={mintRedeemCurrency === "AGOUSD" ? "CNUSD" : "CNBTC"}/> {mintRedeemCurrency === "AGOUSD" ? "CNUSD" : "CNBTC"} </span>
            </div>
            <button onClick={approved ? handleRedeem : handleApprove} className='redeem-window-run-mint'> {approved > "0" ? "Redeem" : `Approve ${mintRedeemCurrency}`}</button>
        </div>
    </div>
    )

}