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

    return(
        <section className="d-flex h-100 align-items-center">
            <div className="animated fadeInRight w-100">
            <Logo size="large" color="color" />

                        <div>
                            <h1 className="font-lg-2 margin_20-top lh-sm mb-0  heading">
                                Create an account
                            </h1>
                            <p className="font-gray mb-5">Your gateway to the perfect home</p>

                            <form>
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
                                    I agree to Double H's terms of service and privacy policy
                                </div>

                                <button className="btn btn-primary mt-4 w-100">Create account</button>
                            </form>

                            <div className="text-center mt-3">
                                <a href="#" onClick={() => props.displayRegister(0)}>Have an account? Sign In</a>

                            </div>
                        </div>




            </div>
        </section>
    )

}