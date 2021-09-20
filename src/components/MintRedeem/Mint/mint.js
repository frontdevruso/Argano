import React from 'react';
import setting_cog from '../../../assets/icons/setting-cog.svg'
import { TokenIcon } from '../../TokenIcon/token_icon';


export const Mint = ({selectedCurrency}) => {





    return (
        <div className='mint-wrapper'> 
            <div className='mint-window'>
                <div className='mint-window-header'> 
                    <h3> Mint </h3>
                    <button> <img src={setting_cog}/> </button>
                </div>
                <div className='mint-window-input-row'> 
                    <span> <h3> Input <b> -85.75% </b> </h3> </span>
                    <span className='balance'> <h3> Balance: 0.0 </h3> </span>
                    <input type='number' placeholder="0.00"/>
                    <span className='currency'> <TokenIcon iconName={"USDT"}/> USDT </span>
                </div>
                <div className='mint-window-op-sign-row'> 
                    <i className="fas fa-plus"/>
                </div>
                <div className='mint-window-input-row'> 
                    <span> <h3> Input <b> -85.75% </b> </h3> </span>
                    <span className='balance'> <h3> Balance: 0.0 </h3> </span>
                    <input type='number' placeholder="0.00"/>
                    <span className='currency'> <TokenIcon iconName={"CNUSD"}/> CNUSD </span>
                </div>
                <div className='mint-window-op-sign-row'> 
                    <i className="fas fa-arrow-down"/>
                </div>
                <div className='mint-window-input-row output'> 
                    <span> <h3> Output(estimated) </h3> </span>
                    <span className='balance'> <h3> Balance: 0.0 </h3> </span>
                    <input disabled type='number' placeholder="0.00"/>
                    <span className='currency'> <TokenIcon iconName={"AGOUSD"}/> AGOUSD </span>
                </div>
                <button className='mint-window-run-mint'> Mint </button>
            </div>
        </div>
    )

}