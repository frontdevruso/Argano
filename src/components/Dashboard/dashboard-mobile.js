import React, {useState} from 'react';
import styled from 'styled-components';
import tx_icon from '../../assets/icons/transactions-icon-mobile.svg';
import chart_icon from '../../assets/icons/charts-icon-mobile.svg';
import {TVLChart} from './TVLChart/TVLChart';
import {Volume24h} from './Volume24h/volume24h';
import {TokenTransactionsMobile} from './TokenTransactionsMobile/token-transactions-mobile';
import {TokenPricesChartsMobile} from './TokenPricesChartsMobile/token-prices-charts-mobile';

const DashboardWrapperMobile = styled.div`
  display: grid;
  grid-template-rows: 0.5fr 3fr 1fr;
`
const TVLVolumeSwitch = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  box-sizing: border-box;
  padding: 0 5%;
`
const SwitchButton = styled.button`
  margin-right: 10px;
  background: ${props => props.active ? "#2D2D2D" : "transparent"};
  border-radius: 20px;
  border: ${props => props.active ? "2px solid #40BA93" : "none"};
  height: 45%;
  align-self: flex-end;
  color: ${props => props.active ? "white" : "#BDBDBD;"};
  font-weight: ${props => props.active ? "600" : "300"};
  font-size: 14px;
`
const InfoButtonsArea = styled.div`
  display: grid;
  margin-bottom: 30px;
  height: 115px;
  grid-template-rows: 2fr 1fr;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  box-sizing: border-box;
  grid-gap: 5%;
  padding: 0 5%;
`

const InfoButton = styled.button`
  display: grid;
  align-self: flex-end;
  place-items: center;
  background: linear-gradient(90.99deg, #272727 2.18%, #1C1C1C 104.4%);
  border: 2px solid #333333;
  box-sizing: border-box;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  width: 100%;
  height: 100%;
  margin-bottom: 30px;
`

const InfoLabel = styled.span`
  display: grid;
  align-self: flex-start;
  color: white;
`

export const DashboardMobile = () => {

    const [activeTab, setActiveTab] = useState("TVL")
    const [openTxs, setOpenTxs] = useState(false);
    const [openCharts, setOpenCharts] = useState(false);

    return (
        <DashboardWrapperMobile>
            <TVLVolumeSwitch activeTab>
                <SwitchButton onClick={() => setActiveTab("TVL")} active={activeTab === "TVL"}> TVL </SwitchButton>
                <SwitchButton onClick={() => setActiveTab("Volume 24h")} active={activeTab === "Volume 24h"}> Volume
                    24h </SwitchButton>
            </TVLVolumeSwitch>
            {activeTab === "TVL" ? <TVLChart/> : <Volume24h/>}
            <InfoButtonsArea>
                <InfoButton onClick={() => setOpenTxs(true)}> <img src={tx_icon} alt={"mobile-tx-icon"}/> </InfoButton>
                <InfoButton onClick={() => setOpenCharts(true)}> <img src={chart_icon} alt={"mobile-chart-icon"}/>
                </InfoButton>
                <InfoLabel> Transactions </InfoLabel>
                <InfoLabel> Informations </InfoLabel>
            </InfoButtonsArea>
            <TokenTransactionsMobile opened={openTxs} setOpened={setOpenTxs}/>
            <TokenPricesChartsMobile opened={openCharts} setOpened={setOpenCharts}/>
        </DashboardWrapperMobile>
    )
}