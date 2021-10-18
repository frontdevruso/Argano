import React, { useContext, useEffect, useState } from 'react';
import { formatDate } from '../utils/helpers';

const DashboardContext = React.createContext();

export const useDashboardContext = () => useContext(DashboardContext);


export const DashboardProvider = ({children}) => {

    const [dashTokens, setDashTokens] = useState([]);
    const mockTokenCresd = {
        AGOUSD: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
        CNUSD: "0x831753dd7087cac61ab5644b308642cc1c33dc13",
        AGOBTC: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
        CNBTC: "0xd6df932a45c0f255f85145f286ea0b292b21c90b",
    }
        

    useEffect(() => {
        getData();
    }, [])


    const getData = async () => {

        Object.entries(mockTokenCresd).map(async (item) => {

            const main_data = await (await (fetch(`https://api.coingecko.com/api/v3/coins/polygon-pos/contract/${item[1]}`))).json()
            const chart_data = await (await (fetch(`https://api.coingecko.com/api/v3/coins/polygon-pos/contract/${item[1]}/market_chart/?vs_currency=usd&days=12`))).json()

            const prices = chart_data.prices.filter((chart_item, _ind) => {
                if (_ind === 0) {
                    return true;
                }
                if ( new Date(chart_item[0]).getDate() === new Date(chart_data.prices[_ind - 1][0]).getDate() ) {
                    return false;
                }

                return true;
            }).map((chart_item) => {
                return {time: new Date(chart_item[0]).getDate(), value: chart_item[1].toFixed(2)}
            })

            setDashTokens(prevState => {
                const newObj = {
                    name: item[0],
                    currentPrice: Math.round(main_data.market_data.current_price.usd),
                    change24h: main_data.market_data.price_change_percentage_24h.toFixed(2)  + "%",
                    chartPrices: prices,
                    supply: main_data.market_data.circulating_supply,
                    marketCap: main_data.market_data.market_cap.usd,
                }
                
                return [...prevState, newObj];

            })
        })
    }

    const contextValues = {
        dashTokens
    }

    return (
        <DashboardContext.Provider value={contextValues}> 
            {children}
        </DashboardContext.Provider>
    )


}