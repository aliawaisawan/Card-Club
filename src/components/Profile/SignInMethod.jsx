import React from 'react'

function SignInMethod() {
  return (
    <div>
       <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-4'>
                        <h5 className='fw-bold'>Sign In Method</h5>
                        <p>Edit Your Personal Information</p>
                    </div>
                    <div className='col-md-8 border rounded-4  d-flex justify-content-between flex-wrap'>
                        <div className='d-flex gap-4' >
                            <img width='45px' height='45px' className='mt-3' src='assets/images/icons/social.png' alt='' />
                            <div className='mt-2'>
                                <h5>Google Accounts</h5>
                                <p>Your google account is connected</p>
                            </div>
                        </div>
                        <div class="form-check form-switch my-auto mx-auto mx-md-2  ">
                            <input class="form-check-input fs-5" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                        </div>
                    </div>
                    <div className='offset-md-4 col-md-8 border rounded-4  d-flex justify-content-between flex-wrap mt-4 mb-sm-2'>
                        <div className='d-flex gap-4' >
                            <img width='45px' height='45px' className='mt-3' src='assets/images/icons/facebook.png' alt='' />
                            <div className='mt-2'>
                                <h5>Facebook Accounts</h5>
                                <p>Your Facebook account is connected</p>
                            </div>
                        </div>
                        <div class="form-check form-switch my-auto mx-auto mx-md-2  ">
                            <button className='btn btn-pink btn-outline-dark'>Connect</button>
                        </div>
                    </div>

                </div>
            </div>
    </div>
  )
}

export default SignInMethod
