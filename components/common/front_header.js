import React, {useContext, useEffect, useState} from "react";
import {
    Select,
    Drawer,
} from 'antd';
import Link from 'next/link';
import ls from "local-storage";
import {useRouter} from "next/router";

const {Option} = Select;
import ActivityContext from "../config/context";
import {Logo} from "../config/constant";
import Login from '../../pages/security/login.js'
import Register from "../../pages/security/register";
import {CloseCircleOutline} from "react-ionicons";
import {CloseCircleOutlined, CloseOutlined} from "@ant-design/icons";


export default function front_header(title) {
    const context = useContext(ActivityContext);
    const [fixedHeader, setFixedHeader] = useState(title === 'Merchant Area' ? 'bg-dark' : '');
    const [authVisible, setAuthVisible] = useState(false);
    const [display, setDisplay] = useState(0)
    let loggedIn = ls.get('4vam07');

    const listenScrollEvent = e => {
        if (title === 'Home') {
            if (window.scrollY > 50) {
                setFixedHeader('fixed-top bg-background')
            } else {
                setFixedHeader('fixed-top')
            }
        } else {
            setFixedHeader('sticky-top bg-background')
        }
    }

    const updateDisplay = (show) => {
        setDisplay(show)
    }

    const hideCanvas = () => {
        setAuthVisible(false)
    }


    useEffect(() => {
        listenScrollEvent();
        setDisplay(0);
        window.addEventListener('scroll', listenScrollEvent)

    }, [])


    return (
        <>
            <nav className={"navbar fixed-top d-lg-none navbar-dark bg-background"}>
                <div className="container-fluid">
                    <Link href="/">
                        <a className="navbar-brand">
                            <Logo color="white"/>
                        </a>
                    </Link>
                    <button className="navbar-toggler no_border" type="button" data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                        <span className="navbar-toggler-icon font-white"></span>
                    </button>
                    <div className="offcanvas w-100 offcanvas-end bg-background" tabIndex="-1" id="offcanvasNavbar"
                         aria-labelledby="offcanvasNavbarLabel">

                        <div className="offcanvas-header p-4">
                            <Logo color="white" size="large"/>

                            <a data-bs-dismiss="offcanvas"
                               aria-label="Close"><CloseOutlined style={{fontSize: 27, color: '#fff'}}/></a>
                        </div>
                        <div className="offcanvas-body p-4 ">

                            <nav className="nav navigation d-flex mb-4 flex-column justify-content-between">

                                <Link href="/">
                                    <a className={`font-sm-3 ${title === 'Home' && 'active'} text-white`}>Home</a>
                                </Link>
                                <Link href="/rent">
                                    <a className={`font-sm-3 ${title === 'Listing' && 'active'} text-white`}>Listing</a>
                                </Link>
                                <Link href="/company">
                                    <a className={`font-sm-3 ${title === 'Company' && 'active'} text-white`}>Company</a>
                                </Link>
                                <Link href="/contact">
                                    <a className={`font-sm-3 ${title === 'Contact' && 'active'} text-white`}>Contact</a>
                                </Link>
                            </nav>


                            {
                                loggedIn ? (

                                    <Link href="/dashboard/">
                                        <a className="btn btn-sm w-100 btn-primary">{context.user.first_name} {context.user.last_name && context.user.last_name.charAt(0) + "."}
                                            <i className="fa fa-chevron-circle-right ms-2"></i></a>
                                    </Link>

                                ) : (
                                    <a className="btn btn-sm w-100 btn-primary" data-bs-dismiss="offcanvas"
                                       aria-label="Close" onClick={() => setAuthVisible(true)}>My Account <i
                                        className="fa fa-chevron-circle-right ms-2"></i></a>
                                )
                            }


                        </div>
                    </div>
                </div>
            </nav>

            <header className={"d-none header_gradient d-lg-block ontop " + fixedHeader}>
                <div className="container ">
                    <header className="d-flex justify-content-between align-items-center py-3">

                        <Logo/>

                        <nav className="nav navigation d-flex justify-content-between">


                            <a className={`p-2 text-white`}>Our Homes</a>

                            <a className={`p-2 text-white`}>Download App</a>

                            <a onClick={() => setAuthVisible(true)} className={`p-2 text-white`}>Sign In</a>

                            <a className={`p-2 active text-white`}><i className="fa fa-map-marker-alt"></i> Lekki Phase 1</a>

                        </nav>


                    </header>


                </div>


            </header>


            <Drawer
                title=" "
                className="authPanel"
                onClose={() => {
                    setAuthVisible(false)
                }}
                visible={authVisible}
                zIndex={99999999}
            >

                {
                    display === 0 ? (
                        <Login displayRegister={updateDisplay} hideCanvas={hideCanvas}/>
                    ) : (
                        <Register displayRegister={updateDisplay}/>
                    )
                }
                {/*<MessageView messageData={messageData} view='user' ref={componentRef} />*/}
            </Drawer>

            {
                title !== 'Home' && (
                    <div className="fixed_header_gap"></div>
                )
            }


        </>
    )

}