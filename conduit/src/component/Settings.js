import React from 'react';
import Header from './Home/Header';
import Footer from './Home/Footer';
import './Home/style.css';

const Settings = () => {
    return (
        <>
            <Header/>
                <div className='setting-page'>
                    <div className='container page' style={{marginTop:'1.5rem'}}>
                        <div className='page'>
                            <div className='col-md-6 offset-md-3 col-xs-12'>
                                <h1 className='text-center heading-setting'>Your Settings</h1>
                                <form className='mb-5'>
                                        <fieldset className='form-group '>
                                            <input type='text' className='form-control' placeholder='URL of profile picture'/>
                                        </fieldset>
                                        <fieldset className='form-group mt-3'>
                                            <input type='text' className='form-control form-control-lg' placeholder='Username'/>
                                        </fieldset>
                                        <fieldset className='form-group mt-3'>
                                            <textarea rows='8' className='form-control form-control-lg' placeholder='Short bio about you'></textarea>
                                        </fieldset>
                                        <fieldset className='form-group mt-3'>
                                            <input type='email' className='form-control form-control-lg' placeholder='email'/>
                                        </fieldset>
                                        <fieldset className='form-group mt-3'>
                                            <input type='password' className='form-control form-control-lg' placeholder='New Password'/>
                                            <button className='btn btn-success btn-update-setting mt-3'>Update Setting</button>
                                        </fieldset>
                                </form>

                                <hr className='setting-hr'/>

                                <button className='btn btn-outline-danger'>Or click here to logout.</button>

                            </div>
                        </div>
                    </div>
                </div>
            <Footer/>
        </>
    );
}

export default Settings;
