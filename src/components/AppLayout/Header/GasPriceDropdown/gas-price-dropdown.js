import React, {useContext, useEffect, useRef, useState} from 'react';
import './gas-price-dropdown.scss';
import GasSvg from "../svg/gasSvg";
import ArrowDown from "../svg/arrowDown";
import {ThemeContext} from "../../../App/App";

export const GasPriceDropdown = () => {

    const [viewGas, setViewGas] = useState(false);

    const gasPrice = [
        {name: "Standard", value: 131, active: true},
        {name: "Fast", value: 151, active: false},
        {name: "Instant", value: 200, active: false}
    ]

    const changeActiveGasPrice = (value) => {
        console.log(value);
    }

    const {theme} = useContext(ThemeContext)

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


    return (
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
    )

}