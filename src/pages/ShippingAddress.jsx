import React from 'react'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'

function ShippingAddress() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);
  return (
    <div className=' container'>
      <div className='col-md-6 mx-auto mt-5'>
        <div className="card shadow bg-white rounded-5">
          <div className="card-body">
            <h3 className="text-center mt-3">Shipping Address</h3>
            <form action='' method='POST'>
              <div className='row'>
                <div className='col-md-12 mt-5'>
                  <div className="form-group">
                    <input type="text" name="name" required className="form-control form-control-md mb-3" placeholder="Address Name" />
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className="form-group">
                    <input type="text" name="st-address1" required className="form-control form-control-md mb-3" placeholder="Street Address or B.0. Box" />
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className="form-group">
                    <input type="text" name="st-address2" required className="form-control form-control-md mb-3" placeholder="Street Address or B.0. Box" />
                  </div>
                </div>
                <div className='col-md-12'>
                  <div className="form-group">
                    <input type="text" name="st-address3" required className="form-control form-control-md mb-3" placeholder="Company, Apartment, Floor, etc" />
                  </div>
                </div>
                <div className='col-md-12'>
                  <div className="form-group">
                    <input type="number" name="st-address3" required className="form-control form-control-md mb-3" placeholder="Zip/Postal code" />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <select id="inputState" name="country" className="form-select mb-3 form-select-md">
                      <option selected >United States</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <select id="inputState" name="country" className="form-select mb-3 form-select-md">
                      <option selected >Select State</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <select id="inputState" name="city" className="form-select mb-3 form-select-md">
                      <option selected >Select City</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-12 ">
                  <Link to='/' type="submit" name="" className="mt-3 text-white bg-pink w-100 rounded-2  btn btn-bg btn-md">Add Shipping Address</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div >
    </div>
  )
}
export default ShippingAddress
