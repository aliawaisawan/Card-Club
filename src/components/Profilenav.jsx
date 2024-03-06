import React from 'react'
import { Link } from 'react-router-dom'
import { UilUsersAlt,UilLockAccess,UilBrowser,UilUserSquare,UilApps,UilMailbox  } from '@iconscout/react-unicons'
function Profilenav() {
  return (
    <>
     <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/"><img src='assets/images/logo.png' alt='' height={45} /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link rounded-5 bg-pink btn ms-2 mt-sm-2" to="#"><UilUsersAlt color='black' size='25'/></Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link rounded-5 bg-pink  btn ms-2 mt-sm-2" to="#"><UilLockAccess color='black' size='25'/></Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link rounded-5 bg-pink btn ms-2 mt-sm-2" to="#"><UilBrowser color='black' size='25'/></Link>
        </li>
      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link rounded-5 bg-secondary btn ms-2 mt-sm-2" to="#"><UilApps color='white' size='25'/></Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link rounded-5 bg-secondary btn ms-2 mt-sm-2" to="#"><UilMailbox color='white' size='25'/></Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link rounded-5 bg-secondary btn ms-2 mt-sm-2" to="#"><UilUserSquare color='white' size='25'/></Link>
        </li>
      
      </ul>
    </div>
  </div>
</nav> 
    </>
  )
}

export default Profilenav
