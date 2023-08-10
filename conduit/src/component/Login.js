import React from 'react';
import { Link, useNavigate } from 'react-router-dom';




const LoginPage = () => {

    const submit = () => {

    }


    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign in</h1>
                        <p className="text-xs-center">
                            {/* <Link to="/">Need an account?</Link> */}
                            <p>Need an account?</p>
                        </p>


                        <form onSubmit={submit} className='container'>
                            <div className='row position-relative'>
                                <div className='form-group'>
                                    <input name='email' type='text' placeholder='Email' className='col-7 form-control form-control-lg ng-pristine ng-valid ng-empty ng-touched' />
                                    <input name='password' type='password' placeholder='Password' className='col-7 form-control form-control-lg ng-pristine ng-valid ng-empty ng-touched' />
                                </div>
                                <button
                                    type='submit'
                                    className='btn btn-success col-3 position-relative btn-lg start-0'
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

