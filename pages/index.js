import Home_layout from "../components/layout/home_layout";
import React, {useContext, Component, useEffect, useState} from "react";
import {Select, Carousel, Typography, Image, Popconfirm, Popover} from 'antd';
import {useRouter} from "next/router";
import activityContext from "../components/config/context";
import ls from "local-storage";
import Link from "next/link";
import NProgress from "nprogress";
import ScrollAnimation from 'react-animate-on-scroll';
import ActivityContext from "../components/config/context";
import * as Icon from 'react-ionicons'
import {
    ArrowForward,
    BusinessOutline,
    ChevronForwardCircleOutline, ChevronForwardOutline,
    HomeOutline,
    StorefrontOutline
} from "react-ionicons";
import Slider from "react-slick";

const axios = require('axios');
const {Title} = Typography;
const {Option} = Select;

export default function Home() {
    const router = useRouter();
    const context = useContext(activityContext);
    const [loading, setLoading] = useState(true);
    const [showOccupants, setShowOccupants] = useState(false);
    const [occupants, setOccupants] = useState({
        adult : 0,
        children : 0,
        infants : 0,
    });

    const carouselSettings = {
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    };

    const increaseOccupants = (item) => {
        if(item === 'adult')
        {
            let there = occupants.adult;
            setOccupants({...occupants, ['adult'] : there + 1 })
        }else if(item === 'children')
        {
            let there = occupants.children;
            setOccupants({...occupants, ['children'] : there + 1 })
        }else if(item === 'infants')
        {
            let there = occupants.infants;
            setOccupants({...occupants, ['infants'] : there + 1 })
        }

    }

    const reduceOccupants = (item) => {
        if(item === 'adult')
        {
            let there = occupants.adult;
            if(there >=1) {
                setOccupants({...occupants, ['adult']: there - 1})
            }
        }else if(item === 'children')
        {
            let there = occupants.children;
            if(there >=1) {
                setOccupants({...occupants, ['children']: there - 1})
            }
        }else if(item === 'infants')
        {
            let there = occupants.infants;
            if(there >=1) {
                setOccupants({...occupants, ['infants']: there - 1})
            }
        }

    }


    const occupantsToggle = () => {

        return(
            <div className="w-200 font-white">

                <div className="d-flex p-2 justify-content-between border-bottom">
                    Adult

                    <div className="d-flex align-items-center">
                        <button onClick={() => reduceOccupants('adult')} className="font-white no_border rounded-circle me-1 bg-dark">-</button>
                        <span>{occupants.adult}</span>
                        <button onClick={() => increaseOccupants('adult')} className="font-white ms-1 no_border rounded-circle bg-dark">+</button>
                    </div>
                </div>
                <div className="d-flex p-2 justify-content-between border-bottom">
                    Children
                    <div className="d-flex align-items-center">
                        <button onClick={() => reduceOccupants('children')} className="font-white no_border rounded-circle me-1 bg-dark">-</button>
                        <span>{occupants.children}</span>
                        <button onClick={() => increaseOccupants('children')} className="font-white ms-1 no_border rounded-circle bg-dark">+</button>
                    </div>
                </div>
                <div className="d-flex p-2 justify-content-between">
                    Infant
                    <div className="d-flex align-items-center">
                        <button onClick={() => reduceOccupants('infants')} className="font-white no_border rounded-circle me-1 bg-dark">-</button>
                        <span>{occupants.infants}</span>
                        <button onClick={() => increaseOccupants('infants')} className="font-white ms-1 no_border rounded-circle bg-dark">+</button>
                    </div>
                </div>
            </div>
        )
    }

    useEffect(() => {

    }, [])


    return (
        <Home_layout title="Home">

            <section className="hero  row g-0">
                {/*<div className="col-lg-5 animated fadeInLeft bg-background d-none d-lg-block"></div>*/}

                <div className="col-lg-12 animated fadeInDown hero_background"
                     style={{background: `url('/images/bg.jpg')`}}>

                </div>
                <div className="content overlay d-flex align-items-center">

                    <div className="container animated fadeInUp">


                        <div className="col-lg-8 mx-auto">
                            <div className=" text-center">
                                <h1 className="font-xl-2 playfair text-capitalize font-white">Experience Luxury <br/> at
                                    the tap of a button</h1>
                                <p className="font-white my-5 font-sm-2">Find a variety of properties that suites what
                                    you are looking for as your home, office or storage.</p>

                                <Link href="/rent">
                                    <a className="btn bg-secondary d-lg-none">Get Started <ChevronForwardOutline/></a>
                                </Link>
                            </div>


                            <div className=" d-none d-lg-block">
                                <div className="bg-gray-3 animated fadeInDownBig rounded-pill p-3 px-4 ">
                                    <div className="row align-items-center">
                                        <div className="col-sm-3">

                                            <div className="fancy_input d-flex">
                                                <i className="fa fa-calendar-alt fa-2x  me-3 font-white"></i>
                                                <input type="text" className="w-100" placeholder="Check in"/>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">

                                            <div className="fancy_input d-flex">
                                                <i className="fa fa-calendar-alt fa-2x  me-3 font-white"></i>
                                                <input type="text" className="w-100" placeholder="Check out"/>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 pe-0">

                                            <Popover
                                                className="occupants_morphism"
                                                content={occupantsToggle}
                                                title={null}
                                                showCancel={false}
                                                trigger="click"
                                                //visible={showOccupants}
                                                placement="bottom"
                                                onCancel={() => setShowOccupants(false)}
                                            >
                                            <div className="fancy_input d-flex" >
                                                <i className="fa fa-plus fa-2x  me-3 font-white"></i>
                                                <input type="text" value={
                                                    occupants.adult === 0 && occupants.children === 0 && occupants.infants === 0 ? (
                                                        ''
                                                    ):(
                                                        occupants.adult+' Adults, '+occupants.children +' Children, '+occupants.infants +' Infants'
                                                    )
                                                } className="cursor-pointer w-100" readOnly onClick={() => setShowOccupants(true)} placeholder="Add Occupant(s)"/>
                                            </div>
                                            </Popover>
                                        </div>


                                        <div className="col-sm-2 text-center px-0 ms-0">
                                            <button className="btn btn-rounded btn-primary btn-lg">
                                                <img src="/images/icons/glass.svg" className="w-100" />
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>


                </div>
            </section>

            <ScrollAnimation delay={5} animateIn="slideInUp">
            <section className="bg-gray-3 padding_10-xs padding_50-top padding_50-bottom  font-white">
                <div className="container">

                    <div className="row align-items-center">

                        <div className="col-lg-6 text-center">
                            <ScrollAnimation delay={500} animateIn="slideInUp">
                            <img src="/images/about.png" />
                            </ScrollAnimation>

                        </div>
                        <div className="col-lg-6 text-end">

                            <h1 className="playfair mt-2 font-xl mb-3 font-white">About Double H</h1>
                            <p className="font-sm-2">
                                The Double H experience is one that lives long in memory. With service that is luxurious and discreet, delivered in a relaxed and comfortable environment. Our smart homes have been carefully created to simplify everyday complexities.
                            </p>

                            <a className="btn btn-sm mt-5 btn-primary">Our Homes <i className="fa fa-caret-right ms-2"></i></a>

                        </div>
                    </div>

                </div>
            </section>
            </ScrollAnimation>

            <ScrollAnimation delay={5} animateIn="slideInUp">
                <section className="bg-gray-2 padding_10-xs  padding_50-bottom font-white" >
                    <div className="container">

                        <div className="row" >

                            <div className="col-lg-7 d-lg-block d-none" >

                                    <img src="/images/signed_up.png" style={{marginTop: -6}} className="img-fluid" />

                                <img src="/images/signed_up2.png" style={{maxWidth: 750, marginTop: 0, bottom:0, position: 'absolute', left: 0,}} className="img-fluid" />

                            </div>
                            <div className="col-lg-5 padding_50-top padding_50-bottom text-end">

                                <h1 className="playfair mt-5 font-100 font-xl mb-4 font-white">Deals? Discounts?</h1>

                                <div className="row align-items-center">
                                    <div className="col-lg-8">
                                <p className="font-sm-2 m-0 text-start">
                                    Scan <span className="font-weight-600">Barcode</span> to download our app. Booking has never been this easy. Download
                                    our mobile application to be the firsst to know when we have exclusive offers.
                                </p>
                                    </div>
                                    <div className="col-lg-4 d-flex justify-content-end">
                                    <div className="bg-white rounded-3 p-2">
                                    <img src="/images/barcode.svg" className="img-fluid" />
                                    </div>
                                    </div>

                                    <div className="col-lg-6 mt-5">
                                        <img src="/images/playstore.svg" className="img-fluid" />
                                    </div>
                                    <div className="col-lg-6 mt-5">
                                        <img src="/images/appstore.svg"  className="img-fluid" />
                                    </div>
                                </div>




                            </div>
                        </div>

                    </div>
                </section>
            </ScrollAnimation>



                <section className="bg-gray-3 padding_10-xs padding_50-top padding_50-bottom  font-white">
                    <div className="container">

                            <div className="col-lg-10 text-center mx-auto">

                                <h1 className="playfair mt-5 font-100 font-xl mb-4 font-white">People like you <img src="/images/heart.png"/> us</h1>




                            </div>

                    </div>
                </section>






        </Home_layout>
    )
}

