import '../cdn/b5/css/bootstrap.css';
import '../cdn/css/look_css/css/look_base_v2.css';
import '../public/fontawesome-free-5.15.3-web/css/all.css';
import "../cdn/css/animate.min.css";
import 'react-image-lightbox/style.css';
import '../cdn/css/Style.css';
import '../cdn/css/App.css';
import React, {useState, createContext, useEffect} from "react";
import ls from "local-storage";
import Router from "next/router";
import {useRouter} from "next/router";
import { notification } from 'antd';
import NProgress from "nprogress";
import Swal from "sweetalert2";
import {LoadingOutlined} from '@ant-design/icons';
import ActivityContext from "../components/config/context";
import * as Api from "../components/config/api";
import axios from "axios";
import {Toaster} from "react-hot-toast";


Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


function App({ Component, pageProps }) {
    const axios = require('axios');
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});
    const [states, setStates] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [locations, setLocations] = useState([]);
    const [currentLocation, setCurrentLocation] = useState(ls.get('loc'));
    const [currentCurrency, setCurrentCurrency] = useState(ls.get('curr'));
    const [listingDetails, setListingDetails] = useState([]);
    const [notifications, setNotifications] = useState([]);

    async function refreshUser(){
        let token = ls.get('4vam07');

        if(token) {

            const response = await axios({
                method: 'GET',
                url: Api.getUser,
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            }).catch((e) => {
                setLoading(false);
            })

            if(response.status === 200 || response.status === 201) {
                if (response.data.status === 'success') {
                    console.log(response.data.data);
                    setUser(response.data.data)
                    setNotifications(response.data.notifications)

                    setCurrentCurrency(response.data.data.currency);
                    ls.set('curr', response.data.data.currency);
                    ls.set('loc', response.data.data.location);
                    setLoading(false);
                }else{
                   // console.log(response.data.message);
                    if(response.data.message === 'User does not exist')
                    {
                        logout();
                    }
                }
            }else{
                alert('Authentication failed');
                setLoading(false);
            }
        }
    }

    function defineUser(user){
        setUser(user);
        setCurrentLocation(user.location);
        setCurrentCurrency(user.currency);
    }

    function logout(){
        ls.remove('4vam07');
        window.location.href = "/";
    }

    function checkLocation()
    {
        let loc = ls.get('loc');

        if(!loc)
        {
            ls.set('loc', {name: "Nigeria", photo: "https://res.cloudinary.com/avamot/image/upload/v1633649772/nigeria_copy_zrlpb2.jpg", selector: "kf-23f-2k3f-23"});
        }
    }

    async function getStates(){
        const response = await axios({
            method: 'GET',
            url : Api.getLocationsCurrencies,
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json',
            },

        });

        if(response.data.status === 'success') {
            //console.log(response.data.data.states)
            setStates(response.data.data.states)
            setLocations(response.data.data.locations)
            setCurrencies(response.data.data.currencies)


            if(ls.get('tk') === null)
            {
                response.data.data.locations.forEach((location) => {
                    let loc = ls.get('loc');

                    if(!loc) {
                        if (location.name === 'Nigeria') {
                            //console.log(location);
                            setCurrentLocation(location);
                        }
                    }
                })

                response.data.data.currencies.forEach((curr) => {
                    let loc_curr = ls.get('curr');

                    if(!loc_curr) {
                        if (curr.name === 'Naira') {
                            setCurrentCurrency(curr);
                            ls.set('curr', curr);
                        }
                    }
                })
            }
            //ls.set('states',response.data.data);
        }else{
            alert(response.data.message)
        }
    }

    async function getListingDetails(){
        const response = await axios({
            method: 'GET',
            url : Api.listingDetails,
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json',
            },

        });

        if(response.data.status === 'success') {
            setListingDetails(response.data.data)

        }else{
            alert(response.data.message)
        }
    }


    useEffect(() => {
        refreshUser();
        checkLocation();
        getListingDetails();
        getStates();

    }, []);

        return (
            <ActivityContext.Provider value={{states, user, defineUser,refreshUser, logout, notifications, listingDetails, currentLocation, currentCurrency, locations, currencies}}>
                <Component {...pageProps} />

                <Toaster
                    duration={5000}
                    position="top-center"
                    reverseOrder={false}
                    containerStyle={{zIndex: 99999999999}}
                />
            </ActivityContext.Provider>
        )

}

export default App