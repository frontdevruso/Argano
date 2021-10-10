import { useWeb3React } from '@web3-react/core';
import { message } from 'antd';
import React, { useState } from 'react';
import { MINT_REDEEM_KEY } from '../../../constants';
import setting_cog from '../../../assets/icons/setting-cog.svg'
import { useSystemContext } from '../../../systemProvider';
import { formatFromDecimal, formatToDecimal } from '../../../utils/helpers';
import { TokenIcon } from '../../TokenIcon/token_icon';


export const Mint = () => {


    const {account} = useWeb3React();
    const { setMintRedeemCurrencyModal, mintRedeemCurrency, contracts, tokens } = useSystemContext();
    const [mintButtonDisabled, setMintButtonDisabled] = useState(false);
    const [collateralInput, setCollateralInput] = useState(0);
    const [catenaInput, setCatenaInput] = useState(0);


    const handleCollateralInput = (value) => {
        setCollateralInput(value)
    }

    const handleCatenaInput = (value) => {
        setCatenaInput(value)
    }

    // console.log(contracts?.TREASURY_AGOUSD.methods.target_collateral_ratio().call())
    // contracts?.TREASURY_AGOUSD.methods.dollarPrice().call().then((res) => console.log(formatFromDecimal(res, tokens.AGOUSD.decimals)))


    const handleMint = async () => {

        if (collateralInput > 0) {
            if (mintRedeemCurrency === "AGOUSD") {
                try {
                    message.loading({content: "Mint in process", className: "ant-argano-message", key: MINT_REDEEM_KEY, duration: 3000});
                    setMintButtonDisabled(true);
                    await contracts.POOL_AGOUSD.methods.mint(formatToDecimal(collateralInput, tokens.USDT.decimals), formatToDecimal(catenaInput, tokens.CNUSD.decimals), formatToDecimal(collateralInput, tokens.AGOUSD.decimals)).send({from: account});
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

    return (
        <div className='mint-wrapper'> 
            <div className='mint-window'>
                <div className='mint-window-header'> 
                    <h3> Mint </h3>
                    <button onClick={() => setMintRedeemCurrencyModal(true)}> <img src={setting_cog} alt="settings"/> </button>
                </div>
                <div className='mint-window-input-row'> 
                    <span> <h3> Input <b> -85.75% </b> </h3> </span>
                    <span className='balance'> <h3> Balance: 0.0 </h3> </span>
                    <input type='number' placeholder="0.00" onChange={(e) => handleCollateralInput(e.target.value)} value={collateralInput}/>
                    <span className='currency'> <TokenIcon iconName={ mintRedeemCurrency === "AGOUSD" ? "USDT" : "WBTC"}/> {mintRedeemCurrency === "AGOUSD" ? "USDT" : "WBTC"} </span>
                </div>
                <div className='mint-window-op-sign-row'> 
                    <i className="fas fa-plus"/>
                </div>
                <div className='mint-window-input-row'> 
                    <span> <h3> Input <b> -85.75% </b> </h3> </span>
                    <span className='balance'> <h3> Balance: 0.0 </h3> </span>
                    <input type='number' placeholder="0.00" onChange={(e) => handleCatenaInput(e.target.value)} value={catenaInput}/>
                    <span className='currency'> <TokenIcon iconName={mintRedeemCurrency === "AGOUSD" ? "CNUSD" : "CNBTC"}/> {mintRedeemCurrency === "AGOUSD" ? "CNUSD" : "CNBTC"}</span>
                </div>
                <div className='mint-window-op-sign-row'> 
                    <i className="fas fa-arrow-down"/>
                </div>
                <div className='mint-window-input-row output'> 
                    <span> <h3> Output(estimated) </h3> </span>
                    <span className='balance'> <h3> Balance: 0.0 </h3> </span>
                    <input disabled type='number' placeholder="0.00"/>
                    <span className='currency'> <TokenIcon iconName={mintRedeemCurrency}/> {mintRedeemCurrency} </span>
                </div>
                <button disabled={mintButtonDisabled} className='mint-window-run-mint' onClick={handleMint}> Mint </button>
            </div>
        </div>
    )

}