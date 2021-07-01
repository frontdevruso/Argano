import React, {useContext, useEffect, useRef, useState} from "react";
import './wallet-balance-dropdown.scss';
import BalanceSvg from "../svg/balanceSvg";
import ArrowDown from "../svg/arrowDown";
import {ThemeContext} from "../../../App/App";


export const WalletBalanceDropdown = () => {

    const {theme} = useContext(ThemeContext);

    const [viewBalance, setViewBalance] = useState(false);
    const [balanceFilter, setBalanceFilter] = useState('agoToken')
    const [show, setShow] = useState(1);

    const userTokens = [
        {type: 'agoToken', name: 'AGO', usd: 13.02},
        {type: 'else', name: 'PASHA', usd: 0.111111111},
    ]

    const useOuterClick = (callback) =>{
        const callbackRef = useRef(); // initialize mutable callback ref
        const innerRef = useRef(); // returned to client, who sets the "border" element

        // update callback on each render, so second useEffect has most recent callback
        useEffect(() => { callbackRef.current = callback; });
        useEffect(() => {
            document.addEventListener("click", handleClick);
            return () => document.removeEventListener("click", handleClick);
            function handleClick(e) {
                if (innerRef.current && callbackRef.current &&
                    !innerRef.current.contains(e.target)
                ) callbackRef.current(e);
            }
        }, []); // no dependencies -> stable click listener

        return innerRef; // convenience for client (doesn't need to init ref himself)
    }

    const innerRefTwo = useOuterClick(ev => {setViewBalance(false)});
    const pages = [...Array(Math.ceil(userTokens.filter(el => el.type === balanceFilter).length /3)).keys()];

    return (
        <div className={'walletBalance'} ref={innerRefTwo}>
            <div className={viewBalance ? 'walletBalance__preView open' : 'walletBalance__preView'}
                 onClick={() => setViewBalance(!viewBalance)}>
                <BalanceSvg color={theme === 'dark' ? '#333' : '#E0E0E0'}/>
                <span className={'walletBalance__preView__title'}>Balance</span>
                <span className={'walletBalance__preView__value'}>17.02 $</span>
                <ArrowDown color={theme === "dark" ? '#fff' : '#444'}/>
            </div>
            <div
                className={viewBalance ? 'walletBalance__tokens walletBalance__tokens--open' : 'walletBalance__tokens'}>
                <div className={'walletBalance__tokens__buttons'}>
                    <button
                        className={balanceFilter === 'agoToken' ? 'walletBalance__tokens__buttons__button walletBalance__tokens__buttons__button--active' : 'walletBalance__tokens__buttons__button'} onClick={()=>setBalanceFilter('agoToken')}>AGO Tokens</button>
                    <button className={balanceFilter === 'else'?'walletBalance__tokens__buttons__button walletBalance__tokens__buttons__button--active':'walletBalance__tokens__buttons__button'} onClick={()=>setBalanceFilter('else')}>Other Tokens</button>
                </div>
                <div className={'walletBalance__tokens__list'}>
                    {userTokens && userTokens.filter(el => el.type === balanceFilter).slice(show>1?3*(show-1):0,3*show).map((token, _ind) => (
                        <div key={`walletBalance__tokens__list__items__${_ind}`}
                             className={'walletBalance__tokens__list__items'}>
                            <span>{token.name}</span>
                            <span>{token.usd}</span>
                        </div>
                    ))}
                </div>
                <div className={'walletBalance__tokens__nav'}>
                    <ul>
                        {pages.map(el=>(
                            <button
                                className={show === el+1?'cardWithInfo__navigation__number cardWithInfo__navigation__number--active':`cardWithInfo__navigation__number`}
                                key={`numbers_${el}`}
                                onClick={()=>setShow(el+1)}
                            >{el+1}</button>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}