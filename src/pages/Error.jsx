import React from 'react';
import { Link } from 'react-router-dom';
import { UilExclamationTriangle } from '@iconscout/react-unicons';

function Error() {
  return (
    <div
      className="full-content text-center text-white d-flex flex-column">
      <div className="container my-auto"style={{fontFamily: 'Verdana, Geneva, Tahoma, sans-serif' }}>
        <h1 className="display-1 d-flex justify-content-center">
          <UilExclamationTriangle size="86" className="text-red"/>
          <strong className='ms-2 text-red fw-bold'>404</strong>
        </h1>
        <h1 className="display-6 fw-bolder text-black mt-5">
          Oops.. You just found an error page..
        </h1>
        <h4 className="text-secondary mt-3">
          We are sorry but the page you are looking for was not found...
        </h4>
        <Link className="btn text-white btn-block px-5 bg-pink btn-lg mt-4" to="/">
          Home
        </Link>
      </div>
    </div>
  );
}

export default Error;
