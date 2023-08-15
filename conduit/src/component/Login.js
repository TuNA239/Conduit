import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

async function loginUser(credentials) {
    return fetch('https://api.realworld.io/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

const LoginPage = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [token, setToken] = useState();


    const handleSubmit = async e => {
        e.preventDefault();
        const users = await loginUser({
            "user": {
                "email": username,
                "password": password
            }
        });
        console.log(users);
        setToken(users.user.token);
        console.log(token);
    }


    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row mt-5">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-center">Sign in</h1>
                        <p className="text-center">
                            <div className='text-center'>
                                <a href='/register' className='need' style={{ color: '#5CB85C' }}>
                                    Have an account?
                                </a>
                            </div>
                        </p>
                        <form onSubmit={handleSubmit} className='container mt-9'>
                            <div className=''>
                                <div className='form-group'>
                                    <input name='email' type='text' placeholder='Email' className='form-control form-control-lg mb-6' required onChange={e => setUsername(e.target.value)} />
                                    <input name='password' type='password' placeholder='Password' className='form-control form-control-lg mb-6' required onChange={e => setPassword(e.target.value)} />
                                </div>
                                <button
                                    type='submit'
                                    className='btn btn-success float-end btn-lg'
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;

