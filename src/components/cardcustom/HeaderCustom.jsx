import React from 'react'
function HeaderCustom() {
  return (
    <>
     <nav class="p-4 bg-body-light ">
    <div class="container d-flex flex-wrap">
      <ul class="nav me-auto">
        <li class="nav-item"><a href="#" class="nav-link link-body-emphasis px-2 ">Home</a></li>
        <li class="nav-item"><a href="#" class="nav-link link-body-emphasis px-2"><span className='fw-bold fs-6'>{'>'}</span></a></li>
        <li class="nav-item"><a href="#" class="nav-link link-body-emphasis px-2 ">Customization</a></li>
        <li class="nav-item"><a href="#" class="nav-link link-body-emphasis px-2"><span className='fw-bold fs-6'>{'>'}</span></a></li>
        <li class="nav-item"><a href="#" class="nav-link link-body-emphasis px-2 ">Card</a></li>
        <li class="nav-item"><a href="#" class="nav-link link-body-emphasis px-2"><span className='fw-bold fs-6'>{'>'}</span></a></li>
        <li class="nav-item"><a href="#" class="nav-link link-body-emphasis px-2  text-danger">Create</a></li>

      </ul>
    </div>
  </nav>
    </>
  )
}

export default HeaderCustom
