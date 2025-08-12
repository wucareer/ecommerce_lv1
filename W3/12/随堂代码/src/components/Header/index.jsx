import React from 'react';
import { useNavigate } from 'react-router';
import Search from '../Search';
import './index.css';
import logo from '../../assets/logo.png';
import logo_red from '../../assets/logo_red.png';
import cartlogo from '../../assets/cart_logo.png';


export default function Header(props) {
  // logotype 1彩色 2 白色
  const { logoType = 1 } = props
  const navigate = useNavigate();


  const handeBackHome = () => {
    navigate('/')
  }

  return (
    <div className="head">
      <div className="logo" onClick={handeBackHome}>
        <img src={logoType === 1 ? logo_red : logo} alt="logo"></img>
      </div>
      <div className="search-container">
        <Search />
      </div>
      <div className="cart">
        <img src={cartlogo} alt="" />
      </div>
    </div>
  )
}