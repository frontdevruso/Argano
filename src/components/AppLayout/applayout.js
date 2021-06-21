import React, {useState, useContext, useEffect} from "react";
import SideBar from "./SideBar/sidebar";
import Header from "./Header/header";
import './applayout.scss';
import {ThemeContext, Web3Context} from "../App/App";
const Layout = ({children}) => {

    const {theme, setTheme} = useContext(ThemeContext)
    const {web3, setModal} = useContext(Web3Context);
    const [isLeftSideBarOpened, setLeftSideBarOpened] = useState(false);
    const [isRightSideBarOpened, setRightSideBarOpened] = useState(false);

    const sidebarsHandlers = {
        left: setLeftSideBarOpened,
        right: setRightSideBarOpened
    }

    return(

        <>
        {isLeftSideBarOpened !== true && isRightSideBarOpened !== true ?
            <div className={theme === 'dark' ? 'layout-wrapper' : 'layout-wrapper layout-light'}>
                <div className={'layout-wrapper__sidebar'}>
                    <SideBar handlers={sidebarsHandlers}/>
                </div>
                <div className={'layout-wrapper__header'}>
                    <Header sidebarHandlers={sidebarsHandlers}/>
                </div>
                <div className={'layout-wrapper__content'}>
                    {web3 ?
                        children :
                        <div className={ theme === 'dark' ? 'wallet-connect-button' : 'wallet-connect-button light-mode'}>
                            <div>
                                <h1> Please connect your wallet </h1>
                                <button onClick={() => setModal(true)}> Connect <i className="fas fa-plug"></i> </button>
                            </div>
                        </div>
                    }
                    {}
                </div>
            </div>
        :
            ""
        }
        {isLeftSideBarOpened === true ? <SideBar sidebarHandlers={sidebarsHandlers}/> : ""}
        </>

    )
}

export default Layout;