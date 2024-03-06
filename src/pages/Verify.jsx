import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OtpInput from 'react-otp-input'
import Loader from '../components/common/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Verify() {
    const [otp, setOtp] = useState('');

    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);

    const name = localStorage.getItem("first") + ' ' + localStorage.getItem("last");
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader(true);

        try {
            var myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");

            var formdata = new FormData();
            formdata.append("name", String(name));
            formdata.append("email", String(email));
            formdata.append("phone_num", "0000000000");
            formdata.append("password", String(password));
            formdata.append("password_confirmation", String(password));
            formdata.append("token", otp);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(`${process.env.REACT_APP_API_URL}verify_otp`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if(result.status === "Success"){
                        setLoader(false);
                        navigate('/');
                    }
                    else{
                        if(result.status === 401){
                            toast("Invalid OTP");
                        }else{
                            toast(result.errors.email);
                        }
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
                            <div className='col-md-6 d-flex flex-column bg-pink rounded-5 p-5 order-md-0 order-1'>
                                <div className="my-auto mx-auto p-5">
                                    <p className="mb-1 fs-2 text-white text-center fw-semibold">Email Verification</p>
                                    <div className='my-4 d-flex justify-content-center '>
                                        <OtpInput
                                            value={otp}
                                            onChange={setOtp}
                                            numInputs={4}
                                            inputStyle={{ 'width': '50px', 'height': '50px', 'borderRadius': '10px' }}
                                            renderSeparator={<span>&nbsp;&nbsp;</span>}
                                            placeholder="____"
                                            renderInput={(props) => <input {...props} />}
                                        />
                                    </div>
                                    <div className="d-grid gap-2">
                                        <button onClick={handleSubmit} className={`${otp.length === 4 ? '' : 'disabled'} btn btn-light py-3 mt-3`} type="button">
                                            {loader === false ? 'Verify' : <Loader />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6 p-5 order-md-1 order-0'>
                                <img className='img img-responsive' src='/assets/images/illustrations/otp.png' width="100%" alt="verify" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </section>
    )
}

export default Verify
