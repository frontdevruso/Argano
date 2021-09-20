import React, {useContext, useState} from 'react'
import {ThemeContext, Web3Context} from "../App/App"
import CloseSvg from './svg/closeSvg'

// Wallet icons
import metaMask from './wallet-icons/metamask.png'
import walletConnect from './wallet-icons/wallet-connect.png'
import trustWallet from './wallet-icons/trust-wallet.svg'
import mathWallet from './wallet-icons/math-wallet.svg'
import tokenPocket from './wallet-icons/token-pocket.svg'
import safepalWallet from './wallet-icons/safepal-logo.svg'

import './wallet_modal.scss'
import {authWeb3} from "../../utils/web3Auth"

const walletList = [
    {name:'MetaMask',       icon: <img width={40} height={40} src={metaMask}         alt={'icon'} /> },
    {name:'WalletConnect',  icon: <img width={40} height={40} src={walletConnect}    alt={'icon'} /> },
    {name:'CoinBase',    icon: <img width={40} height={40} src={trustWallet}      alt={'icon'} /> },
    {name:'MathWallet',     icon: <img width={40} height={40} src={mathWallet}       alt={'icon'} /> },
    {name:'Token Poket',    icon: <img width={40} height={40} src={tokenPocket}      alt={'icon'} /> },
    {name:'SafePal Wallet', icon: <img width={40} height={40} src={safepalWallet}    alt={'icon'} /> },
]


export const WalletModal = () => {
    const {theme, setTheme} = useContext(ThemeContext)
    const {modal, setWeb3, setModal} = useContext(Web3Context)
    const closeModal = e => e.target === document.querySelector('#modalBg') && setModal(false)
        
    const handleConnect = async walletName => {
        const result = await authWeb3(walletName)
        if (result.instance){
            setWeb3(result)
            setModal(false)
        }
    }

    return (
        <>
        { modal ?
            <div className={'walletModal-bg'} onClick={closeModal} id={'modalBg'}>
                <div className={`walletModal ${theme === 'dark' ? '' : ' walletModal-light'}`}>
                  <span className={'walletModal-close'} onClick={() => setModal(false)}><CloseSvg
                      color={theme === "dark" ? '#fff' : '#444'}/></span>
                    <h3 className={'walletModal-h3'}>Connect Wallet</h3>
                    <h4 className={'walletModal-h4'}>Choose Your Wallet</h4>
                    <div className={'walletModal-terms'}>
                        <label className={'container'}>
                            <input type={'checkbox'}/>
                            <span className="checkmark"></span>
                        </label>

                        <p>I accept <a>Terms of Service</a>, <a>Legal Disclosure</a> and <a>Privacy Policy</a>.</p>
                    </div>
                    <div className={'walletModal-list'}>
                        {walletList && walletList.map((wallet, _ind) => (
                            <div onClick={() => handleConnect(wallet.name)} key={`wallet__item__${_ind}`}
                                 className={'walletModal-list__item'}>
                                    {wallet.icon}
                                <h5 className={'walletModal-list__item__h5'}>{wallet.name}</h5>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            : null
        }
        </>
    )

}

export default WalletModal