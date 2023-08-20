import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Home/Header';
import Footer from './Home/Footer';
import './Home/style.css';

const Settings = () => {

    const [token, setToken] = useState(localStorage.getItem('userToken'));
    const { slug } = useParams();
    const [user, setUser] = useState();
    const [image, setImage] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogout = () => {
        localStorage.clear();
    }

    useEffect(() => {
        fetch('https://api.realworld.io/api/user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setUser(data.user); 
            setImage(data.user.image);
            setUsername(data.user.username);
            setBio(data.user.bio );
            setEmail(data.user.email);
        })
        .catch(error => console.error('Error fetching user:', error));
    }, [token]);

    // useEffect(() => {
    //     fetch("https://api.realworld.io/api/user", {
    //       method: "GET",
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     })
    //       .then((response) => response.json())
    //       .then((data) => {
    //         setUser(data.user);
    //         console.log(data.user);
    //       })
    //       .catch((error) => console.error("Error fetching user:", error));
    //   }, []);


    const handleUpdateSettings = (event) => {
        event.preventDefault();
        
        // Gather updated data from the form
        const updatedUserData = {
            image,
            username,
            bio,
            email,
            password,
        };
        
        // Send a PUT request to update the user settings
        fetch('https://api.realworld.io/api/user', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                user: {
                  email: email,
                  token: token,
                  username: username,
                  bio: bio,
                  image: image
              } }),
        })
        .then(response => response.json())
        .then(data => {
            setUser(data.user); // Update the user state with the updated data
            console.log(data);
            localStorage.setItem('userToken', data.user.token)
            window.location.href = '/profile';
        })
        .catch(error => console.error('Error updating user settings:', error));
    };

    return (
        <>
            <Header/>
            <div className='setting-page'>
                <div className='container page' style={{ marginTop: '1.5rem' }}>
                    <div className='page'>
                        <div className='col-md-6 offset-md-3 col-xs-12'>
                            <h1 className='text-center heading-setting'>Your Settings</h1>
                            <form className='mb-5'>
                                <fieldset className='form-group '>
                                    <input type='text' value={image} onChange={(e) => setImage(e.target.value)} className='form-control' placeholder='URL of profile picture'/>
                                </fieldset>
                                <fieldset className='form-group mt-3'>
                                    <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} className='form-control form-control-lg' placeholder='Username'/>
                                </fieldset>
                                <fieldset className='form-group mt-3'>
                                    <textarea rows='8' value={bio} onChange={(e) => setBio(e.target.value)} className='form-control form-control-lg' placeholder='Short bio about you'></textarea>
                                </fieldset>
                                <fieldset className='form-group mt-3'>
                                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='form-control form-control-lg' placeholder='email'/>
                                </fieldset>
                                <fieldset className='form-group mt-3'>
                                    <input type='password' onChange={(e) => setPassword(e.target.value)} className='form-control form-control-lg' placeholder='New Password'/>
                                    <button className='btn btn-success btn-update-setting mt-3' onClick={handleUpdateSettings}>Update Setting</button>
                                </fieldset>
                            </form>

                            <hr className='setting-hr'/>

                            <a href='/'><button className='btn btn-outline-danger' onClick={() => handleLogout()}>Or click here to logout.</button></a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Settings;
