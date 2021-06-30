import React, {useState} from 'react';

// Protocol icons import
import ago from './svg/AGO.svg';
import agoUsd from './svg/AGOUSD.svg';
import agoBtc from './svg/AGOBTC.svg';
import cnUsd from './svg/CNUSD.svg';
import cnBtc from './svg/CNBTC.svg';

// Market icons import
import matic from './svg/MATIC.svg';
import usdt from './svg/USDT.svg';
import wbtc from './svg/WBTC.svg';

export const TokenIcon = ({iconName}) => {


    const tokens = [
        { name: "AGO", icon: ago },
        { name: "AGOUSD", icon: agoUsd },
        { name: "AGOBTC", icon: agoBtc },
        { name: "CNUSD", icon: cnUsd },
        { name: "CNBTC", icon: cnBtc },
        { name: "MATIC", icon: matic },
        { name: "USDT", icon: usdt },
        { name: "WBTC", icon: wbtc },
    ]


    const returnedToken = tokens.filter((item) => item.name === iconName)

    return (
        <img src={returnedToken[0].icon} width={40} height={40}/>
    )

}