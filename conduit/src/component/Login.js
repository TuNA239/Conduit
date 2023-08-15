import React from 'react';
import { Link, useNavigate } from 'react-router-dom';




const LoginPage = () => {

    const submit = () => {

    }


    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row mt-5">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign in</h1>
                        <p className="text-xs-center">
                            {/* <Link to="/">Need an account?</Link> */}
                            <p>Need an account?</p>
                        </p>

                        <form onSubmit={submit} className='container mt-9'>
                            <div className=''>
                                <div className='form-group'>
                                    <input name='email' type='text' placeholder='Email' className='form-control form-control-lg mb-6' />
                                    <input name='password' type='password' placeholder='Password' className='form-control form-control-lg mb-6' />
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

