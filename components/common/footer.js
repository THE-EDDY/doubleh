import React, {useContext} from "react";
import {Cascader, Select, Badge, Tooltip, Menu, Dropdown, Button, Space, Typography} from 'antd';
import {SearchOutlined, ShoppingCartOutlined} from '@ant-design/icons';
import {Logo} from "../config/constant";
import Link from "next/link";
import {CallOutline, GlobeOutline, HeadsetOutline, MailOutline, PhonePortraitOutline} from "react-ionicons";

const {Option} = Select;


export default function footer() {


    return (
        <footer>

            <section className="footer_gradient">
                <div className="container">
                    <div className="row padding_30-top padding_20-bottom ">
                        <div className="col-md-3">
                            <p className="font-white ">
                                Deals? Discounts? Download Our App
                            </p>

                            <div className="row align-items-center">
                                <div className="col-6">
                                    <img src="/images/app_2.svg" style={{marginLeft: -5}} />
                                </div>
                                <div className="col-6">
                                    <img src="/images/play_2.svg"/>
                                </div>
                            </div>


                        </div>

                        <div className="col-md-3 ms-auto">
                            <h6 className="text-primary monument_regular font-weight-600">Subscribe to our newsletter </h6>
                            <ul className="list-unstyled mt-lg-5 mt-3 mb-4 links">

                                <li>
                                    <div className="row">
                                        <div className="col-8">
                                            <input type="text" className="p-2 px-3 no_border_radius bg-gray-3 font-white no_border form-control" placeholder="Enter email address" style={{ height:52 }}/>
                                        </div>
                                        <div className="col-4">
                                            <button className="btn  btn-primary btn-lg">
                                                Subscribe
                                            </button>
                                        </div>
                                    </div>
                                </li>

                            </ul>
                        </div>
                        <div className="col-md-2 ms-auto">
                            <h6 className="text-primary monument_regular font-weight-600">Company</h6>
                            <ul className="list-unstyled mt-lg-5 mt-3 mb-4 links">
                                <li>
                                    <Link href="/">
                                        <a>Contact Us</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/company">
                                        <a href="#">List Your Home</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/rent">
                                        <a href="#">Our Mission & Vision</a>
                                    </Link>
                                </li>

                            </ul>
                        </div>
                        <div className="col-md-2 ms-auto">
                            <h6 className="text-primary monument_regular font-weight-600">Payment Methods</h6>
                            <ul className="list-unstyled mt-lg-5 mt-3 mb-4 links">
                                <li className="">
                                    <img src="/images/mastercard.png" className="me-3"/>
                                    <img src="/images/visa.png" className="me-3"/>
                                    <img src="/images/verve.png" className="grayscale"/>
                                </li>
                                <li className="d-flex align-items-center  ">
                                    <CallOutline color="#fff"/>
                                    <div className="ms-2">+234  909 093 8394</div>
                                </li>
                                <li className="d-flex align-items-center  justify-content-between">
                                    <i className="fa fa-map-marker-alt font-sm-2 font-white me-3"></i>
                                    <div>2 Swiss Trade Drive, Ikota,
                                        Lekki, Lagos</div>
                                </li>

                            </ul>
                        </div>
                    </div>

                    <div className="">

                        <div className="pb-4 d-flex justify-content-between align-items-center">

                            <Logo copyright={true} />

                            <div className="col-lg-5 font-white  ">
                                <div className="row align-items-center">
                                <div className="col-lg-8 text-end">
                                <h6 className="font-white mb-0">Find us on social media</h6>
                                </div>

                                <div className="col-lg-4 d-flex justify-content-between">
                                <img src="/images/insta.svg" className="me-4" />
                                <img src="/images/twi.svg"  className="me-4" />
                                <img src="/images/linkedin.svg" />
                                </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>



            </section>
        </footer>
    )

}