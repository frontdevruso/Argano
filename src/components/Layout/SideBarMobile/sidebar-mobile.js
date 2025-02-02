import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { PAGES } from '../../../constants';
import { ConnectWalletButton } from '../ConnectWallet/connect-wallet';
import { ThemeSwitcher } from '../ThemeSwitcher/theme-switcher';
import comments_black from '../../../assets/icons/nav-links/dark-theme/comment-black.svg';
import { useSwipeable } from 'react-swipeable';
import { useOuterClick } from '../../../hooks/outerClickHook';

const SideBarWrapper = styled.div`
    transition: 0.3s;
    position: fixed;
    z-index: 99999;
    padding-top: 10%;
    transform: ${props => props.visible ? "translateX(0px)" : "translateX(100vw)"};
    width: 100vw;
    background: rgb(41,67,58);
    //TODO: Ask Sergiy to generate true radial-gradient style rules. This is was generated by me and it is not so correct.
    background: radial-gradient(circle, rgba(44,94,77,1) 0%, rgba(38,51,47,1) 23%, rgba(35,35,35,1) 52%);
    height: 100%;
    top: 0;
    right: 0;
    display: grid;
    grid-template-rows: 1fr 3fr 1fr;
`

const Header = styled.div`
    position: relative;
    display: grid;
    grid-template-rows: 1fr 2fr;
    justify-items: center;
    h1 {
        color: white;
    }
`

const CloseButton = styled.button`
    position: absolute;
    right: 5%;
    background: transparent;
    color: white;
    border: 0;
    font-size: 24px;
`

const NavLinkList = styled.ul`
    display: grid;
    grid-template-rows: auto;
    width: 100%;
    height: 100%;
    align-items: center;
`
const NavLinkListItem = styled.li`
    position: relative;
    display: grid;
    grid-template-columns: 25% 75%;
    img {
        justify-self: center;
        width: 25px;
        height: 25px;
    }
    h1 {
        font-size: 18px;
        color: ${props => props.active ? "white" : "#828282"};
        font-weight: ${props => props.active ? "600" : "500"};
    }
`

const ActiveBorderNavListItem = styled.div`
    position: absolute;
    left: 0;
    width: 10px;
    height: 100%;
    visibility: ${props => props.active ? "visible" : "hidden"};
    background: linear-gradient(180deg, #40BA93 0%, rgba(64, 186, 147, 0) 126.47%);
    border-radius: 0px 5px 5px 0px;
`

const Footer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`

const SocialMediasListButton = styled.button`
    position: relative;
    width: 57px;
    height: 57px;
    place-self: center;
    background: transparent;
    border: 1px solid #4F4F4F;
    border-radius: 10px;
`

const SocialMediasList = styled.div`
    transition: 0.3s all;
    position: absolute;
    width: inherit;
    height: ${props => props.opened ? "70vh" : "0px"};
    z-index: ${props => props.opened ? "1000" : "-1000"};
    visibility: ${props => props.opened ? "visible" : "hidden"};
    border-radius: 12px;
    bottom: 0;
    left: 0;
    background: #232323;
    border: 1px solid #232323;
    display: grid;
    grid-template-rows: repeat(6, 1fr);
    align-items: center;
    a {
        color: white;
    }
`


export const SideBarMobile = ({showMobileSideBar, setShowMobileSideBar}) => {

    const history = useHistory();

    const [socialOpened, setSocialsOpened] = useState(false);

    const handlers = useSwipeable({
        onSwipedRight: () => setShowMobileSideBar(false),
        preventDefaultTouchmoveEvent: true,
    })

    const innerRef = useOuterClick(ev => {
        if (socialOpened) {
            setSocialsOpened(false)
        }
    });

    return (
        <SideBarWrapper {...handlers} visible={showMobileSideBar}> 
            <Header> 
                <h1> Menu </h1>
                <CloseButton onClick={() => setShowMobileSideBar(false)}> <i class="fas fa-times"></i>  </CloseButton>
                <ConnectWalletButton/>
            </Header>
            <NavLinkList> 
                {PAGES.map((item) => {
                    return (
                        <NavLink onClick={() => setShowMobileSideBar(false)} to={item.path}>
                            <NavLinkListItem active={item.path === history.location.pathname}>
                                <img src={item.path === history.location.pathname ? item.imgActive : item.img} alt={item.name + "-link"}/>
                                <h1>{item.name} </h1>
                                <ActiveBorderNavListItem active={item.path === history.location.pathname}/>
                            </NavLinkListItem>
                        </NavLink>
                    )
                })}
            </NavLinkList>
            <Footer> 
                <ThemeSwitcher/>
                <SocialMediasListButton opened={socialOpened} onClick={() => setSocialsOpened(true)}>
                    <img src={comments_black} alt={"social-medias"}/>
                    <SocialMediasList ref={innerRef} opened={socialOpened}> 
                        <a href="mailto:email@argano.io" target="_blank" rel="noreferrer"> <i class="fas fa-envelope"></i> </a>
                        <a href="https://t.me/ARGANO_DEFI" target="_blank" rel="noreferrer"> <i class="fab fa-telegram-plane"></i> </a>
                        <a href="https://discord.com/invite/mH7PJnNCWP" target="_blank" rel="noreferrer"> <i class="fab fa-discord"></i> </a>
                        <a href="https://twitter.com/argano_io" target="_blank" rel="noreferrer"> <i class="fab fa-twitter"></i> </a>
                        <a href="https://argano.medium.com/" target="_blank" rel="noreferrer"> <i class="fab fa-medium"></i> </a>
                        <a href="https://github.com/Argano-DEX/Argano-Contracts" target="_blank" rel="noreferrer"> <i class="fab fa-github"></i> </a>
                    </SocialMediasList>
                </SocialMediasListButton>
            </Footer>
        </SideBarWrapper>
    )
}