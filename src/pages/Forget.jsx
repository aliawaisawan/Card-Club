import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Forget() {
    const navigate = useNavigate();

    const [loader, setLoader] = useState(false);

    const [credentials, setCredentials] = useState({ email: '', })

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader(true);

        try {
            var myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");

            var formdata = new FormData();
            formdata.append("email", credentials.email);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };
            fetch(`${process.env.REACT_APP_API_URL}password/forgot-password`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.status === 200) {
                        toast(result.message);
                        setLoader(false);
                        localStorage.setItem("email", credentials.email);
                        setCredentials({
                            email: '',
                        });
                        setTimeout(() => {
                            navigate('/otp');
                        }, 2000);
                    }
                    else {
                        toast("Invalid Email")
                        setLoader(false);
                    }
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <section className='full-content d-flex flex-column background'>
            <div className='mx-auto my-auto'>
                <div className='card border-light rounded-5' style={{ "filter": "drop-shadow(0px 3px 49.5px rgba(0,0,0,0.07 ))" }}>
                    <div className='card-body p-0'>
                        <div className='row'>
                            <div className='col-md-12 d-flex flex-column  rounded-5 p-5 order-md-0 order-1'>
                                <div className="my-auto mx-auto p-5">
                                    <h3 className="text-center ">Forget Password?</h3>
                                    <p className="text-center mb-5 ">Please Confirm Your Email Address</p>
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label className="mb-2" for="floatingInputValue">Email</label>
                                                    <input type="email"
                                                        name="email"
                                                        required
                                                        className="form-control form-control-md mb-3"
                                                        id="floatingInputValue"
                                                        value={credentials.email}
                                                        onChange={onChange}
                                                        placeholder="Enter your Email" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <button
                                                    type="submit"
                                                    className="text-white bg-pink w-100  btn btn-bg btn-lg">
                                                    {loader === false ? 'Reset Password' : <Loader />}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
             <ToastContainer />
        </section>
    )
}

export default Forget
