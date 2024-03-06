import React from 'react'
import { UilPlus } from '@iconscout/react-unicons'
function Interests() {
  return (
    <div>
      <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-4 p-3 mt-3'>
                        <h5 className='fw-bold'>My Interests</h5>
                        <p>Share Interests</p>
                    </div>
                    <div className='col-md-8 mt-3'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <div class="mb-2">
                                    <h3>My Interest(s)</h3>
                                    <button className='btn bg-pink px-5'><UilPlus size='30' color='black'/></button>
                                </div>
                            </div>
                            <div className='col-md-12'>
                                <div class="mb-2">
                                    <label for="exampleFormControlInput1" class="form-label fw-semibold">My Interests</label>
                                    <p>Running</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Interests
