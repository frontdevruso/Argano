import React, { useContext, useState, useEffect } from 'react';
import calculate_txs from '../../../assets/icons/calculate-txs.svg';
import { useSystemContext } from '../../../systemProvider';
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';


export const AccHistory = ({isOpened, setIsOpened}) => {


    const {account} = useWeb3React();
    const {theme} = useSystemContext()

    const [history, setHistory] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {

        
        const fetchData = async () => {
            const {data} = await axios.get("https://argano-rest-api-sever.herokuapp.com/api/userActions/?address=0x0")
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
            <div className='acc-hisotry-body'> </div>
        </div>
    )

}