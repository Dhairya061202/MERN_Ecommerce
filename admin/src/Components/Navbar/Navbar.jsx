import React from 'react'
import '../Navbar/Navbar.css'
import navlogo from '../../assets/logo.png'
import navProfile from '../../assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="logo">
            <img className='nav-logo' src={navlogo} alt="" />
            <div className="text">
                <div className="logo-text">CLOTHIFY</div>
                <div className="admin-text">Admin Panel</div>
            </div>
        </div>
      <img className='nav-profile' src={navProfile} alt="" />
    </div>
  )
}

export default Navbar
