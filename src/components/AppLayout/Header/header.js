import React, {useState, useContext, useEffect, useRef} from 'react';
import {ThemeContext} from "../../App/App";
import GasSvg from './svg/gasSvg';
import ArrowDown from './svg/arrowDown';
import BalanceSvg from './svg/balanceSvg';
import './header.scss';
export const Header = ({sidebarHandlers}) => {

    const {left, right} = sidebarHandlers;

    const [show, setShow] = useState(1);
    const [viewGas, setViewGas] = useState(false);
    const [viewBalance, setViewBalance] = useState(false);
    const [balanceFilter, setBalanceFilter] = useState('agoToken')
    const [connected, setConnected] = useState(true) //TODO: change it to Web3 (Test only);
    const { gasPrice, userTokens } = {
        gasPrice: [
            {name: "Standard", value: 131, active: true},
            {name: "Fast", value: 151, active: false},
            {name: "Instant", value: 200, active: false}
        ],
        userTokens: [
            {type: 'agoToken', name: 'AGO', usd: 13.02},
            {type: 'else', name: 'PASHA', usd: 0.111111111},

        ]
    }
    // const {account} = useSelector(state => state.authReducer);

    // Theme
    const {theme, setTheme} = useContext(ThemeContext)


    const changeActiveGasPrice = (value) => {
        console.log(value);
    }

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


    const innerRef = useOuterClick(ev => {setViewGas(false)});
    const innerRefTwo = useOuterClick(ev => {setViewBalance(false)});

    useEffect(()=>{
        document.body.addEventListener('click',(e)=>{
            if(viewGas || viewBalance){
                console.log('event',e.target)
            }
        })
    },[])

    const pages = [...Array(Math.ceil(userTokens.filter(el => el.type === balanceFilter).length /3)).keys()];
    return (
        <div className={ theme === 'light' ? 'header-wrapper light' : 'header-wrapper'}>

            <div className={'left-sidebar'}>
                <button onClick={() => left(true)}><i className="fas fa-bars"></i></button>
            </div>

            <div className={'search-field'}>
                <input type={'text'} placeholder={'Search ARGANO pairs and contracts...'}/>
            </div>

            <div className={'right-options-bar'}>
                <button onClick={() => right(true)}><i className="fas fa-cog"></i></button>
            </div>
            <div className={'gasPrice'} ref={innerRef}>
                <div className={viewGas ? 'gasPrice__preView open' : 'gasPrice__preView'}
                     onClick={() => setViewGas(!viewGas)}>
                    <GasSvg color={theme === "dark" ? '#fff' : '#444'}/>
                    <span>Gas Price</span>
                    <ArrowDown color={theme === "dark" ? '#fff' : '#444'}/>
                </div>
                <div className={viewGas ? 'gasPrice__list gasPrice__list--open' : 'gasPrice__list'}>
                    <h4 className={'header-wrapper__gasPrice__list__h4'}>
                        {`${gasPrice.find(el => el.active)?.name} `}({gasPrice.find(el => el.active)?.value} GWEI)
                    </h4>
                    <input type={'number'} placeholder={'Custom'} value={gasPrice.find(el => el.name === 'Custom')?.value}
                           onChange={(e) => console.log("lol)")}/>
                    {gasPrice && gasPrice.map((price, _ind) => (
                        <div key={`gasPrice__list__item__${_ind}`}
                             className={price.active ? 'gasPrice__list__item gasPrice__list__item--active' : 'gasPrice__list__item'}
                             onClick={() => changeActiveGasPrice(price.name)}>
                            {price.value} {price.name}
                        </div>
                    ))}
                </div>
            </div>
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
            <div className={'address'}>
                {connected ? <span> 0x6e6Baf3A4f...931f51 </span> : ""}
            </div>
            <div className={'account-button'}>
                <span> {connected ? "Change Wallet" : "Connect"} </span>
                <button onClick={() => alert("Connect Wallet Bitch")}> {connected ? <i className='fas fa-wallet'/> : <i className='fas fa-user'/>} </button>

            </div>
        </div>
    )
}

export default Header;