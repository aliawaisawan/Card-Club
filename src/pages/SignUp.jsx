import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Signup() {

    const navigate = useNavigate();

    const [loader, setLoader] = useState(false);

    const [credentials, setCredentials] = useState({
        first: '',
        last: '',
        email: '',
        password: '',
        confirm_password: ''
    })

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader(true);

        if(credentials.password.length <6){
            toast("Password Length must be greater than 6");
            setLoader(false);
            return
        }

        try {
            if (credentials.password.length === credentials.confirm_password.length && String(credentials.password) === String(credentials.confirm_password)) {
                var myHeaders = new Headers();
                myHeaders.append("Accept", "application/ecmascript");

                var formdata = new FormData();
                formdata.append("email", credentials.email);

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: formdata,
                    redirect: 'follow'
                };

                fetch(`${process.env.REACT_APP_API_URL}auth/register`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        if (result.status === 200) {
                            toast(result.message);
                            setLoader(false);
                            localStorage.setItem("first", credentials.first);
                            localStorage.setItem("last", credentials.last);
                            localStorage.setItem("email", credentials.email);
                            localStorage.setItem("password", credentials.password);
                            localStorage.setItem("confirm_password", credentials.confirm_password);
                            setCredentials({
                                first: '',
                                last: '',
                                email: '',
                                password: '',
                                confirm_password: ''
                            });
                            setTimeout(() => {
                                navigate('/verify');
                            }, 2000);
                        }
                        else {
                            toast("Internal Server Error")
                            setLoader(false);
                        }
                    })
                    .catch(error => console.log('error', error));
            } else {
                toast("Password not Matched");
                setLoader(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="full-content">
            <div className="row full-content w-100 m-0 p-0">
                <div style={{ backgroundColor: "#f4f5f7" }} className="col-md-6 p-xl-5">
                    <div className="px-5 ">
                        <img className="w-100" src="assets/images/illustrations/login.png" alt="Character holding cards" />
                        <h2>Hi, Nice to Meet You!</h2>
                        <p className="w-75">Let's create an account for you. If you already have an account then please Sign In.</p>
                    </div>
                </div>
                <div className="col-md-6 d-flex flex-column mt-md-0 mt-5 ">
                    <div className="my-auto mx-auto">
                        <h2>Sign Up</h2>
                        <form className="d-flex flex-column my-2" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="icon-box">
                                        <input
                                            className="my-2 p-2 login-input w-100"
                                            name="first"
                                            required
                                            value={credentials.first}
                                            onChange={onChange}
                                            type="text"
                                            placeholder="First Name" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="icon-box">
                                        <input
                                            className="my-2 p-2 login-input w-100"
                                            name="last"
                                            required
                                            value={credentials.last}
                                            onChange={onChange}
                                            type="text"
                                            placeholder="Last Name" />
                                    </div>
                                </div>
                            </div>
                            <div className="icon-box">
                                <input
                                    className="my-2 p-2 login-input w-100"
                                    name="email"
                                    required
                                    value={credentials.email}
                                    onChange={onChange}
                                    type="email"
                                    placeholder="Email" />
                            </div>
                            <div className="icon-box">
                                <input
                                    className="p-2 my-2 login-input w-100"
                                    name="password"
                                    required
                                    value={credentials.password}
                                    onChange={onChange}
                                    type="password"
                                    placeholder="Password" />
                            </div>
                            <div className="icon-box">
                                <input
                                    className="p-2 my-2 login-input w-100"
                                    name="confirm_password"
                                    required
                                    value={credentials.confirm_password}
                                    onChange={onChange}
                                    type="password"
                                    placeholder="Confirm Password" />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-lg login-btn"
                            >
                                {loader === false ? 'Create account' : <Loader />}
                            </button>
                        </form>
                        <p className="text-center my-3">Already Have an account? <Link style={{ textDecoration: "none" }} to='/' className="text-black fw-bold">Login</Link></p>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
