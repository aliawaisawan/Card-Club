import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../common/Loader';
import { setUser } from '../../redux/actions/userProfile';

function PersonalInfo(props) {
    const [state, setState] = useState([]);
    const [city, setCity] = useState([]);
    const [loader, setLoader] = useState(false);

    const dispatch = useDispatch();

    const [credentials, setCredentials] = useState({
        name: props?.name,
        role: props?.role,
        zip: props?.zip,
        salary: props?.salary,
        country: props.country,
        city: props.city,
        state: props.state,
        dob: props?.dob
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });

        if (name === 'country' && name === 'state') {
            getState(value);
        }
    };

    const Countries = useSelector((state) => state.countries.countries);

    useEffect(() => {
        if (credentials.country && credentials.country.length > 0) {
            getState(credentials.country);
        }
    }, [credentials.country]);

    useEffect(() => {
        if (credentials.state && credentials.state.length > 0) {
            getCity(credentials.state);
        }
    }, [credentials.state]);

    const getState = (country_id) => {
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

        var formdata = new FormData();
        formdata.append("country_id", country_id);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(`${process.env.REACT_APP_API_URL}get-states-by-country`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setState(result);
            })
            .catch(error => {
                console.error('Error:', error);
                toast("Error occurred while fetching states");
            });
    };

    const getCity = (state_id) => {
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

        var formdata = new FormData();
        formdata.append("state_id", state_id);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(`${process.env.REACT_APP_API_URL}get-cities-by-state`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setCity(result);
            })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader(true);
        try {
            var myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

            var formdata = new FormData();
            formdata.append("dob_date", credentials.dob);
            formdata.append("company_name", credentials.name);
            formdata.append("company_role", credentials.role);
            formdata.append("zip_code", credentials.zip);
            formdata.append("salary", credentials.salary);
            formdata.append("country_id", credentials.country);
            formdata.append("state_id", credentials.state);
            formdata.append("city_id", credentials.city);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(`${process.env.REACT_APP_API_URL}details`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.message === 'Update sucessfully') {
                        toast("Profile Info Updated Successfully")
                        dispatch(setUser(result.user));
                        setLoader(false);
                    }
                    else {
                        toast("Something Went Wrong");
                        setLoader(false)
                    }
                })

        } catch (error) {
            console.error(error);
            loader(false);
            toast("Internal Server Error")
        }
    };

    return (
        <div>
            <div className='container mt-5'>
                <form onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className='col-md-4 p-3 mt-3'>
                            <h5 className='fw-bold'>Personal Information</h5>
                            <p>Edit Your Personal Information</p>
                        </div>
                        <div className='col-md-8 mt-3'>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <div class="mb-2">
                                        <label for="exampleFormControlInput1" class="form-label fw-semibold">Date of Birth</label>
                                        <input
                                            type="date"
                                            class="form-control p-2"
                                            value={credentials.dob}
                                            onChange={onChange}
                                            name="dob"
                                            placeholder="0000/00/00" />
                                    </div>
                                </div>

                                <div className='col-md-6'>
                                    <div class="mb-2">
                                        <label for="exampleFormControlInput1" class="form-label fw-semibold">Company Name</label>
                                        <input
                                            type="text"
                                            class="form-control p-2"
                                            placeholder="Your Company Name"
                                            value={credentials.name}
                                            name="name"
                                            onChange={onChange}
                                        />
                                    </div>
                                </div>

                                <div className='col-md-6'>
                                    <div class="mb-2">
                                        <label for="exampleFormControlInput1" class="form-label fw-semibold">Your Role</label>
                                        <input
                                            type="text"
                                            class="form-control p-2"
                                            placeholder="Your Role"
                                            value={credentials.role}
                                            name="role"
                                            onChange={onChange}
                                        />
                                    </div>
                                </div>

                                <div className='col-md-12'>
                                    <div class="mb-2">
                                        <label for="exampleFormControlInput1" class="form-label fw-semibold">Zip/Postal Code</label>
                                        <input
                                            type="number"
                                            class="form-control p-2"
                                            value={credentials.zip}
                                            name="zip"
                                            onChange={onChange}
                                            placeholder="0000" />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div class="mt-2">
                                        <label for="exampleFormControlInput1" class="form-label fw-semibold">Salary</label>
                                        <input
                                            type="number"
                                            class="form-control p-2"
                                            value={credentials.salary}
                                            name="salary"
                                            onChange={onChange}
                                            placeholder="0000" />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div class="mt-2">
                                        <label for="exampleFormControlInput1" className="form-label fw-semibold">Country</label>
                                        <select value={credentials.country} name="country" onChange={onChange} className="form-select p-2" aria-label="Default select example">
                                            <option value="" disabled selected>Select Country</option>
                                            {Countries.map((country) => (
                                                <option key={country.id} value={country.id}>{country.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div class="mt-2">
                                        <label for="exampleFormControlInput1" className="form-label fw-semibold">State</label>
                                        <select value={credentials.state} onChange={onChange} name="state" className="form-select p-2" aria-label="Default select example">
                                            <option value="" disabled selected>Select State</option>
                                            {state.map((states) => (
                                                <option key={states.id} value={states.id}>{states.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div class="mt-2">
                                        <label for="exampleFormControlInput1" className="form-label fw-semibold">City</label>
                                        <select value={credentials.city} onChange={onChange} name="city" className="form-select p-2" aria-label="Default select example">
                                            <option value="" disabled selected>Select City</option>
                                            {city.map((cities) => (
                                                <option key={cities.id} value={cities.id}>{cities.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className='text-center mt-3'>
                                    <button
                                        type='submit'
                                        className='btn bg-pink text-light btn-lg btn-block'>
                                        {loader === false ? 'Update Profile' : <Loader />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default PersonalInfo;
