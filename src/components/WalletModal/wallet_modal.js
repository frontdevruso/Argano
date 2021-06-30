import React, {useContext, useState} from 'react';
import {ThemeContext, Web3Context} from "../App/App";
import CloseSvg from './svg/closeSvg';

// Wallet icons
import metaMask from './wallet-icons/metamask.png';
import walletConnect from './wallet-icons/wallet-connect.png';
import trustWallet from './wallet-icons/trust-wallet.svg';
import mathWallet from './wallet-icons/math-wallet.svg';
import tokenPocket from './wallet-icons/token-pocket.svg';
import safepalWallet from './wallet-icons/safepal-logo.svg';

import './wallet_modal.scss';
import {authWeb3} from "../../utils/web3Auth";
export const WalletModal = () => {


    const [walletList, setWalletList] = useState([
        {name:'MetaMask', icon:<img width={40} height={40} src={metaMask} alt={'icon'}/>},
        {name:'WalletConnect', icon:<img width={40} height={40} src={walletConnect} alt={'icon'}/>},
        {name:'TrustWallet', icon:<img width={40} height={40} src={trustWallet} alt={'icon'}/>},
        {name:'MathWallet', icon:<img width={40} height={40} src={mathWallet} alt={'icon'}/>},
        {name:'Token Poket', icon:<img width={40} height={40} src={tokenPocket} alt={'icon'}/>},
        {name:'SafePal Wallet', icon:<img width={40} height={40} src={safepalWallet} alt={'icon'}/>},


    ])

    const {theme, setTheme} = useContext(ThemeContext);
    const {modal,setWeb3, setModal} = useContext(Web3Context);

    const closeModal = (e) => {
        const outOfModal = document.querySelector('#modalBg');
        if (e.target === outOfModal) {
            setModal(false);
        }
    }
    const handleConnect = async (walletName) => {

        const result = await authWeb3(walletName);
        console.log(result);
        setWeb3(result);
        setModal(false);
    }

    return (
        <>
        { modal === true ?
            <div className={'walletModal__bg'} onClick={closeModal} id={'modalBg'}>
                <div className={theme === 'dark' ? 'walletModal walletModal__black' : 'walletModal'}>
                  <span className={'walletModal__close'} onClick={() => setModal(false)}><CloseSvg
                      color={theme === "dark" ? '#fff' : '#444'}/></span>
                    <h3 className={'walletModal__h3'}>Connect Wallet</h3>
                    <h4 className={'walletModal__h4'}>Choose Your Wallet</h4>
                    <div className={'walletModal__terms'}>
                        <label className={'container'}>
                            <input type={'checkbox'}/>
                            <span className="checkmark"></span>
                        </label>

                        <p>I accept <a>Terms of Service</a>, <a>Legal Disclosure</a> and <a>Privacy Policy</a>.</p>
                    </div>
                    <div className={'walletModal__list'}>
                        {walletList && walletList.map((wallet, _ind) => (
                            <div onClick={() => handleConnect(wallet.name)} key={`wallet__item__${_ind}`}
                                 className={'walletModal__list__item'}>
                                    {wallet.icon}

                                <h5 className={'walletModal__list__item__h5'}>{wallet.name}</h5>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            : ""
        }
        </>
    )

}