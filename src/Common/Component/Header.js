import React, {useState} from 'react';
import {BrowserRouter as Router, Link, NavLink} from "react-router-dom";
import {CONSTANT_ROUTES} from "../../Config/RoutePath";
import vk_logo from '../../assert/images/logo.png';
import down_white_img from '../../assert/images/down_arrow_white.svg';
import down_arrow from '../../assert/images/down_arrow.svg';
import '../style/header.scss';

const Header = () => {
    const [style, setStyle] = useState(false);
    const myFunction = () => {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    };
    const onClick = () =>{
        setStyle(!style);
    };
    return (
        <div className="header navbar2 w-nav">
            {/*<div className="topnav" id="myTopnav">*/}
            {/*<div className="header-menu">*/}
            {/*    <Link to="/" activeClassName="active"><a>Home</a></Link>*/}
            {/*    <div>*/}
            {/*        <Link to={CONSTANT_ROUTES.user.contactUs}><a>ContactUs</a></Link>*/}
            {/*        <Link to={CONSTANT_ROUTES.user.aboutUs}><a>About</a></Link>*/}
            {/*        <div className="dropdown">*/}
            {/*            <button className="dropbtn">Services*/}
            {/*                <i className="fa fa-caret-down"></i>*/}
            {/*            </button>*/}
            {/*            <div className="dropdown-content">*/}
            {/*                <Link to={CONSTANT_ROUTES.user.services}><a>Air Conditioner</a></Link>*/}
            {/*                <Link to={CONSTANT_ROUTES.user.services}><a>Camera</a></Link>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<a href="#about">About</a>*/}
            {/*<a style={{fontSize:'15px'}} className="icon"*/}
            {/*   onClick={() => myFunction()}>&#9776;</a>*/}
            {/*</div>*/}

            <div className="menu-bg"/>
            <div className="container navb">
                <Link to='/'><a className="brand-2 w-nav-brand w--current">
                    <div className="logo-white-div">
                        <div className="logo-n">
                            <img src={vk_logo} alt={'vk_logo'}/>
                        </div>
                    </div>
                </a></Link>
                <nav role="navigation" className="nav-menu home w-nav-menu">
                    <div className="flex-menu2">
                        <Link to="/" className="navlink w-nav-link"><a>Home</a></Link>
                        <Link to={CONSTANT_ROUTES.user.aboutUs} className="navlink w-nav-link"><a>About</a></Link>
                        <div className={`${style ? 'dropdown-true': ''} dropdown w-dropdown`} aria-expanded={style ? "true" : "false"} onClick={() =>onClick()}>
                            <div className={`${style && 'w--open'} navlink-dropdown w-dropdown-toggle`}>
                                <img src={down_white_img} alt={'down_white_img'} className="menu-arrow"/>
                                <div>Services</div>
                                <img src={down_arrow} className='menu-arrow-grey' alt={'down_arrow'}/>
                            </div>
                            <nav className={`${style && 'w--open'} dropdown-menu w-dropdown-list`}>
                                <Link to={'/'}><a className="link-menu-no-line w-dropdown-link">Camera</a></Link>
                                <Link to={'/'}><a className="link-menu w-dropdown-link">Air Conditioner</a></Link>
                            </nav>
                        </div>
                    </div>
                </nav>
                <div className="_2-btns">
                    <Link to={CONSTANT_ROUTES.admin.login}><a className='button-white-header w-button'>Sign In</a></Link>
                </div>
                <div data-w-id="17c57e8c-3fe3-0089-2152-708c3729a622" className="nav-btn absol w-nav-button" aria-label="menu" role="button" tabIndex="0"
                     aria-controls="w-nav-overlay-0" aria-haspopup="menu" aria-expanded="false">
                    <div className="nav-btn-line first w"></div>
                    <div className="nav-btn-line mid w"></div>
                    <div className="nav-btn-line last w"></div>
                </div>
                <div className="w-nav-overlay" data-wf-ignore="" id="w-nav-overlay-0"/>
            </div>
        </div>
    )

};
export default Header;