import React from 'react';
import {TokenPricesCharts} from './TokenPricesCharts/token-prices-charts';
import {TVLChart} from './TVLChart/TVLChart';
import {Volume24h} from './Volume24h/volume24h';
import {TokenTransactionTable} from './TokenTransactionsTable/token-transaction-table';
import {useSystemContext} from '../../systemProvider';
import styled from 'styled-components';
import {useMediaQuery} from 'react-responsive';
import {DashboardMobile} from './dashboard-mobile';

const DashboardWrapper = styled.div`
  display: grid;
  width: 100%;
  position: relative;
  grid-template-rows: repeat(3, auto);
  grid-column-gap: 20px;
  grid-row-gap: 5%;
  justify-items: center;
  padding: 1.5%;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (min-width: 500px) and (max-width: 768px) {
    grid-row-gap: 0;
  }

  .tvl-volume {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 5%;
    @media screen and (min-width: 500px) and (max-width: 768px) {
      grid-column-gap: 2%;
      width: 95%;
      margin-bottom: 15px;
    }
  }
`

export const Dashboard = () => {

    const {theme} = useSystemContext();
    const isMobileScreen = useMediaQuery({query: '(max-width: 767px)'})


    return (
        <>
            {isMobileScreen ?
                <DashboardMobile/>
                :
                <DashboardWrapper>
                    <TokenPricesCharts/>
                    <div className='tvl-volume'>
                        <TVLChart/>
                        <Volume24h/>
                    </div>
                    <TokenTransactionTable/>
                </DashboardWrapper>
            }
        </>
    )
}
export default Dashboard