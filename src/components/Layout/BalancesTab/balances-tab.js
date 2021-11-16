import React, {useState} from 'react';
import styled from 'styled-components';
import {useSystemContext} from '../../../systemProvider';
import {formattedNum} from '../../../utils/helpers';
import {TokenIcon} from '../../TokenIcon/token_icon';
import pig_icon from '../../../assets/icons/pig-balances.svg';
import pig_icon_light from '../../../assets/icons/pig-balances-light.svg';
import {useWeb3React} from '@web3-react/core';
import {useMediaQuery} from 'react-responsive';
import {useSwipeable} from 'react-swipeable';
import vector from '../../../assets/icons/whiteVector.svg';

const BalancesTabWrapper = styled.div`
  transition: 0.3s all;
  width: ${props => props.opened ? "100%" : "19%"};
  align-self: center;
  height: 52px;
  padding: 5px 14px;
  margin-left: 15px;
  margin-top: 12px;
  margin-bottom: 14px;
  background: ${props => props.mobile ? "transparent" : "linear-gradient(95.07deg, rgba(58, 58, 58, 0.4) -21.03%, rgba(0, 0, 0, 0.4) 139.31%), rgba(51, 51, 51, 0.1)"};
  border: ${props => props.mobile ? "0" : "1px solid #333333"};
  box-sizing: border-box;
  border-radius: 25px;
  display: grid;
  grid-template-columns: ${props => props.mobile ? "1fr 2fr" : "1fr 4fr 1fr auto"};
  grid-template-rows: ${props => props.mobile ? "1fr 1fr" : "1fr"};
  grid-column: ${props => props.mobile ? "1/4" : null};
  justify-self: ${props => props.mobile ? "center" : null};
  align-items: center;
  font-size: 12px;
  cursor: pointer;
  @media screen and (max-width: 480px) {
    height: 22px;
    padding: 5px 14px;
    margin-right: 64px;
    margin-bottom: 24px;
    font-size: 15px;
  }

  img {
    margin-right: 5px;
    grid-row: ${props => props.mobile ? "1/3" : "1/2"};
    width: 36px;
    height: 36px;
  }

  @media screen and (max-width: 480px) {
    img:last-child {
      display: none;
    }
  }
  
  img:last-child {
    width: 10px;
    height: 10px;
    margin-bottom: 2px;
  }

  p {
      /*grid-row: ${props => props.mobile ? "none" : "1/2"};*/
    color: white;
    white-space: nowrap;
    line-height: 1;
  }

  .balance {
    color: #40BA93;
  }
`

const BalancesMobileExpandWrapper = styled.div`
  position: fixed;
  transition: 0.6s opacity;
  left: 0;
  top: 0;
  opacity: ${props => props.opened ? "1" : "0"};
  background: rgba(0, 0, 0, 0.7);
  height: 100vh;
  width: 100vw;
  z-index: ${props => props.opened ? "9999" : "-1000"};
`

const BalanceExpand = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  display: grid;
  transition: 0.6s all;
  transform: ${props => props.opened ? "translateY(0)" : "translateY(-100vh)"};
  grid-template-rows: 1fr 6fr 0.5fr;
  background: linear-gradient(157.07deg, rgba(30, 30, 30, 0.741) 0%, rgba(5, 5, 5, 0.95) 64.86%);
  border-radius: 0 0 40px 40px;
  z-index: ${props => props.opened ? "99999" : "-1000"};
`

const BalanceOverall = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-column-gap: 5px;

  img {
    grid-row: 1/3;
    align-self: center;
    justify-self: flex-end;
  }

  h5 {
    font-size: 14px;
    color: #40BA93;
    align-self: flex-end;

    &:last-child {
      align-self: flex-start;
      color: white;
    }
  }
`

const BalanceList = styled.ul`
  box-sizing: border-box;
  padding: 40px;
`

const BalanceSwipeStripe = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  place-items: center;

  div {
    background: #4F4F4F;
    border-radius: 10px;
    height: 5px;
    width: 15%;
  }
