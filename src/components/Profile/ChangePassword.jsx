import React, { useState } from 'react'
import Loader from "../common/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ChangePassword() {
    const [loader, setLoader] = useState(false);
    const [credentials, setCredentials] = useState({
        old_password: '',
        password: '',
        password_confirmation: ''
    })
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader(true);

        try {
            var myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

            var formdata = new FormData();
            formdata.append("old_password", credentials.old_password);
            formdata.append("password", credentials.password);
            formdata.append("password_confirmation", credentials.password_confirmation);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(`${process.env.REACT_APP_API_URL}user/password/change`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.status === 200) {
                        toast(result.message);
                        setLoader(false);
                        setCredentials({
                            old_password: '',
                            password: '',
                            password_confirmation: ''
                        });
                    } else {
                        if (credentials.password.length < 6) {
                            toast("The password must be at least 6 characters")
                        }
                        else if (credentials.password !== credentials.password_confirmation) {
                            toast("Password not matched")
                        }
                        else{
                            toast("Invalid Old Password")
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
        <div>
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-4 p-3 mt-3'>
                        <h5 className='fw-bold'>Change Password</h5>
                        <p>Change Your Password</p>
                    </div>
                    <div className='col-md-8 mt-3'>
                        <form onSubmit={handleSubmit}>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <div class="mb-2">
                                        <label for="exampleFormControlInput1" class="form-label fw-semibold">Old Password</label>
                                        <input
                                            type="password"
                                            class="form-control p-2"
                                            name='old_password'
                                            value={credentials.old_password}
                                            onChange={onChange}
                                            placeholder="old password" />
                                    </div>
                                </div>
                                <div className='col-md-6 mt-3'>
                                    <div class="mb-2">
                                        <label for="exampleFormControlInput1" class="form-label fw-semibold">New Password</label>
                                        <input
                                            type="password"
                                            class="form-control p-2"
                                            name='password'
                                            value={credentials.password}
                                            onChange={onChange}
                                            placeholder="New Password" />
                                    </div>
                                </div>
                                <div className='col-md-6 mt-3'>
                                    <div class="mb-2">
                                        <label for="exampleFormControlInput1" class="form-label fw-semibold">Confirm Password</label>
                                        <input
                                            type="password"
                                            class="form-control p-2"
                                            name='password_confirmation'
                                            value={credentials.password_confirmation}
                                            onChange={onChange}
                                            placeholder="Confirm Password" />
                                    </div>
                                </div>
                                <div className='text-center mt-3'>
                                    <button
                                        className='btn bg-pink text-light btn-lg'
                                        type='submit'>
                                        {loader === false ? 'Change Password' : <Loader />}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ChangePassword
