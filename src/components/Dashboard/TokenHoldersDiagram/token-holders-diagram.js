import React from 'react';
import './token-holders-diagram.scss';

export const TokenHoldersDiagram = () => {

    // TODO: make data real.

    return (
        <div className={'token dashBox'}>
            <h2 className={'dashBox__h2'}>Total Users <span className={'dashBox__h2--green'}>+8.35%</span></h2>
            <div className={'token__year'}>
                2021
                {/* {viewMonth.find(el => el.active)?.year} */}
            </div>
            <div className={'token__progress'}>
                <div className={'token__progress__circle'}>
                    <h4 className={'token__progress__circle__value'}>
                        200
                        {/* {viewMonth.find(el => el.active)?.value} */}
                    </h4>
                </div>
            </div>
        </div>
    )
}