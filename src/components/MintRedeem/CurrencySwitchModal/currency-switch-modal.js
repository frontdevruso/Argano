import React from 'react';
import { Switch } from 'antd';
import './currency-switch-modal.scss';
import { useSystemContext } from '../../../systemProvider';

export const CurrencySwitchModal = () => {

    const {setMintRedeemCurrencyModal, mintRedeemCurrencyModal, setMintRedeemCurrency, mintRedeemCurrency, theme} = useSystemContext();

    return (
        <>
        {mintRedeemCurrencyModal ? 
                <div className='currency-switch-wrapper'> 
                    <div className='currency-switch-modal'> 
                        <a href="#" onClick={() => setMintRedeemCurrencyModal(false)}> <i class="fas fa-times"></i> </a>
                        <h1> Switch between AGOUSD - AGOBTC </h1>
                        <Switch checked={mintRedeemCurrency === "AGOBTC" ? true : false} onChange={() => setMintRedeemCurrency(mintRedeemCurrency === "AGOUSD" ? "AGOBTC" : "AGOUSD")}/>
                    </div>
                </div>
                :
                ""
        }
        </>
    )
}