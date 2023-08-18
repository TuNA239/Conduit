import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Header from './Home/Header';

const LoginPage = () => {
    const nav = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await fetch('https://api.realworld.io/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        email,
                        password
                    }
                })
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.log(errorData);
                throw errorData;
            }

            const user = await res.json();
            console.log(user);
            console.log(user.user.token);
            localStorage.setItem('userToken', user.user.token)
            nav('/')
        } catch (error) {
            if (error.errors) {
                const errorMessage = Object.keys(error.errors) + ' ' + Object.values(error.errors)
                setError(errorMessage);
            } else {
                setError('An error occurred');
            }
            console.log('Error:', error);
        }
    };
    return (
        <div className="auth-page">
            <Header />
            <div className="container page">
                <div className="row mt-5">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-center">Sign in</h1>
                        <p className="text-center">
                            <div className='text-center'>
                                <a href='/register' className='need' style={{ color: '#5CB85C' }}>
                                    Need an account?
                                </a>
                            </div>
                        </p>
                        <form onSubmit={handleSubmit} className='container mt-9'>
                            {error && <div className="text-center text-danger mt-3" style={{ color: '#B85C5C', fontWeight: 'bold' }}>{error}</div>}
                            <div className=''>
                                <div className='form-group'>
                                    <input
                                        name='email'
                                        type='text'
                                        placeholder='Email'
                                        className='form-control form-control-lg mb-6'
                                        // required
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <input
                                        name='password'
                                        type='password'
                                        placeholder='Password'
                                        className='form-control form-control-lg mb-6'
                                        // required
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
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
