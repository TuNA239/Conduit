import React from 'react';
import './style.css';

const Footer = () => {
    return (
        <footer>
            <a href="https://github.com/" className='text-slate-50 no-underline hover:underline'>
                <i className="fa-brands fa-github"></i>
                &nbsp; Fork on GitHub
            </a>
        </footer>
    );
}

export default Footer;
