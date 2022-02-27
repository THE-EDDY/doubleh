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


    const login = async (e, social = null, proceed = 'false') => {
        toast('Processing. Please wait', {icon: '⌛'})

        if(social === null) {
            e.preventDefault();
        }

        let data = new FormData();
        data.append('email', social ? social : user.email);
        data.append('password', user.password);
        data.append('proceed', proceed);


        let response = axios({
            method: 'POST',
            url: Api.login,
            data: data
        }).then((response) => {

            if (response.data.status === 'success') {
                //console.log(response.data.data.currency);

                toast.success('Login successful');
                let d_user = response.data.data;
                ls.set('4vam07', response.data.data.web_token);
                ls.set('curr', response.data.data.currency);
                context.defineUser(d_user);

                props.hideCanvas();

                 //   window.top.location.href = '/dashboard/';

            }else{
                toast.error(response.data.message);
            }
        }).catch((e) => {
            console.log('error login user', e);
        })
    }

    const resetPassword = async (e) => {
        toast('Processing. Please wait', {icon: '⌛'})

        e.preventDefault();

        let data = new FormData();
        data.append('email', resetUser);


        axios({
            method: 'POST',
            url: Api.forgotPassword,
            data: data
        }).then((response) => {

            if (response.data.status === 'success') {

                toast.success(response.data.message, {
                    duration: 6000,
                });

                setResetUser('');

                props.hideCanvas();

                //   window.top.location.href = '/dashboard/';

            }else{
                toast.error(response.data.message);
            }
        }).catch((e) => {
            console.log('error login user', e);
        })
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
                                Avamot account
                            </h1>
                            <p className="font-gray mb-5">Your gateway to the perfect home</p>

                            <form onSubmit={login}>
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
                            <p className="font-gray mb-5">Regain access to your Avamot account</p>

                            <form onSubmit={resetPassword}>
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