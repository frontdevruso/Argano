import React, { useContext, useState, useEffect } from 'react';
import calculate_txs from '../../../assets/icons/calculate-txs.svg';
import { useSystemContext } from '../../../systemProvider';
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';
import { CONTRACT_ADRESESS } from '../../../constants';
import { TokenIcon } from '../../TokenIcon/token_icon';
import { formatFromDecimal } from '../../../utils/helpers';

export const AccHistory = ({isOpened, setIsOpened}) => {


    const {account} = useWeb3React();
    const {theme, tokens} = useSystemContext()

    const [history, setHistory] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {

        
        const fetchData = async () => {
            const {data} = await axios.get(`https://argano-rest-api-sever.herokuapp.com/api/userActions/?address=${account}`)
            setData(data)
        }

        fetchData()


    }, [])


    console.log(data);


    return (
        <div className={`acc-hisotry ${isOpened ? " acc-history-opened" : ""} ${theme === "light" ? " acc-history-light" : ""}`}>
            <a href="#" onClick={() => setIsOpened(false)}> <i className="fas fa-chevron-left"/> Account </a>
            <div className='acc-hisotry-header'> 
                <h1> History </h1>
                <input type="text" placeholder="Find by address, contract, function"/>
                <button> <img src={calculate_txs}/> Calculate Taxes </button>
            </div>
            <div className='acc-hisotry-body'>
                <ul> 
                    {data && data.map((item, _ind) => {

                        const tokenSpent = Object.entries(CONTRACT_ADRESESS).find(item_loc => item_loc[1].toLocaleLowerCase() === item.token_flow[0].token.toLowerCase());
                        const tokenSpentCount = formatFromDecimal(item.token_flow[0].amount.$numberDecimal, tokens[tokenSpent[0]].decimals); 

                        let tokenReceived;
                        let tokenReceivedCount;

                        if (item.token_flow.length > 1) {
                            tokenReceived = Object.entries(CONTRACT_ADRESESS).find(item_loc => item_loc[1].toLocaleLowerCase() === item.token_flow[1].token.toLowerCase());
                            tokenReceivedCount = formatFromDecimal(item.token_flow[1].amount.$numberDecimal, tokens[tokenReceived[0]].decimals); 
                        } 

                        else {
                            tokenReceived = "0"
                            tokenReceivedCount = "0"
                        }

                        return (
                            <li key={_ind}>
                                <h5>{item.method.charAt(0).toUpperCase() + item.method.slice(1)} </h5>
                                <span> <TokenIcon iconName={tokenSpent[0]}/> <p> {tokenSpent[0]} : {tokenSpentCount} </p> </span>
                                <h5> for </h5>
                                {item.token_flow.length > 1 ? 
                                    <span> <TokenIcon iconName={tokenReceived[0]}/> <p> {tokenReceived[0]} : {tokenReceivedCount} </p> </span>
                                    :
                                    null
                                }
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}