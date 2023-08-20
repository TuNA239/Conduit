import React from 'react';
import Header from './Home/Header';
import Footer from './Home/Footer';
import './Home/style.css';

const Profile = () => {
    return (
        <>
            <Header/> 

            <div className='user-info'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-xs-12 col-md-10 offset-md-1'>
                            <img className='user-img' src='https://api.realworld.io/images/smiley-cyrus.jpeg' />
                            <h4 className='user-name'>abca123456</h4>

                            <a href='/setting' className='btn btn-sm btn-outline-secondary btn-edit-profile d-flex align-items-center mt-6'>
                                <i className='fa fa-gear'></i>
                                &nbsp;&nbsp;Edit Profile Settings
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className='container mt-8'>
                <div className='row'>
                    <div className='col-xs-12 col-md-10 offset-md-1'>
                        <div className='articles-toggle'>
                            <ul className='nav nav-fill nav-profile'>
                                <li className='nav-item'>
                                    <a className='nav-link'>My articles</a>
                                </li>
                                <li className='nav-item'>
                                    <a className='nav-link'>Favorited Articles</a>
                                </li>
                            </ul>
                        </div>

                        <div className='article-preview-profile'>
                            <div className='d-flex justify-between align-items-center'>
                                <div className='article-meta d-flex align-items-center gap-3'>
                                    <a className='d-inline-block'>
                                        <img src='https://api.realworld.io/images/demo-avatar.png' alt='error'/>
                                    </a>
                                    <div className='info'>
                                        <a className='no-underline hover:underline hover:cursor-pointer'>abc</a>
                                        <span className='feed-date'>December 9, 2022</span>
                                    </div>
                                </div>

                                <button className='btn btn-sm btn-outline-success btn-heart bg-success text-white' style={{borderColor:'#5CB85C'}}
                                >
                                    <i className='fa fa-heart text-white'></i>
                                    <span className='ml-1' style={{fontWeight:'400'}}>1644</span>
                                </button>
                            </div>

                            <div className='d-block'>
                                <h1 className='article-title'>Try to transmit the HTTP card, maybe it will override the multi-byte hard drive!</h1>
                                <p className='article-description'>Assumenda molestiae laboriosam enim ipsum quaerat enim officia vel quo. Earum odit rem natus totam atque cumque. Sint dolorem facere non.</p>
                                <div className='d-flex align-items-center justify-between'>
                                    <span className='article-read-more hover:cursor-pointer'>Read more ...</span>
                                    <ul className='tag-list'>
                                            <li className='tag-item hover:cursor-pointer'>hic</li>
                                            <li className='tag-item hover:cursor-pointer'>hic</li>
                                            <li className='tag-item hover:cursor-pointer'>hic</li>
                                            <li className='tag-item hover:cursor-pointer'>hic</li>
                                    </ul>
                                </div>         
                            </div>

                        </div>

                    </div>
                </div>
            </div> */}

            <div className='pr-52 pl-52 pt-10 row' style={{marginBottom:'8rem'}}>
                    <div className='feed-toggle' style={{borderBottom:'1px solid lightgray'}}>
                        <ul className='nav nav-pills feed-item'>
                            <li className='nav-item'>
                                <a className='nav-link feed-tag'>My Articles</a>
                            </li>
                            <li className='nav-item'>
                                <a className='nav-link feed-tag'>Favorited Articles</a>
                            </li>
                            {/* <li className='nav-item'>
                                <a className='nav-link feed-tag'># tag</a>
                            </li> */}
                        </ul>
                    </div>
                
                        <div  className='article-preview'>
                            <div className='d-flex justify-between align-items-center'>
                                <div className='article-meta d-flex align-items-center gap-3'>
                                    <a className='d-inline-block'>
                                        <img src='https://api.realworld.io/images/demo-avatar.png' alt='error'/>
                                    </a>
                                    <div className='info'>
                                        <a className='no-underline hover:underline hover:cursor-pointer'>Anah Benešová</a>
                                        <span className='feed-date'>December 9, 2023</span>
                                    </div>
                                </div>

                                <button className='btn btn-sm btn-outline-success btn-heart bg-success text-white' style={{borderColor:'#5CB85C'}}>
                                    <i className='fa fa-heart text-white'></i>
                                    <span className='ml-1' style={{fontWeight:'400'}}>1644</span>
                                </button>
                            </div>

                            <div className='d-block'>
                                <h1 className='article-title'>Try to transmit the HTTP card, maybe it will override the multi-byte hard drive!</h1>
                                <p className='article-description'>Assumenda molestiae laboriosam enim ipsum quaerat enim officia vel quo. Earum odit rem natus totam atque cumque. Sint dolorem facere non.</p>
                                <div className='d-flex align-items-center justify-between'>
                                    <span className='article-read-more hover:cursor-pointer'>Read more ...</span>
                                    <ul className='tag-list'>
                                            <li className='tag-item hover:cursor-pointer'>hic</li>
                                            <li className='tag-item hover:cursor-pointer'>hic</li>
                                            <li className='tag-item hover:cursor-pointer'>hic</li>
                                            <li className='tag-item hover:cursor-pointer'>hic</li>
                                    </ul>
                                </div>         
                            </div>

                        </div>

                    {/* <YourFeed/> */}
                    
            </div>

            <Footer/>  
        </>
    );
}

export default Profile;
