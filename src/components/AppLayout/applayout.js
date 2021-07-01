import React, {useState, useContext, useEffect} from "react";
import SideBar from "./SideBar/sidebar";
import Header from "./Header/header";
import './applayout.scss';
import {ThemeContext, Web3Context} from "../App/App";
import useWindowDimensions from "../../utils/helpers";
import {useSpring} from "react-spring";
import {RightSideBar} from "./RightSideBar/right-side-bar";
const Layout = ({children}) => {


    const { height, width } = useWindowDimensions();

    const {theme, setTheme} = useContext(ThemeContext)
    const {web3, setModal} = useContext(Web3Context);
    const [isLeftSideBarOpened, setLeftSideBarOpened] = useState(false);
    const [isRightSideBarOpened, setRightSideBarOpened] = useState(false);

    const sidebarsHandlers = {
        left: setLeftSideBarOpened,
        right: setRightSideBarOpened
    }

    useEffect(() => {
        if (width > 768) {
            setLeftSideBarOpened(true)
        }
    }, [width])


    return(

        <>
            <div className={theme === 'dark' ? 'layout-wrapper' : 'layout-wrapper layout-light'}>

                <SideBar isLeftSideBarOpened={isLeftSideBarOpened} handlers={sidebarsHandlers}/>
                <Header sidebarHandlers={sidebarsHandlers}/>
                <RightSideBar right={isRightSideBarOpened} sidebarsHandlers={sidebarsHandlers}/>
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
                </div>
            </div>

        </>

    )
}

export default Layout;