import React, { useContext } from 'react';
import calculate_txs from '../../../assets/icons/calculate-txs.svg';
import { ThemeContext } from '../../App/App';


export const AccHistory = ({isOpened, setIsOpened}) => {


    const {theme} = useContext(ThemeContext);

    // const mockUserHistory = [
    //     {
    //         date: "September 20, 2021",
    //         actions: [
    //             {name: "Approve", time: "01:05 PM EST", contractName: "Treasury", address: "0x6e6Baf3A4fE4b2290C7E9C40a06dEe9026931fF5"},
    //             {name: "Mint", time: "01:07 PM EST",  txCost: "20.00 MATIC", contractName: "Treasury", address: "0x6e6Baf3A4fE4b2290C7E9C40a06dEe9026931fF5"},
    //             {name: "Approve", time: "01:05 PM EST", txCost: "0.00 MATIC", contractName: "Treasury", address: "0x6e6Baf3A4fE4b2290C7E9C40a06dEe9026931fF5"},
    //         ]
    //     },
    //     {date: "September 19, 2021"},
    //     {date: "September 18, 2021"},
    //     {date: "September 17, 2021"},
    // ]


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