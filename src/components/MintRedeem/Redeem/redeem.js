import React from 'react';
import { TokenIcon } from '../../TokenIcon/token_icon';
import setting_cog from '../../../assets/icons/setting-cog.svg';


export const Redeem = () => {


    

    return (
        <div className='redeem-wrapper'>
            <div className='collect-redemption'> 
                <div>
                    <h3> Collect redemption </h3>
                    <button> Collect </button>
                </div>
                <div> 
                    <h3> 0.0 <b>USDT</b> </h3>
                    <h3> 0.0 <b>AGOUSD</b> </h3>
                </div>
            </div>
        <div className='redeem-window'>
            <div className='redeem-window-header'> 
                <h3> Redeem </h3>
                <button> <img src={setting_cog}/> </button>
            </div>
            <div className='redeem-window-input-row'> 
                <span> <h3> Input </h3> </span>
                <span className='balance'> <h3> Balance: 0.0 </h3> </span>
                <input className='inpunt-redeem' type='number' placeholder="0.00"/>
                <span className='currency'> <TokenIcon iconName={"AGOUSD"}/> AGOUSD </span>
            </div>
            <div className='redeem-window-op-sign-row'> 
                <i className="fas fa-plus"/>
            </div>
            <div className='redeem-window-input-row'> 
                <span> <h3> Output USDT - <b> 91.6392% </b> </h3> </span>
                <span className='balance'> <h3> Balance: 0.0 </h3> </span>
                <input disabled type='number' placeholder="0.00"/>
                <span className='currency'> <TokenIcon iconName={"USDT"}/> USDT </span>
            </div>
            <div className='redeem-window-op-sign-row'> 
                <i className="fas fa-arrow-down"/>
            </div>
            <div className='redeem-window-input-row output'> 
                <span> <h3> Output CNUSD - <b> 8.3608% </b> </h3> </span>
                <span className='balance'> <h3> Balance: 0.0 </h3> </span>
                <input disabled type='number' placeholder="0.00"/>
                <span className='currency'> <TokenIcon iconName={"CNUSD"}/> CNUSD </span>
            </div>
            <button className='redeem-window-run-mint'> Redeem </button>
        </div>
    </div>
    )

}