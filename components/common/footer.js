import React, {useContext} from "react";
import { Cascader, Select, Badge, Tooltip, Menu,Dropdown, Button, Space, Typography } from 'antd';
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import {Logo} from "../config/constant";
import Link from "next/link";
import ActivityContext from "../config/context";
import {GlobeOutline, HeadsetOutline, MailOutline, PhonePortraitOutline} from "react-ionicons";
const {Option} = Select;


export default function footer()
{
    const context = useContext(ActivityContext);


    return(
       <footer>

           <section className="bg-primary_transparent">
               <div className="container">
                   <div className="row padding_30-top padding_20-bottom ">
                       <div className="col-md-3">
                           <Logo color="color" size="large"/>
                           <p className="font-xs mt-4 font-gray">
                               We make renting and purchasing of properties simple, enjoyable, and safe. Bringing your the most exclusive properties across Africa.</p>

                       </div>
                       <div className="col-md-2 ms-auto">
                           <h6 className="text-primary monument_regular font-weight-600">Quick Links</h6>
                           <ul className="list-unstyled mt-lg-5 mt-3 mb-4 links">
                               <li>
                                   <Link href="/">
                                   <a>Home</a>
                               </Link>
                               </li>
                               <li>
                                   <Link href="/company">
                                   <a href="#">Company Information</a>
                                   </Link>
                                   </li>
                               <li>
                                   <Link href="/rent">
                                       <a href="#">Listings For Rent</a>
                                   </Link>
                               </li>
                               <li>
                                   <Link href="/sale">
                                       <a href="#">Listings For Sale</a>
                                   </Link>
                               </li>
                           </ul>
                       </div>
                       <div className="col-md-2 ms-auto">
                           <h6 className="text-primary monument_regular font-weight-600">Our Locations </h6>
                           <ul className="list-unstyled mt-lg-5 mt-3 mb-4 links">
                               {
                                   context.locations.map((country) => (
                                       <li>
                                           <Link href={{
                                               pathname: '/rent',
                                               query: { country: country.name },
                                           }}>
                                               <a>{country.name}</a>
                                           </Link>
                                       </li>
                                   ))
                               }

                           </ul>
                       </div>
                       <div className="col-md-2 ms-auto">
                           <h6 className="text-primary monument_regular font-weight-600">Talk to Us</h6>
                           <ul className="list-unstyled mt-lg-5 mt-3 mb-4 links">
                               <li><a href="#">J25B, Road 3, VGC, Lagos</a></li>
                               <li><a href="#"><PhonePortraitOutline /> +234 813 5244 971</a></li>
                               <li><a href="#"><MailOutline /> +234 803 633 9183</a></li>
                               <li><a href="#"><GlobeOutline /> support@avamot.com</a></li>
                           </ul>
                       </div>
                   </div>

               </div>

               <div className="border_top bg-background">

               <div className="py-3">
                   <div className="text-center font-white">
                       <span>Copyright &copy; 2021 Avamot. All rights reserved.</span>
                   </div>

               </div>
               </div>

           </section>
       </footer>
    )

}