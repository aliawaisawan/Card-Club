import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OtpInput from 'react-otp-input';
import Loader from '../components/common/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Otp() {

  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const email = localStorage.getItem("email");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      var myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");

      var formdata = new FormData();
      formdata.append("email", String(email));
      formdata.append("token", otp);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch(`${process.env.REACT_APP_API_URL}password/verifyOtp`, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.status === 200) {
            setLoader(false);
            navigate('/change-password');
          }
          else {
            toast("Invalid OTP");
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
                  <h3 className="text-center ">OTP sent!</h3>
                  <p className="text-center mb-2 ">Enter the 4-digit code we sent to you at Email</p>
                  <div className='my-4 d-flex justify-content-center'>
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
                  <div className='text-center'>
                    <button
                      onClick={handleSubmit}
                      className={`${otp.length === 4 ? '' : 'disabled'} btn btn-lg login-btn`}
                    >
                      {loader === false ? 'Verify' : <Loader />}
                    </button>
                  </div>
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

export default Otp
