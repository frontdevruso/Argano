import { useWeb3React } from '@web3-react/core';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { CONTRACT_ADRESESS, MAX_INT, MINT_REDEEM_KEY } from '../../../constants';
import setting_cog from '../../../assets/icons/setting-cog.svg'
import { useSystemContext } from '../../../systemProvider';
import { formatFromDecimal, formatToDecimal } from '../../../utils/helpers';
import { TokenIcon } from '../../TokenIcon/token_icon';


export const Mint = ({info}) => {

    const {account} = useWeb3React();
    const { setMintRedeemCurrencyModal, mintRedeemCurrency, contracts, tokens, userProtfolio, getTokenBalance } = useSystemContext();

    const [collateralInput, setCollateralInput] = useState(0);
    const [catenaInput, setCatenaInput] = useState(0);
    const [outputInput, setOutputInput] = useState(0);

    const [approved, setApproved] = useState({
        collateral: null,
        share: null,
    });

    const [mintButtonDisabled, setMintButtonDisabled] = useState(false);

    useEffect(() => {
        if (account) {
            getAllowance()
        }
    }, [account])


    useEffect(() => {

        if (account) {
            const usdt = getTokenBalance("USDT");
            const wbtc = getTokenBalance("WBTC");
    
            if (usdt.userNativeBalance === "0" && mintRedeemCurrency === "AGOUSD") {
                setMintButtonDisabled(true);
                message.warn({content: `You have 0 USDT to make mint go to Trading page and buy some`, key: MINT_REDEEM_KEY, className: "ant-argano-message", duration: 10})
            }
            else if (wbtc.userNativeBalance === "0" && mintRedeemCurrency === "AGOBTC") {
                setMintButtonDisabled(true);
                message.warn({content: `You have 0 WBTC to make mint go to Trading page and buy some`, key: MINT_REDEEM_KEY, className: "ant-argano-message", duration: 10})
            }
        }


    }, [userProtfolio])

    const getAllowance = async () => {

        let collateral;
        let share;

        if (mintRedeemCurrency === "AGOUSD") {
            collateral = await tokens.USDT.instance.methods.allowance(account, CONTRACT_ADRESESS.POOL_AGOUSD).call();
            share = await tokens.CNUSD.instance.methods.allowance(account, CONTRACT_ADRESESS.POOL_AGOUSD).call();
        }

        else {
            collateral = await tokens.WBTC.instance.methods.allowance(account, CONTRACT_ADRESESS.POOL_AGOBTC).call();
            share = await tokens.CNBTC.instance.methods.allowance(account, CONTRACT_ADRESESS.POOL_AGOBTC).call();
        }

        setApproved( prevState => ({
            ...prevState,
            collateral,
            share
        }))
    }

    const handleCollateralInput = (value) => {

        const shareOutput = ((value * info.sharePrice) - ((value * info.sharePrice) * (info.mintFee / 100))) * ((100 - info.targetCollateralRatio) / 100);
        const stableOutput = ((value * 1.0001) - ((value / 1.001) * (info.mintFee / 100))) * (info.targetCollateralRatio / 100);

        setCollateralInput(value)
        setOutputInput(stableOutput + shareOutput)
        setCatenaInput(shareOutput)
    }

    const handleCatenaInput = (value) => {
        setCatenaInput(value)
    }

    const handleApprove = async (tokenType) => {

        if (tokenType === "collateral") {
            if (mintRedeemCurrency === "AGOUSD") {
                await tokens.USDT.instance.methods.approve(CONTRACT_ADRESESS.POOL_AGOUSD, MAX_INT).send({from: account})
            }
            else {
                await tokens.WBTC.instance.methods.approve(CONTRACT_ADRESESS.POOL_AGOBTC, MAX_INT).send({from: account})
            }
        }
        else {
            if (mintRedeemCurrency === "AGOUSD") {
                await tokens.CNUSD.instance.methods.approve(CONTRACT_ADRESESS.POOL_AGOUSD, MAX_INT).send({from: account})
            }
            else {
                await tokens.CNBTC.instance.methods.approve(CONTRACT_ADRESESS.POOL_AGOBTC, MAX_INT).send({from: account})
            }
        }

       await getAllowance();
    }

    const handleMint = async () => {

        if (collateralInput > 0) {
            if (mintRedeemCurrency === "AGOUSD") {
                try {
                    message.loading({content: "Mint in process", className: "ant-argano-message", key: MINT_REDEEM_KEY, duration: 3000});
                    setMintButtonDisabled(true);
                    await contracts.POOL_AGOUSD.methods.mint(formatToDecimal(collateralInput, tokens.USDT.decimals), formatToDecimal(catenaInput, tokens.CNUSD.decimals), 0).send({from: account}); // TODO: AGOUSD amount - slippage in %
                    
                    message.success({content: `Succsessfully minted ${mintRedeemCurrency}`, className: "ant-argano-message", key: MINT_REDEEM_KEY, duration: 5})
                    setMintButtonDisabled(false);
                }
                catch(e) {
                    message.error({content: `Some error occured: ${e.message}`, className: "ant-argano-message", key: MINT_REDEEM_KEY, duration: 5})
                    setMintButtonDisabled(false);
                }
            }
            else {
                try {
                    setMintButtonDisabled(true);
                    message.loading({content: "Mint in process", className: "ant-argano-message", key: MINT_REDEEM_KEY, duration: 3000});
                    await contracts.POOL_AGOBTC.methods.mint(formatToDecimal(collateralInput, tokens.WBTC.decimals), formatToDecimal(catenaInput, tokens.CNBTC.decimals), formatToDecimal(collateralInput, tokens.AGOBTC.decimals)).send({from: account});
                    message.success({content: `Succsessfully minted ${mintRedeemCurrency}`, className: "ant-argano-message", key: MINT_REDEEM_KEY, duration: 5})
                    setMintButtonDisabled(false);
    
                }
                catch(e) {
                    message.error({content: `Some error occured: ${e.message}`, className: "ant-argano-message", key: MINT_REDEEM_KEY, duration: 5})
                    setMintButtonDisabled(false);
                }
            } 
        }
        else {
            message.error({content: "Please enter amount greather than 0", className: "ant-argano-message", key: MINT_REDEEM_KEY, duration: 5})
        }

    }

    const MintButton = () => {

        if (approved.collateral === "0") {
            return <button disabled={mintButtonDisabled} className='mint-window-run-mint' onClick={() => handleApprove("collateral")}> Approve {mintRedeemCurrency === "AGOUSD" ? "USDT" : "WBTC"}</button>
        }

        if (approved.share === "0" & approved.collateral !== "0") {
            return <button disabled={mintButtonDisabled} className='mint-window-run-mint' onClick={() => handleApprove("share")}> Approve {mintRedeemCurrency === "AGOUSD" ? "CNUSD" : "CNBTC"}</button>
        }

        else {
            return <button disabled={mintButtonDisabled} className='mint-window-run-mint' onClick={handleMint}> Mint </button>
        }

    }


    const handleUnpause = async () => {
        await contracts.TREASURY_AGOUSD.methods.unpauseCollateralRatio().send({from: account});
    }

    const handleRefreshCollateralRatio = async () => {
        await contracts.TREASURY_AGOUSD.methods.refreshCollateralRatio().send({from: account});
    }

    return (
        <div className='mint-wrapper'> 
            <div className='mint-window'>
                <div className='mint-window-header'> 
                    <h3> Mint </h3>
                    <button className='mint-window-settings-btn' onClick={() => setMintRedeemCurrencyModal(true)}> <img src={setting_cog} alt="settings"/> </button>
                </div>
                <div className='mint-window-input-row'> 
                    <span> <h3> Input <b> -{info.targetCollateralRatio}% </b> </h3> </span>
                    <span className='balance'> <h3> Balance: {getTokenBalance(mintRedeemCurrency === "AGOUSD" ? "USDT" : "WBTC")}  </h3> </span>
                    <input type='number' placeholder="0.00" onChange={(e) => handleCollateralInput(e.target.value)} value={collateralInput}/>
                    <span className='currency'> <TokenIcon iconName={ mintRedeemCurrency === "AGOUSD" ? "USDT" : "WBTC"}/> {mintRedeemCurrency === "AGOUSD" ? "USDT" : "WBTC"} </span>
                </div>
                <div className='mint-window-op-sign-row'> 
                    <i className="fas fa-plus"/>
                </div>
                <div className='mint-window-input-row'> 
                    <span> <h3> Input <b> -{info.targetCollateralRatio - 100}% </b> </h3> </span>
                    <span className='balance'> <h3> Balance: {getTokenBalance(mintRedeemCurrency === "AGOUSD" ? "CNUSD" : "CNBTC")} </h3> </span>
                    <input type='number' disabled={info.targetCollateralRatio === 100} placeholder={info.targetCollateralRatio === 100 ? "TCR is 100%" : "0.00"} onChange={(e) => handleCatenaInput(e.target.value)} value={info.targetCollateralRatio === 100 ? "" : catenaInput}/>
                    <span className='currency'> <TokenIcon iconName={mintRedeemCurrency === "AGOUSD" ? "CNUSD" : "CNBTC"}/> {mintRedeemCurrency === "AGOUSD" ? "CNUSD" : "CNBTC"}</span>
                </div>
                <div className='mint-window-op-sign-row'> 
                    <i className="fas fa-arrow-down"/>
                </div>
                <div className='mint-window-input-row output'> 
                    <span> <h3> Output(estimated) </h3> </span>
                    <span className='balance'> <h3> Balance: {getTokenBalance(mintRedeemCurrency)} </h3> </span>
                    <input disabled type='number' placeholder="0.00" value={outputInput}/>
                    <span className='currency'> <TokenIcon iconName={mintRedeemCurrency}/> {mintRedeemCurrency} </span>
                </div>
                {/* <button style={{background: "pink", width: "200px", height: "50px"}} onClick={() => handleRefreshCollateralRatio()}> Pablo refresh TCR </button>
                <button style={{background: "pink", width: "200px", height: "50px"}} onClick={() => handleUnpause()}> Pablo Unpause </button> */}
                <MintButton/>
            </div>
        </div>
    )
}

export default React.memo(Mint);