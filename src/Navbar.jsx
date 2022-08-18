import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
  return (<>


<nav className="navbar navbar-expand-lg ">
  <div className="container">
    <Link className="navbar-brand text-white" to="notes">
    <i className="far fa-sticky-note me-1 text-white"></i>
    Notes</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse " id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto ">



        {props.userData ? <>
        <li className="nav-item dropdown ">
          <Link className="nav-link dropdown-toggle text-muted fs-5" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Logout
          </Link>
          <ul className="dropdown-menu">
            <li><span onClick={props.logOut} className="nav-link logout" >Logout</span></li>
          </ul>
        </li> </> : <>  
        <li className="nav-item dropdown ">
          <Link className="nav-link dropdown-toggle text-muted " to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Login
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item " to="register">sign up</Link></li>
            <li><Link className="dropdown-item " to="signin">sign in</Link></li>
          </ul>
        </li>
        </>}



      </ul>

    </div>
  </div>
</nav>








    </>
  )
}
