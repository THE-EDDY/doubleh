import React, {useState, useContext} from "react";
import {Logo} from "../../components/config/constant";
import {toast} from "react-hot-toast";
import ls from "local-storage";
import * as Api from "../../components/config/api";
import activityContext from "../../components/config/context";
import axios from "axios";


export default function Login(props) {
    const context = useContext(activityContext);
    const [user, setUser] = useState([]);
    const [resetUser, setResetUser] = useState('');
    const [display, setDisplay] = useState(0)

    const handleChange = (e) => {
        setUser({...user , [e.target.name] : e.target.value });
    }

    const handleForgotChange = (e) => {
        setResetUser(e.target.value);
    }



    return(
        <section className="d-flex h-75 align-items-center">
            <div className="animated fadeInRight w-100">
            <Logo size="large" color="color" />

                {
                    display === 0 ? (
                        <div>
                            <h1 className="font-lg-2 margin_50-top lh-sm mb-0  heading">
                                Sign in to your <br/>
                                Double H account
                            </h1>
                            <p className="font-gray mb-5">Your gateway to the perfect home</p>

                            <form>
                                <div className="form-floating mb-3">
                                    <input type="email" onChange={handleChange} value={user.email} name="email" required className="form-control" placeholder="username"/>
                                    <label>Email</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" onChange={handleChange} value={user.password} name="password" required className="form-control" placeholder="password"/>
                                    <label>Password</label>
                                </div>

                                <button className="btn btn-primary w-100">Login</button>
                            </form>

                            <div className="d-flex justify-content-between mt-3">
                                <a href="#" onClick={() => props.displayRegister(1)}>Create an account</a>
                                <a href="#" onClick={() => setDisplay(1)}>Forgot Password?</a>
                            </div>
                        </div>
                    ):(
                        <div>
                            <h1 className="font-lg-2 margin_50-top lh-sm mb-0  heading">
                                Forgot your password? <br/>
                            </h1>
                            <p className="font-gray mb-5">Regain access to your Double H account</p>

                            <form >
                                <div className="form-floating mb-3">
                                    <input type="email" onChange={handleForgotChange} value={resetUser} name="email" required className="form-control" placeholder="email"/>
                                    <label>Email</label>
                                </div>

                                <button className="btn btn-primary w-100">Recover Password</button>
                            </form>

                            <div className="text-center mt-3">
                                <a href="#" onClick={() => setDisplay(0)}>Remember your password? Login</a>
                            </div>
                        </div>
                    )
                }


            </div>
        </section>
    )

}