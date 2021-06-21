import React, {useContext, useState} from 'react';
import Layout from "../AppLayout/applayout";
import './mint_redeem.scss';
import {TokenIcon} from "../TokenIcon/token_icon";
import {ThemeContext} from "../App/App";

export const MintInputs = (activeToken) => {


    const activeTokens = activeToken === 'AGOUSD' ? [
        {name: "USDT"},
        {name: "CNUSD"},
        {name: "AGOUSD"},
    ] : [
        {name: "WBTC"},
        {name: "CNBTC"},
        {name: "AGOBTC"}
    ]

    return (
        <div className={'body'}>
            <div className={'inputs'}>
                <span> Input - 85.75% </span>
                <input type={'number'} placeholder={0.00}/>
                <div className={'token-block'}>
                    <TokenIcon iconName={activeTokens[0].name}/>
                    <h4>{activeTokens[0].name}</h4>
                </div>
            </div>
            <div className={'sign'}>
                <h1><i className="fas fa-plus"></i> </h1>
            </div>
            <div className={'inputs'}>
                <span> Input - 14.25% </span>
                <input type={'number'} placeholder={0.00}/>
                <div className={'token-block'}>
                    <TokenIcon iconName={activeTokens[1].name}/>
                    <h4>{activeTokens[1].name}</h4>
                </div>
            </div>
            <div className={'sign finished'}>
                <h1><i className="fas fa-arrow-down"></i> </h1>
            </div>
            <div className={'inputs'}>
                <span> Output(estimated) </span>
                <input type={'number'} placeholder={0.00}/>
                <div className={'token-block'}>
                    <TokenIcon iconName={activeTokens[2].name}/>
                    <h4>{activeTokens[2].name}</h4>
                </div>
            </div>
        </div>
    )

}

const RedeemInputs = (activeToken) => {

    const activeTokens = activeToken === 'AGOUSD' ? [
        {name: "AGOUSD"},
        {name: "USDT"},
        {name: "CNUSD"}
    ] : [
        {name: "AGOBTC"},
        {name: "WBTC"},
        {name: "CNBTC"}
    ]

    return (
        <div className={'body'}>
            <div className={'inputs'}>
                <span> Input  </span>
                <input type={'number'} placeholder={0.00}/>
                <div className={'token-block'}>
                    <TokenIcon iconName={activeTokens[0].name}/>
                    <h4>{activeTokens[0].name}</h4>
                </div>
            </div>
            <div className={'sign'}>
                <h1><i className="fas fa-plus"></i> </h1>
            </div>
            <div className={'outputs'}>
                <span> Output {activeTokens[1].name} - 91.6392% </span>
                <span className={'balance-redeem'}> Balance: 0.00</span>
                <input type={'number'} placeholder={0.00}/>
                <div className={'token-block'}>
                    <TokenIcon iconName={activeTokens[1].name}/>
                    <h4>{activeTokens[1].name}</h4>
                </div>
            </div>
            <div className={'sign finished'}>
                <h1><i className="fas fa-arrow-down"></i> </h1>
            </div>
            <div className={'outputs'}>
                <span> Output {activeTokens[2].name} - 8.3608% </span>
                <span className={'balance-redeem'}> Balance: 0.00</span>
                <input type={'number'} placeholder={0.00}/>
                <div className={'token-block'}>
                    <TokenIcon iconName={activeTokens[2].name}/>
                    <h4>{activeTokens[2].name}</h4>
                </div>
            </div>
        </div>
    )

}

export const MintRedeem = () => {

    const [activeTab, setActiveTab] = useState("Mint");
    const [activeToken, setActiveToken] = useState('AGOUSD');
    const {theme} = useContext(ThemeContext);

    const wrapperClassName = activeTab === 'Mint'? 'mint-redeem-wrapper ' : 'mint-redeem-wrapper redeem '
    const classThemeAddon = theme === 'dark' ? "" : ' mint-redeem-light';

    return (
        <Layout>
            <div className={wrapperClassName + classThemeAddon}>

                <div className={'switcher'}>
                    <button onClick={() => setActiveTab("Mint")} className={activeTab === "Mint" ? 'active': ''}>Mint</button>
                    <button onClick={() => setActiveTab("Redeem")} className={activeTab === "Redeem" ? 'active' : ''}>Redeem</button>
                </div>

                <div className={'collect-redemption'}>
                    <div className={'header'}>
                        <h4>Collect redemption</h4>
                        <button> Collect </button>
                    </div>
                    <div className={'body'}>
                        <h4> 0.0 <b>WBTC</b> </h4>
                        <h4> 0.0 <b>AGOBTC </b> </h4>
                    </div>
                </div>

                <div className={'window'}>

                    <div className={'header'}>
                        <h1> {activeTab === 'Mint' ? 'Mint' : 'Redeem'}</h1>
                        <button><i className="fas fa-cog"/></button>
                    </div>

                    {activeTab === "Mint" ? <MintInputs activeToken={activeToken}/> : <RedeemInputs activeToken={activeToken}/>}


                    <div className={'window__accept-button'}>
                        <button>{activeTab === "Mint" ? "Mint" : "Redeem"}</button>
                    </div>
                </div>

                <div className={'txinfo-window'}>
                    <div className={'info'}>

                        <div>
                            <span>{activeTab === "Mint" ? "Minting fee" : "Redemption fee"}</span>
                            <span> 0.20% </span>
                        </div>
                        <div>
                            <span>Pool balance</span>
                            <span> $9,003,073.6227</span>
                        </div>
                        <div>
                            <span>Slippage</span>
                            <span>0.10%</span>
                        </div>
                        <div>
                            <span>Rates</span>
                            {activeToken === "AGOUSD" ?
                                <span> 1000 <b> USDT </b> = 998 <b> AGOUSD </b></span>
                                :
                                <span> 51 <b>WBTC</b> = 51.500 <b> AGOBTC </b></span>
                            }
                        </div>

                    </div>
                    <div className={'scan-link'}>
                        <a href={"#"}>View contract on PolyScan <i className="fas fa-external-link-alt"></i> </a>
                    </div>

                </div>

            </div>
        </Layout>
    )
}






export default MintRedeem;