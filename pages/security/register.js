import React, {useState, useContext} from "react";
import {Logo} from "../../components/config/constant";
import {toast} from "react-hot-toast";
import {Radio} from "antd";
import ls from "local-storage";
import * as Api from "../../components/config/api";
import activityContext from "../../components/config/context";
import axios from "axios";
import NumberFormat from "react-number-format";
import {ChevronForwardOutline} from "react-ionicons";


export default function Register(props) {
    const context = useContext(activityContext);
    const [display, setDisplay] = useState(0);
    const [registeredUser, setRegisteredUser] = useState({});
    const [myLocation, setMyLocation] = useState('');
    const [myCurrency, setMyCurrency] = useState('');
    const [user, setUser] = useState({
        gender : 'male'
    });

    const handleChange = (e) => {

        if(e.target.name !== 'terms') {
            setUser({...user, [e.target.name]: e.target.value});
        }else{
            setUser({...user, [e.target.name]: e.target.checked});
        }
    }

    function onGenderChange(e) {
        setUser({...user , ['gender'] : e.target.value });
    }

    const register = async (e) => {
        toast('Processing. Please wait', {icon: '⌛'})

        if(user.terms === true) {

            e.preventDefault();


            let data = new FormData();
            data.append('password', user.password);
            data.append('fullname', user.first_name + ' ' + user.last_name);
            data.append('email', user.email);
            data.append('dob', user.dob);
            data.append('gender', user.gender);


            let response = axios({
                method: 'POST',
                url: Api.register,
                data: data
            }).then((response) => {

                if (response.data.status === 'success') {

                    setRegisteredUser(response.data.data);
                    setDisplay(1);

                    toast.success(response.data.message);
                    //   window.top.location.href = '/dashboard/';

                } else {
                    toast.error(response.data.message);
                }
            }).catch((e) => {
                console.log('error login user', e);
            })

        }else{
            toast.error('You must agree to our terms of service to create an account')
        }
    }

    const changeLocation = async () => {

        if(myLocation !== '') {

            toast('Setting your location.', {icon: '⌛'})

            let data = new FormData();
            data.append("location", myLocation);


            axios({
                method: 'POST',
                url: Api.setLocation,
                data: data,
                headers: {
                    'Authorization': 'Bearer ' + registeredUser.web_token
                }
            }).then((response) => {

                if (response.data.status === 'success') {

                    setDisplay(2);
                    toast.success(response.data.message);


                } else {
                    toast.error(response.data.message);
                }
            }).catch((e) => {
                console.log('error login user', e);
            })

        }else{
            toast.error('You must select a location')
        }
    }

    const changeCurrency = async () => {

        if(myCurrency !== '') {

            toast('Setting your currency', {icon: '⌛'})

            let data = new FormData();
            data.append("currency", myCurrency);


            axios({
                method: 'POST',
                url: Api.setCurrency,
                data: data,
                headers: {
                    'Authorization': 'Bearer ' + registeredUser.web_token
                }
            }).then((response) => {

                if (response.data.status === 'success') {

                    setDisplay(3);
                    toast.success(response.data.message);


                } else {
                    toast.error(response.data.message);
                }
            }).catch((e) => {
                console.log('error login user', e);
            })

        }else{
            toast.error('You must select a currency')
        }
    }

    return(
        <section className="d-flex h-100 align-items-center">
            <div className="animated fadeInRight w-100">
            <Logo size="large" color="color" />

                {
                    display === 0 ?(
                        <div>
                            <h1 className="font-lg-2 margin_20-top lh-sm mb-0  heading">
                                Create an account
                            </h1>
                            <p className="font-gray mb-5">Your gateway to the perfect home</p>

                            <form onSubmit={register}>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input type="text" onChange={handleChange} value={user.first_name} name="first_name" required className="form-control" placeholder="username"/>
                                            <label>First name</label>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input type="text" onChange={handleChange} value={user.last_name} name="last_name" required className="form-control" placeholder="username"/>
                                            <label>Last name</label>
                                        </div>
                                    </div>

                                </div>

                                <div className="form-floating mb-3">
                                    <input type="email" onChange={handleChange} value={user.email} name="email" required className="form-control" placeholder="username"/>
                                    <label>Email</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input type="password" onChange={handleChange} value={user.password} name="password" required className="form-control" placeholder="password"/>
                                    <label>Password</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <NumberFormat format="####-##-##" className="form-control" placeholder="dob" name="dob" required onChange={handleChange} />
                                    <label>Date of birth (Year - Month - Day)</label>
                                </div>

                                <p className=" text-primary text-uppercase font-xs">Gender</p>
                                <Radio.Group
                                    size="large"
                                    options={[
                                        { label: 'Male', value: 'male' },
                                        { label: 'Female', value: 'female' },
                                        { label: 'Other', value: 'other'},
                                    ]}
                                    value={user.gender}
                                    onChange={onGenderChange}
                                    optionType="button"
                                    buttonStyle="solid"
                                />

                                <div className="mt-3">
                                    <input type="checkbox" required name="terms" className="me-2" onChange={handleChange} />
                                    I agree to Avamot's terms of service and privacy policy
                                </div>

                                <button className="btn btn-primary mt-4 w-100">Create account</button>
                            </form>

                            <div className="text-center mt-3">
                                <a href="#" onClick={() => props.displayRegister(0)}>Have an account? Sign In</a>

                            </div>
                        </div>
                    ): display === 1 ? (
                        <div>
                            <h1 className="font-lg-2 margin_20-top lh-sm mb-0  heading">
                                Choose a location
                            </h1>
                            <p className="font-gray mb-5">We will show you rentals and properties for sale in this location.
                                You can change this anytime you want</p>

                            <div>
                                {
                                    context.locations.map((location) => (
                                        <div onClick={() => setMyLocation(location.selector)} className={myLocation === location.selector ? "p-3 border-bottom cursor-pointer bg-secondary" : "p-3 border-bottom cursor-pointer hover_primary_transparent"}>
                                            {location.name}
                                        </div>
                                    ))
                                }

                                <button onClick={() => changeLocation()} className="btn btn-primary mt-5 w-100">Next <ChevronForwardOutline color="#fff" /></button>
                            </div>
                        </div>
                    ): display === 2 ? (
                        <div>
                            <h1 className="font-lg-2 margin_20-top lh-sm mb-0  heading">
                                Choose a currency
                            </h1>
                            <p className="font-gray mb-5">We will show you prices and rates only in this currency.
                                You can change this anytime you want</p>

                            <div>
                                {
                                    context.currencies.map((currency) => (
                                        <div onClick={() => setMyCurrency(currency.name)} className={myCurrency === currency.name ? "p-3 border-bottom cursor-pointer bg-secondary" : "p-3 border-bottom cursor-pointer hover_primary_transparent"}>
                                            {currency.name} ({currency.symbol})
                                        </div>
                                    ))
                                }

                                <button onClick={() => changeCurrency()} className="btn btn-primary mt-5 w-100">Next <ChevronForwardOutline color="#fff" /></button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h1 className="font-lg-2 margin_20-top lh-sm mb-0 text-primary heading">
                                Welcome To Avamot
                            </h1>
                            <p className="lead mt-5 mb-3">Hi {registeredUser.first_name},</p>
                            <p className="font-gray mb-3">Thank you for choosing Avamot. We have a large portfolio of listings
                                ranging from residential homes, corporate houses & condominiums. We also assit in managing your listings and portfolios for you.
                                </p>

                            <button onClick={() => props.displayRegister(0)} className="btn btn-primary mt-5 w-100">Continue to login <ChevronForwardOutline color="#fff" /></button>
                        </div>
                            )
                }


            </div>
        </section>
    )

}