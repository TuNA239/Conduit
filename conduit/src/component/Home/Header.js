import React, { useState } from 'react';
import './style.css';
import { UserContext } from '../../App';
import { useContext } from 'react';
import { useEffect } from 'react';
const Header = () => {
    const [token, setToken] = useState(localStorage.getItem('userToken'))
    const [user, setUser] = useState({});



    useEffect(() => {
        fetch('https://api.realworld.io/api/user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setUser(data.user)
                // console.log(data.user);
            })
            .catch(error => console.error('Error fetching user:', error));
    }, []);

    if (!user) {
        setTimeout(() => {
        }, 1000)
    }

    return (
        <nav className='navbar navbar-light'>
            <div className='container' style={{ width: '70%' }}>
                <a href="/" className='navbar-brand fw-bolder fs-4' style={{ color: 'rgb(73, 204, 73)' }}>conduit</a>

                {/* Show before user login */}
                {!token && <ul className='nav flex'>
                    <li className='nav-item'>
                        <a href='/' className='nav-link' style={{ color: 'gray' }}>Home</a>
                    </li>
                    <li className='nav-item'>
                        <a href='/login' className='nav-link linkHeader' style={{ color: 'lightGray' }}>Sign in</a>
                    </li>
                    <li className='nav-item'>
                        <a href='/register' className='nav-link linkHeader' style={{ color: 'lightGray' }}>Sign up</a>
                    </li>
                </ul>}

                {/* Show after user login */}
                {token && <ul className='nav flex'>
                    <li className='nav-item'>
                        <a href='/' className='nav-link' style={{ color: 'gray' }}>Home</a>
                    </li>
                    <li className='nav-item'>
                        <a href='/editor' className='nav-link linkHeader' style={{ color: 'lightGray' }}>
                            <i className='fa fa-square-pen'></i>
                            &nbsp; New Article
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a href='/' className='nav-link linkHeader' style={{ color: 'lightGray' }}>
                            <i className='fa fa-gear'></i>
                            &nbsp; Settings
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a href='/' className='nav-link d-flex align-items-center linkHeader' style={{ color: 'lightGray' }}>
                            <i className='fa fa-face-laugh-squint fs-4'></i>
                            {/* <img src= {user.image} className='h-10 w-10'/> */}
                            &nbsp; {user.username}
                        </a>
                    </li>
                </ul>}

            </div>
        </nav>
    );
}

export default Header;
