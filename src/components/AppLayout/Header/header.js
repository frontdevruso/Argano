import React, {useState, useContext, useEffect} from 'react'
import {ThemeContext} from "../../App/App"
import {Web3Context} from "../../App/App"
import {GasPriceDropdown} from "./GasPriceDropdown/gas-price-dropdown"
import {WalletBalanceDropdown} from "./WalletBalanceDropdown/wallet-balance-dropdown"
import './header.scss'


export const Header = ({sidebarHandlers}) => {
    const {left, right} = sidebarHandlers
    const [viewGas, setViewGas] = useState(false)
    
    // Theme
    const {theme} = useContext(ThemeContext)
    const {web3, setWeb3, modal, setModal} = useContext(Web3Context)
    const [rightSideKurwa, setRightSideKurwa] = useState(right)

    const [connected, setConnected] = useState(true) //TODO: change it to Web3 (Test only);
    
    const disconnect = () => {
        setConnected(false)
        setWeb3({instance: undefined, address: undefined})
        setModal(true)
    }

    const connect = () => {
        setModal(true)
    }

    useEffect( () => setConnected( Boolean(web3?.instance) ), [web3] )
    
    useEffect(() => {
        right(rightSideKurwa) // TODO: take this stupid shit off.
    }, [rightSideKurwa])


        
    


    return (
        <div className={ theme === 'light' ? 'header-wrapper light' : 'header-wrapper'}>

            <div className={'left-sidebar'}>
                <button onClick={() => left(true)}><i className="fas fa-bars"></i></button>
            </div>

            <div className={'search-field'}>
                <input type={'text'} placeholder={'Search ARGANO pairs and contracts...'}/>
            </div>

            <div className={'right-options-bar'}>
                <button onClick={() => setRightSideKurwa(!rightSideKurwa)}><i className="fas fa-cog"></i></button>
            </div>

            <GasPriceDropdown/>
            <WalletBalanceDropdown/>
            <div className={'address'}>
                <span>{connected ? `${web3?.address.slice(0, 6)}...${web3?.address.slice(-4)}` : "not conncected"}</span>
            </div>
            <div className={'account-button'}>
                <button onClick={connected ? disconnect : connect}> 
                    <i className={connected ? 'fas fa-user' : 'fas fa-wallet'} />
                </button>
            </div>
        </div>
    )
}

export default Header