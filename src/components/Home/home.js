import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import icon1 from './img/landingIcon1.png'
import icon2 from './img/landingIcon2.png'
import icon3 from './img/landingIcon3.png'
import icon4 from './img/landingIcon4.png'
import icon5 from './img/landingIcon5.png'
import logo from './svg/Group 90.svg'
import minilogo from './img/miniLogo.png'
import mobilelogo from './svg/Group 74.svg'
import ring from './img/landing_ring.png'
import './home.scss';
import CloseMobIcon from './svg/CloseMobIcon';
import MobileBurger from './svg/MobileBurger';

function Home() {
    const [pageLoad, setPageLoad] = useState(false);
    const [animateSecOne, setAnimateSecOne] = useState(false);
    const [animateSecTwo, setAnimateSecTwo] = useState(false);
    const [openMobileMenu, setOpenMobileMenu] = useState(false);
    const socials = [
        { icon: 'fab fa-github', href: 'https://argano-1.gitbook.io/argano-ecosystem/' },
        { icon: 'fab fa-medium', href: 'https://medium.com/@Argano' },
        { icon: 'fab fa-twitter', href: 'https://twitter.com/argano_io' },
        { icon: 'fab fa-discord', href: 'https://discord.gg/87FHsZqz' },
        { icon: 'fab fa-telegram-plane', href: 'https://t.me/ARGANO_DEFI' },
        { icon: 'fas fa-envelope', href: 'mailto:email@argano.io' },
    ]



    const blockAnimations = () => {
        if (document.querySelector('#sectionOne') && document.querySelector('#sectionTwo')) {
            const height1 = document.querySelector('#sectionOne').offsetTop
            const height2 = document.querySelector('#sectionTwo').offsetTop
            // console.log(e)
            const block = document.querySelector('#root');
            if (block.scrollTop >= (height1 - (window.innerHeight + 50))) {
                setAnimateSecOne(true)
            }

            if (block.scrollTop >= (height2 - (window.innerHeight + 50))) {
                setAnimateSecTwo(true)
            }
        }

    }


    useEffect(() => {
        document.querySelector('#root').style.height = '100vh'
        document.querySelector('#root').style.overflowX = 'auto'
        setTimeout(() => {
            setPageLoad(true);
        }, 500)


    }, [])


    useEffect(_ => {

        const block = document.querySelector('#root');
        block.addEventListener('scroll', blockAnimations)
        return _ => {
            block.removeEventListener('scroll', blockAnimations)
        }
    }, [])



    return (
        <container className={'landing__container'}>
            <div className={openMobileMenu ? 'landing__container__mobileMenu landing__container__mobileMenu--open mobile' : 'landing__container__mobileMenu mobile'}>
                <div className={'landing__container__mobileMenu__close'} onClick={() => setOpenMobileMenu(false)}>
                    <CloseMobIcon />
                </div>
                <div className={'landing__container__mobileMenu__logo'}>
                    <img src={mobilelogo} alt={'mob logo'} />
                    <h3 ><span>ARGANO</span></h3>
                </div>
                <div className={'landing__container__mobileMenu__links'}>
                    <a href={'https://argano-1.gitbook.io/argano-ecosystem/'} id={'docs'} target={'_blank'}>Documentation</a>
                    <a className="download-button" href="https://drive.google.com/uc?export=download&id=1YhXpHI9vH5by7PgNP2oZGwU9Kw2u5Lov" target="_blank" download><i class="far fa-file-pdf"></i></a>
                </div>

                <div className={'landing__container__mobileMenu__social'}>
                    <ul className={`landing__container__mobileMenu__social__ul`}>
                        {socials && socials.map((el, _ind) => (
                            <a href={el.href} target={'_blank'} className={'landing__container__mobileMenu__social__ul__link'}>
                                <i className={`${el.icon}`}></i>
                            </a>
                        ))}
                    </ul>
                </div>
            </div>
            <section className={'landing landing__topSec'}>
                <div className={'landing__topSec__head'}>
                    <div className={'landing__topSec__head__burger mobile'} onClick={() => setOpenMobileMenu(true)}>
                        <MobileBurger />
                    </div>
                    <div className={'landing__topSec__head__logo desktop'}>
                        <img src={logo} alt={'logos'} className={`${pageLoad && 'animation'}`} />
                    </div>
                    <div className={'landing__topSec__head__logo mobile'}>
                        <img src={mobilelogo} alt={'mob logo'} className={`${pageLoad && 'animation'}`} />
                        <h3 className={`${pageLoad && 'animation'}`}><span>ARGANO</span></h3>
                    </div>
                    <div className={`landing__topSec__head__links desktop`}>
                        <div className={`landing__topSec__head__links__box ${pageLoad && 'animation'}`}>
                            <a href={'https://argano-1.gitbook.io/argano-ecosystem/'} download className={'docs'} target={'_blank'}>Documentation</a>
                            <a className="download-button" href="https://drive.google.com/uc?export=download&id=1YhXpHI9vH5by7PgNP2oZGwU9Kw2u5Lov" target="_blank" download><i class="far fa-file-pdf"></i></a>
                            {/* <a href={'#'} className={'public-sale'} target={'_blank'}>Public sale</a> */}
                        </div>
                    </div>
                </div>
                <div className={'landing__topSec__center'}>
                    <div className={`landing__topSec__center__box  ${pageLoad && 'animation'}`}>
                        <h2 className={`landing__topSec__center__h2`}>Argano is a decentralized protocol for profitable farming</h2>
                        <p className={`landing__topSec__center__p`}>
                            "Glory is in the hands of labor"
                            <span>— Leonardo da Vinci</span>
                        </p>
                    </div>

                </div>
                <div className={'landing__topSec__bottom'}>
                    <Link to='/dashboard' className={'landing__topSec__bottom__button'}>
                        <button className={`${pageLoad && 'animation'}`}>Launch App</button>
                    </Link>
                    {/* <div className={'landing__topSec__bottom__button'}>
						<button disabled={true} className={`${pageLoad && 'animation'}`}>Coming Soon</button>
					</div> */}
                    {/*до*/}


                    <ul className={`landing__topSec__bottom__ul ${pageLoad && 'animation'} desktop`}>
                        {socials && socials.map((el, _ind) => (
                            <a href={el.href} target={'_blank'} className={'landing__topSec__bottom__ul__link'}>
                                <i className={`${el.icon}`}></i>
                            </a>
                        ))}
                    </ul>
                </div>
                <div className={`landing__topSec__ring ${pageLoad && 'animation'} desktop`}>
                    <img src={ring} alt={'ring'} />
                </div>
            </section>

            <section id={'sectionOne'} className={'landing landing__centerSec'}>
                <div className={'landing__centerSec__left'}>
                    <h3><span className={`${animateSecOne && 'animation'}`}>About Argano</span></h3>
                </div>
                <div className={'landing__centerSec__right'}>

                    <div className={'landing__centerSec__right__Icon'}>
                        <img src={icon1} alt={'icon'} className={`${animateSecOne && 'animation'}`} />
                    </div>
                    <div className={`landing__centerSec__right__text ${animateSecOne && 'animation'}`}>
                        <h3 className={'landing__centerSec__right__text__h3'}>
                            Argano DAO token
                        </h3>
                        <p className={'landing__centerSec__right__text__p'}>
                            AGO - is a native DAO token of the Argano ecosystem, built on
                            the ERC-20 standard on the Ethereum mainnet. AGO was
                            designed to provide rewards for community members who
                            participate in the liquidity program. The token price fully
                            reflects the performance of the Argano platform and decreases
                            trading fees for the token holders.
                        </p>
                    </div>

                    <div className={'landing__centerSec__right__Icon'}>
                        <img src={icon2} alt={'icon'} className={`${animateSecOne && 'animation'}`} />
                    </div>
                    <div className={`landing__centerSec__right__text ${animateSecOne && 'animation'}`}>
                        <h3 className={'landing__centerSec__right__text__h3'}>
                            Staking synthetic tokens
                        </h3>
                        <p className={'landing__centerSec__right__text__p'}>
                            Earn passive income up to 30% and 18% APR on our
                            AGOBTC and AGOUSD savings. Unstake at any time. Get
                            rewarded with the native Argano token. Become a $BTC
                            investor on the Argano DEX.
                        </p>
                    </div>

                    <div className={'landing__centerSec__right__Icon'}>
                        <img src={icon3} alt={'icon'} className={`${animateSecOne && 'animation'}`} />
                    </div>
                    <div className={`landing__centerSec__right__text ${animateSecOne && 'animation'}`}>
                        <h3 className={'landing__centerSec__right__text__h3'}>
                            Liquidity mining program
                        </h3>
                        <p className={'landing__centerSec__right__text__p'}>
                            Yield farming has never been so simple. Become the liquidity
                            provider, ensure asset swapping by increasing the liquidity for
                            the trading volume and earn fees in the AGO native token.
                        </p>
                    </div>

                    <div className={'landing__centerSec__right__Icon'}>
                        <img src={icon4} alt={'icon'} className={`${animateSecOne && 'animation'}`} />
                    </div>
                    <div className={`landing__centerSec__right__text ${animateSecOne && 'animation'}`}>
                        <h3 className={'landing__centerSec__right__text__h3'}>
                            Leveraged & Margin Trading
                        </h3>
                        <p className={'landing__centerSec__right__text__p'}>
                            Argano DEX makes it possible to discover for yourself
                            cryptocurrency trading using professional tools. Increase your
                            position size without using whole capital. Borrow funds exactly
                            on the Argano exchange without a KYC check-up.
                        </p>
                    </div>

                    <div style={{ paddingRight: "10%" }} className={'landing__centerSec__right__Icon'}>
                        <img src={icon5} alt={'icon'} className={`${animateSecOne && 'animation'}`} />
                    </div>
                    <div className={`landing__centerSec__right__text ${animateSecOne && 'animation'}`}>
                        <h3 className={'landing__centerSec__right__text__h3'}>
                            Asset management
                        </h3>
                        <p className={'landing__centerSec__right__text__p'}>
                            Everything in one place:
                            <ul>
                                <li>Portfolio profits & losses statistics</li>
                                <li>Active pools</li>
                                <li>Pending rewards</li>
                                <li>Trading activity</li>
                                <li>Historical data of the portfolio performance</li>
                            </ul>
                        </p>
                    </div>

                </div>
            </section>
            {/*animateSecTwo*/}
            <section id={'sectionTwo'} className={'landing landing__bottomSec'}>
                <h3 className={'landing__bottomSec__h3'}><span className={`${animateSecTwo && 'animation'}`}>2021 Roadmap</span></h3>
                <div className={`landing__bottomSec__box  landing__bottomSec__box__one ${animateSecTwo && 'animation'}`}>
                    <h4 className={'landing__bottomSec__box__h4'}>
                        Q1
                    </h4>
                    <div className={'landing__bottomSec__box__text'}>
                        <p className={'landing__bottomSec__box__text__p'}>Smart contracts development</p>
                        <p className={'landing__bottomSec__box__text__p'}>Assembly of layouts, designs</p>
                        <p className={'landing__bottomSec__box__text__p'}>Dashboard development</p>
                        <p className={'landing__bottomSec__box__text__p'}>Frontend and backend development</p>
                        <p className={'landing__bottomSec__box__text__p'}>Implementation of the staking functionality, an adaptation of the smart contracts, testing interaction with smart contracts</p>
                        <p className={'landing__bottomSec__box__text__p'}>Testing, troubleshooting and error correction</p>
                    </div>
                </div>


                <div className={`landing__bottomSec__box  landing__bottomSec__box__two ${animateSecTwo && 'animation'}`}>
                    <h4 className={'landing__bottomSec__box__h4'}>
                        Q2
                    </h4>
                    <div className={'landing__bottomSec__box__text'}>
                        <p className={'landing__bottomSec__box__text__p'}>Holding a presale event</p>
                        <p className={'landing__bottomSec__box__text__p'}>Dashboard visual and technical improvements</p>
                        <p className={'landing__bottomSec__box__text__p'}>Development of the Argano asset portfolio</p>
                        <ul className={'landing__bottomSec__box__text__ul'}>
                            <li>- P & L processing and storage of historical data</li>
                            <li>- Impermanent loss calculations</li>
                            <li>- Asset pool management functionality</li>
                        </ul>
                        <p className={'landing__bottomSec__box__text__p'}>Spot trading development, including cooperation and connection to 0x API</p>
                        <p className={'landing__bottomSec__box__text__p'}>Cross-chain asset trading implementation</p>
                        <p className={'landing__bottomSec__box__text__p'}>Leveraged and margin trading functionality</p>
                        <p className={'landing__bottomSec__box__text__p'}>Testing, troubleshooting and error correction</p>
                    </div>
                </div>


                <div className={`landing__bottomSec__box  landing__bottomSec__box__three ${animateSecTwo && 'animation'}`}>
                    <h4 className={'landing__bottomSec__box__h4'}>
                        Q3
                    </h4>
                    <div className={'landing__bottomSec__box__text'}>
                        <p className={'landing__bottomSec__box__text__p'}>L2 DEX: Stop Loss orders, Limit orders, advanced order book</p>
                        <p className={'landing__bottomSec__box__text__p'}>Futures contracts development</p>
                        <p className={'landing__bottomSec__box__text__p'}>Ultimate trading toolset development and testing</p>
                        <p className={'landing__bottomSec__box__text__p'}>Development of the other synthetic tokens and indices
                        </p>
                        <p className={'landing__bottomSec__box__text__p'}>Testing, troubleshooting and error correction</p>
                    </div>
                </div>

                <div className={`landing__bottomSec__box  landing__bottomSec__box__four ${animateSecTwo && 'animation'}`}>
                    <h4 className={'landing__bottomSec__box__h4'}>
                        Q4
                    </h4>
                    <div className={'landing__bottomSec__box__text'}>
                        <p className={'landing__bottomSec__box__text__p'}>Mobile applications on IOS and Android</p>
                        <p className={'landing__bottomSec__box__text__p'}>Extension in the browser for notifications</p>
                        <p className={'landing__bottomSec__box__text__p'}>Desktop application
                        </p>
                        <p className={'landing__bottomSec__box__text__p'}>Testing, troubleshooting and error correction
                        </p>
                    </div>
                </div>
            </section>

            <section className={'landing__footer'}>
                <div>
                    <img src={minilogo} alt={'miniLogo'} className={'landing__footer__logo'} />
                    <p className={'landing__footer__p'}>Copyright @ Argano Team 2021</p>
                </div>
                <div className={'landing__footer__right'}>
                    <ul className={'landing__footer__right__ul'}>
                        {socials && socials.map((el, _ind) => (
                            <a href={el.href} target={'_blank'} className={'landing__footer__right__ul__link'}>
                                <i className={`${el.icon}`}></i>
                            </a>
                        ))}
                    </ul>
                </div>
            </section>
        </container>

    );

}

export default Home;