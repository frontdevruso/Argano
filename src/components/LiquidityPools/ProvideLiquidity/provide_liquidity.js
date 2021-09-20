import React from 'react';
import { TokenIcon } from '../../TokenIcon/token_icon';


export const ProvideLiquidity = ({pool}) => {

    const {pool: {firstToken, secondToken}} = pool;


    return(
        <div className='provide-liquidity-block'> 
            <div className='provide-liquidity-block__input-row'> 
                <span> <p>{firstToken} </p> <p>=$47,654.36</p>  </span>
                <div> 
                    <p><TokenIcon iconName={firstToken}/> <h5>{firstToken}</h5> </p>
                    <input type="number" placeholder={`Enter ${firstToken} amout`}/>
                </div>
            </div>
            <div className='provide-liquidity-block__input-row'> 
                <span> <p>{secondToken} </p> <p>=$6,654.36</p>  </span>
                <div> 
                    <p><TokenIcon iconName={secondToken}/> <h5>{secondToken}</h5> </p>
                    <input type="number" placeholder={`Enter ${secondToken} amout`}/>
                </div>
            </div>
            <div className='provide-liquidity-block__add-info-row'> 
                <span> <p> Enter lp amount to mint </p> <p>Max: -0.23965842676254</p>  </span>
                <input type="number" placeholder="Enter LP amount to mint"/>
            </div>
            <div className='provide-liquidity-block__add-info-row'> 
                <span> <p> USD value </p> <p>Max: = -$140.26</p>  </span>
                <input type="number" placeholder="Enter first token amout"/>
            </div>
        </div>
    )

}