import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../App';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import Header from './Home/Header';

const Register = () => {
  const nav = useNavigate();
  const { setUser } = useContext(UserContext);
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(true);
  localStorage.clear();

  const handleRegister = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const data = {
      user: {
        username,
        email,
        password,
      },
    };

    axios
      .post('https://api.realworld.io/api/users', data)
      .then((res) => {
        setUser(res.data.user);
        localStorage.setItem('userToken', res.data.user.token);
        nav('/');
      })
      .catch((error) => {
        setErrorMessage(false);
        const errors = error.response.data.errors;
        const key = Object.keys(errors)[0];
        setErrorMessage(`${key} ${errors[key][0]}`);
        console.log(errors);
      });
  };

  return (
    <>
      <Header />
      <MDBContainer
        fluid
        className='d-flex align-items-center justify-content-center bg-image'
      >
        <div className='mask gradient-custom-3'></div>
        <MDBCard className='m-5' style={{ maxWidth: '600px' }}>
          <MDBCardBody style={{ width: '30rem', height: 'auto' }}>
            <h2 className='text-uppercase text-center mb-5'>Sign Up</h2>
            
            {!errorMessage && (
              <div className='alert alert-danger' role='alert'>
                {errorMessage}
              </div>
            )}
            <div className='text-center pb-5'>
                <a href='/login' className='need' style={{ color: '#5CB85C' }}>
                  Have an account?
                </a>
              </div>
            <form onSubmit={handleRegister}> {/* Wrap the form fields with a form element */}
              <MDBInput
                wrapperClass='mb-4'
                label=''
                size='lg'
                id='form1'
                type='text' placeholder='Your Name'
                required
                value={username}
                onChange={(e) => setName(e.target.value)}
              />
              <MDBInput
                wrapperClass='mb-4'
                label=''
                size='lg'
                id='form2' placeholder='Email'
                type='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MDBInput
                wrapperClass='mb-4'
                label=''
                size='lg'
                id='form3'
                type='password' placeholder='Password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              
              <MDBBtn
                className='mb-4 float-end'
                size='lg'
                style={{
                  color: 'white',
                  backgroundColor: '#5CB85C',
                  borderColor: '#5CB85C',
                }}
                type='submit'
              >
                Sign up
              </MDBBtn>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
};

export default Register;