`

const BalanceListItem = styled.li`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 3fr;
  background: linear-gradient(90.99deg, #272727 2.18%, #1C1C1C 104.4%);
  border-radius: 20px;
  margin-bottom: 20px;
  height: 50px;
  box-sizing: border-box;
  padding: 0 20px;

  span {
    grid-row: 1/3;
    align-self: center;
    justify-self: flex-end;
    color: white;
  }

  img {
    width: 20px;
    height: 20px;
  }
`

const BalanceListDesktop = styled.ul`
  margin: 0;
  display: ${props => props.opened ? "grid" : "none"};
  grid-template-columns: repeat(7, auto);
`

const BalanceListItemDesktop = styled.li`
  display: grid;
  grid-template-columns: 1fr auto;
  border-right: 2px solid #4F4F4F;

  img {
    width: 20px;
    height: 20px;
  }

  span {
    color: #828282;
    font-size: 12px;
  }
`


export const BalancesTab = () => {

    const [balancesExpanded, setBalancesExpaned] = useState(false);
    const [balancesMobileExpanded, setBalancesMobileExpanded] = useState(false)
    const {account} = useWeb3React();
    const {theme, userProtfolio} = useSystemContext();
    const isMobileScreen = useMediaQuery({query: '(max-width: 767px)'})

    const handlersMobileBalancesExpanded = useSwipeable({
        onSwipedUp: () => {
            setBalancesMobileExpanded(false)
        },
        preventDefaultTouchmoveEvent: true,
    })

    return (
        <BalancesTabWrapper opened={balancesExpanded} mobile={isMobileScreen}
                            onClick={() => isMobileScreen ? setBalancesMobileExpanded(true) : setBalancesExpaned(!balancesExpanded)}>
            <>
                {account ?
                    <>
                        <img src={theme === "light" ? pig_icon_light : pig_icon} width={20} height={20} alt="balance"/>
                        <p className='balance'> Balance </p>
                        <p> {userProtfolio ? formattedNum(userProtfolio.reduce((a, {userUsdBalance}) => a + userUsdBalance, 0)) : 0.00}$ </p>
                        <BalanceListDesktop opened={balancesExpanded}>
                            {userProtfolio?.map((item) => {
                                return (
                                    <BalanceListItemDesktop key={"token-" + item.name}>
                                        <TokenIcon iconName={item.name}/>
                                        <span> {formattedNum(+item.userNativeBalance)}{item.name}/{formattedNum(item.userUsdBalance)}$ </span>
                                    </BalanceListItemDesktop>
                                )
                            })}
                        </BalanceListDesktop>
                        <div>
                            <img src={vector} style={{}}
                            />
                        </div>
                    </>
                    :
                    <p> No balance, connect wallet! </p>
                }
            </>
            {isMobileScreen ?
                <>
                    <BalancesMobileExpandWrapper opened={balancesMobileExpanded}>
                    </BalancesMobileExpandWrapper>
                    <BalanceExpand opened={balancesMobileExpanded}>
                        <BalanceOverall>
                            <img src={theme === "light" ? pig_icon_light : pig_icon} width={35} height={35}
                                 alt="balance"/>
                            <h5> Balance </h5>
                            <h5> {userProtfolio ? formattedNum(userProtfolio.reduce((a, {userUsdBalance}) => a + userUsdBalance, 0)) : 0.00}$ </h5>
                        </BalanceOverall>
                        <BalanceList>
                            {userProtfolio?.map(item => {
                                return (
                                    <BalanceListItem>
                                        <TokenIcon iconName={item.name}/>
                                        <span> {formattedNum(+item.userNativeBalance)}{item.name}/{formattedNum(item.userUsdBalance)}$ </span>
                                    </BalanceListItem>
                                )
                            })}
                        </BalanceList>
                        <BalanceSwipeStripe {...handlersMobileBalancesExpanded}>
                            <div></div>
                        </BalanceSwipeStripe>
                    </BalanceExpand>
                </>
                :
                null
            }
        </BalancesTabWrapper>
    )
}