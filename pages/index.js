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
                                <div className="bg-gray-3 animated fadeInDownBig rounded-pill p-4 px-5 ">
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

                    <div className="row">

                        <div className="col-lg-7 text-end">
                        </div>
                        <div className="col-lg-5 text-end">

                            <h1 className="playfair font-xl mb-3 font-white">About Double H</h1>
                            <p>
                                The Double H experience is one that lives long in memory. With service that is luxurious and discreet, delivered in a relaxed and comfortable environment. Our smart homes have been carefully created to simplify everyday complexities.
                            </p>

                            <a className="btn btn-sm btn-primary">Our Homes <i className="fa fa-caret-right ms-2"></i></a>

                        </div>
                    </div>

                </div>
            </section>
            </ScrollAnimation>




            <section className="padding_10-xs padding_50-top padding_50-bottom ">

                <div className="container p-0 d-flex align-items-top animated fadeInLeft">

                    <div className="clearfix animated d-flex flex-column fadeInDownBig">
                        <div className="vr primary ms-1" style={{height: 100}}></div>
                        <p className="vr_heading text-primary">About Us</p>
                    </div>

                    <div className="row w-100">
                        <div className="col-lg-4 mb-3">
                            <h1 className="font-lg-3 lh-sm mb-0 mobile_heading text-capitalize heading">
                                Our mission is to
                                redefine the real estate experience for everyone
                            </h1>
                        </div>

                        <div className="col-lg-6 font-sm">
                            <p>
                                Avamot is one of the world's leading property agents. Our experience spans the globe.
                            </p>
                            <p className="m-0">
                                We have been advising on buying, selling and renting property for over 160 years, from
                                country cottages to city centre offices, agricultural land to new-build developments.
                            </p>

                        </div>

                        <div className="col-lg-2 mt-3">
                            <Link href="/company">
                                <a className="btn btn-sm btn-primary">Read More</a>
                            </Link>
                        </div>


                    </div>
                </div>

            </section>

            <section className="padding_50-top padding_10-xs padding_50-bottom"
                     style={{background: `url('https://res.cloudinary.com/avamot/image/upload/v1641688700/swirl_trv859.jpg')`}}>

                <div className="container text-center">

                    <div className="col-lg-6 mx-auto">
                        <h1 className="font-lg-3 lh-sm text-center text-capitalize heading mobile_heading">The most
                            exclusive homes in
                            {
                                context.locations.slice(0, -1).map((country, index) => (
                                    <span className="font-lg-3 mobile_heading"> {country.name}
                                        {
                                            (index + 1) < (context.locations.length - 1) ? (',') : null
                                        }</span>
                                ))
                            }
                            {
                                context.locations.slice(-1).map((country, index) => (
                                    <span className="font-lg-3 mobile_heading"> and {country.name}</span>
                                ))
                            }</h1>

                        {/*<p>We have put together an extensive portfolio of properties in choice locations across various countries and states.</p>*/}

                    </div>


                    <div className="row mt-5 ">
                        {
                            context.locations.map((location) => {
                                let divStyle = {
                                    backgroundImage: 'url(' + location.photo + ')',
                                };

                                return (
                                    <Link href={{
                                        pathname: '/rent',
                                        query: {country: location.name},
                                    }}>
                                        <div className="col-6 mb-3 col-lg">
                                            <div className="country_display" style={divStyle}>
                                                <div className="overlay d-flex align-items-end">
                                                    <div className="text-center w-100">
                                                        <p className="m-0">Properties in </p>
                                                        <h2 className="font-white">{location.name}</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }


                    </div>


                </div>

            </section>


            <section className="padding_50-top padding_10-xs font-white padding_50-bottom bg-background">

                <div className="container">
                    <div className="row">

                        <div className="col-lg-6">

                            <h1 className="font-white lh-sm font-lg-3 d-none d-lg-block">Find your new home</h1>

                            <div className="d-flex align-items-top">


                                <div className="text-center animated fadeInDownBig">
                                    <div className="vr ms-1 primary" style={{height: 200}}></div>
                                    <p className="vr_heading text-primary">Search</p>
                                </div>

                                <div>
                                    <h1 className="font-white lh-sm font-lg-3 mobile_heading d-lg-none">Find your new
                                        home</h1>

                                    <p className="font-sm mb-4">Our listings cover properties of every type.
                                        Search for the best living spaces suitable for individuals or families.
                                        Office complexes, rental spaces and studio buildings
                                        appropriate for work. Serviced apartments, luxurious condominiums living for
                                        rent or sale </p>

                                    <div className="row">
                                        <div className="col-lg-4 col-6">
                                            <div className="card">
                                                <div className="card-body bg-primary_transparent text-center">
                                                    <HomeOutline height="60px" width="60px" color="#0c8665"/>
                                                </div>
                                                <div className="card-footer font-black text-truncate text-center">
                                                    Residential Living
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-4 col-6">
                                            <div className="card">
                                                <div className="card-body bg-primary_transparent text-center">
                                                    <StorefrontOutline height="60px" width="60px" color="#0c8665"/>
                                                </div>
                                                <div className="card-footer font-black text-truncate text-center">
                                                    Studio & Offices
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-4 d-none d-lg-block">
                                            <div className="card">
                                                <div className="card-body bg-primary_transparent text-center">
                                                    <BusinessOutline height="60px" width="60px" color="#0c8665"/>
                                                </div>
                                                <div className="card-footer font-black text-truncate text-center">
                                                    Apartments & Condos
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>

                            </div>


                        </div>
                        <div className="col-lg-6 px-5 d-none d-lg-block">
                            <ScrollAnimation delay={5} animateIn="slideInUp">
                                <img
                                    src="https://res.cloudinary.com/avamot/image/upload/c_fill,h_700,w_1000/v1638016608/ioj9f7jj9dvamwefmlr0.jpg"
                                    className="img-fluid position-relative img_move_up"/>
                            </ScrollAnimation>
                            <div
                                className="bg-primary d-flex justify-content-between align-items-center font-weight-600 text-uppercase font-white py-2 px-3 font-sm-2">
                                Over 1,000 Available Properties
                                <button className="btn btn-sm btn-light">Search <i
                                    className="fa fa-chevron-down ms-2"></i></button>
                            </div>
                        </div>

                    </div>
                </div>

            </section>


            <section className="padding_50-top padding_10-xs padding_50-bottom">

                <div className="container">

                    <a href='' className="float-end btn btn-primary btn-sm">See all <i
                        className="fa fa-chevron-right ms-2"></i></a>
                    <h1 className="font-lg-3 mb-5 mobile_heading text-capitalize">Featured Properties</h1>

                    <div className="p-0 d-flex align-items-center">

                        <div className="clearfix d-none d-lg-block animated d-flex flex-column fadeInDownBig">
                            <div className="vr primary ms-1" style={{minHeight: 200}}></div>
                            <p className="vr_heading text-primary">Featured</p>
                        </div>


                        <div className=" w-100">





                        </div>

                    </div>


                </div>

            </section>


            <section className="bg-white border_top padding_10-xs padding_50-top padding_50-bottom">
                <div className="container">

                    <div className="row ">
                        <div className="col-lg-6 d-none d-lg-block">
                            <div className="featured_vertical_image">
                                <ScrollAnimation delay={5} animateIn="slideInUp">
                                    <img
                                        src="https://res.cloudinary.com/avamot/image/upload/v1633066463/rect_ji3ijn.png"
                                        className="featured_bg"/>
                                    <img
                                        src="https://res.cloudinary.com/avamot/image/upload/c_scale,w_572/v1633080842/app_preview_edxsow.jpg"
                                        className="featured_image"/>
                                </ScrollAnimation>

                                <ScrollAnimation delay={5} animateIn="slideInDown" className="bottom">
                                    <svg className="dot" width="33" height="108"
                                         viewBox="0 0 35 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="5" cy="5" r="5" fill="#0c8665" fill-opacity="0.88"></circle>
                                        <circle cx="5" cy="30" r="5" fill="#0c8665" fill-opacity="0.88"></circle>
                                        <circle cx="5" cy="55" r="5" fill="#0c8665" fill-opacity="0.88"></circle>
                                        <circle cx="5" cy="80" r="5" fill="#0c8665" fill-opacity="0.88"></circle>
                                        <circle cx="5" cy="105" r="5" fill="#0c8665" fill-opacity="0.88"></circle>
                                        <circle cx="30" cy="5" r="5" fill="#0c8665" fill-opacity="0.88"></circle>
                                        <circle cx="30" cy="30" r="5" fill="#0c8665" fill-opacity="0.88"></circle>
                                        <circle cx="30" cy="55" r="5" fill="#0c8665" fill-opacity="0.88"></circle>
                                        <circle cx="30" cy="80" r="5" fill="#0c8665" fill-opacity="0.88"></circle>
                                        <circle cx="30" cy="105" r="5" fill="#0c8665" fill-opacity="0.88"></circle>
                                    </svg>
                                </ScrollAnimation>


                            </div>
                        </div>

                        <div className="col-lg-6 d-flex align-items-center">
                            <div>
                                <p className="m-0 font-xs text-primary text-uppercase font-weight-500">Mobile</p>
                                <h1 className="lh-sm font-lg-3 heading mobile_heading">Rent or buy properties on the
                                    go!</h1>

                                <hr className="fancy mt-3"/>

                                <p className="font-sm mb-4">Our mobile app gives you the best experience to view and
                                    interact with
                                    listings, mobile payment, contactless viewing and 24/7 support wherever you are.</p>

                                <div className="mt-2">
                                    <p className="mb-3 font-xs m-0 font-weight-500 text-uppercase">Available soon
                                        on:</p>
                                    <div className="row">
                                        <div className="col">
                                            <img
                                                src="https://res.cloudinary.com/avamot/image/upload/v1633081172/app_store_f7q76p.png"
                                                alt="Image"
                                                className="w-100 w-max-200"/>
                                        </div>
                                        <div className="col">
                                            <img
                                                src="https://res.cloudinary.com/avamot/image/upload/v1633081272/googleplay_o9goxp.png"
                                                alt="Image" className="w-100 w-max-200"/>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>


                    </div>
                </div>

            </section>


        </Home_layout>
    )
}

