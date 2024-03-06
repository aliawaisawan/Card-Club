import React, { useState } from 'react'
import { UilPlusCircle } from '@iconscout/react-unicons';

function UpdateModel() {
    const handleClose = () => setShow(false);
    const [ setShow] = useState(false);
    return (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-pink">
                        <h4 class="modal-title text-white" id="exampleModalLabel">Create New Reminder</h4>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <label className='mt-3'>Title</label>
                                    <input type="text" name="text" required class="form-control form-control-md mb-2" placeholder="Mother's Birthday" />
                                </div>
                                <div className='col-md-6'>
                                    <label className='mt-3 '>Date</label>
                                    <input type="date" name="date" required class="form-control form-control-md mb-2" />
                                </div>
                                <div className='col-md-6'>
                                    <label className='mt-3'>Time</label>
                                    <input type="time" name="time" required class="form-control form-control-md mb-2" />
                                </div>
                                <div className='col-md-12'>
                                    <label className='mt-3 '>Relationship</label>
                                    <input type="text" name="relation" required class="form-control form-control-md mb-2" />
                                </div>
                                <p className='pt-3'>Add recipient</p>
                                <div className=''>
                                    <img height={'30px'} src="assets/images/icons/man.png" alt="Man icon" />
                                    <img height={'30px'} src="assets/images/icons/woman2.png" alt="woman1 icon" />
                                    <img height={'30px'} src="assets/images/icons/woman.png" alt="woman2 icon" />
                                    <button class=" btn btn-md text-pink" to="/reminder"><UilPlusCircle size='40' /></button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button onClick={handleClose} type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn bg-pink">Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateModel