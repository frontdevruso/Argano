import React from 'react';
import { Switch } from 'antd';
import './currency-switch-modal.scss';
import { useSystemContext } from '../../../systemProvider';

export const CurrencySwitchModal = () => {

    const {setMintRedeemCurrencyModal, mintRedeemCurrencyModal, setMintRedeemCurrency, mintRedeemCurrency, theme, setMintRedeemSlipage, mintRedeemSlipage} = useSystemContext();

    // TODO: Should be slippage here.

    const handleSlippageChange = (value) => {

        if (value > 100) {
            setMintRedeemSlipage(100)
        }
        else if (value < 0) {
            setMintRedeemSlipage(0)
        }
        else if (value === "") {
            setMintRedeemSlipage(0)
        }
        else {
            setMintRedeemSlipage(parseInt(value));
        }
    }

    return (
        <>
        {mintRedeemCurrencyModal ? 
                <div className='currency-switch-wrapper'> 
                    <div className='currency-switch-modal'> 
                        <a href="#" onClick={() => setMintRedeemCurrencyModal(false)}> <i class="fas fa-times"></i> </a>
                        <h1> Switch between AGOUSD - AGOBTC </h1>
                        <Switch checked={mintRedeemCurrency === "AGOBTC" ? true : false} onChange={() => setMintRedeemCurrency(mintRedeemCurrency === "AGOUSD" ? "AGOBTC" : "AGOUSD")}/>
                        <span> Set slippage: </span>
                        <input type='number' min={0} max={100} onChange={(e) => handleSlippageChange(e.target.value)} value={mintRedeemSlipage}/>
                    </div>
                </div>
                :
                ""
        }
        </>
    )
}