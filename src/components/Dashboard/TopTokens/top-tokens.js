import React, {useState, useEffect, useContext} from 'react';
import {Loader} from "../../Loader/loader";
import {getTopTokenList} from "../../../utils/getDashboardData";
import {DashboardContext} from "../dashboard";
import {ThemeContext} from "../../App/App";
import './top-tokens.scss';

export const TopTokens = () => {

    const {latestBlock} = useContext(DashboardContext);

    const [tokenList, setTokenList] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const fetchData = async () => {
            const res = await getTopTokenList(latestBlock);
            setTokenList(res);
            setLoading(false)
        }

        fetchData()

    }, [tokenList.length])

    const List = () => {
        return (
            <div className="token-list-ol-wrapper">
                {tokenList.length && <ol className={'tokenList__list'}>
                    {tokenList.map((token, _ind) => (
                        <>
                            <li key={`token_li_${_ind}`}>
                                {`${_ind+1}. ${token.name}(${token.symbol})`}
                                <span className={token.precent[0] === "-" ? "tokenList__span tokenList__span--red" : "tokenList__span--green"}> {token.precent} </span>
                            </li>
                        </>
                    ))}
                </ol>}
            </div>
        )
    }

    return (
        <div className={'tokenList dashBox'}>
            <h2 className={'dashBox__h2'}>Top 5 Tokens</h2>
            {loading ? <Loader/> : <List/>}
        </div>
    )
}

export default TopTokens;