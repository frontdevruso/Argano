import React from 'react';
import styled from 'styled-components';
import { useSystemContext } from '../../../systemProvider';
import { useMediaQuery } from 'react-responsive';

const ThemeSwitcherWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    align-items: center;
    justify-items: center;
    width: 100%;
    height: 100%;
    i {
        color: white;
        font-size: ${props => props.mobile ? "18px" : "1.5vw"};
        &:first-child {
            justify-self: flex-end;
        }
        &:last-child {
            justify-self: flex-start;
        }
    }
    .acitve-daytime {
        color: #40BA93
    }
    .label {
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        color: #394a56;
    }
  
    .label-text {
        margin-left: 16px;
    }
    
    .toggle {
        isolation: isolate;
        position: relative;
        height: ${props => props.mobile ? "25px" : "1.75vw"};
        width: ${props => props.mobile ? "50px" : "3.5vw"};
        overflow: hidden;
        background: #ACACAC;
        box-shadow: inset 0px 4px 6px 1px rgba(14, 14, 14, 0.51);
        border-radius: 100px;
    }
  .toggle-state {
    display: none;
  }

  .active-theme-switch {
    transition: 0.5s all ease-in;
    background-color: #40BA93;
  } 
  
  .indicator {
    height: 100%;
    width: 200%;
    background: #ecf0f3;
    border-radius: ${props => props.mobile ? "20px" : "1vw"};
    transform: translate3d(-75%, 0, 0);
    transition: transform 0.4s cubic-bezier(0.85, 0.05, 0.18, 1.35);
  }
  
  .toggle-state:checked ~ .indicator {
    transform: translate3d(25%, 0, 0);
  }
`

export const ThemeSwitcher = () => {

    const {theme, setTheme} = useSystemContext();
    const isMobileScreen = useMediaQuery({ query: '(max-width: 767px)' });

    return (
        <ThemeSwitcherWrapper mobile={isMobileScreen}>
            <i className={`fas fa-moon ${theme === "dark" ? "acitve-daytime" : ""}`}></i>
            <label className="label">
                <div className={theme === "light" ? 'toggle active-theme-switch' : 'toggle'}>
                    <input className="toggle-state" onChange={() => setTheme(theme === "dark" ? "light" : "dark")} type="checkbox" name="check"/>
                    <div className="indicator"></div>
                </div>
            </label>
            <i className={`fas fa-sun ${theme === "light" ? "acitve-daytime" : ""}`}></i>
        </ThemeSwitcherWrapper>
    )
}