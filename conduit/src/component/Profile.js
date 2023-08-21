import React, { useState } from 'react';
import Header from './Home/Header';
import Footer from './Home/Footer';
import './Home/style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Page404 from './404Page/404Page';

const Profile = () => {
    const [articlesFavorites, setarticlesFavorites] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('userToken'));
    const [user, setUser] = useState()
    const [n1Articles, setn1Articles] = useState([])
    const nav = useNavigate()

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
                console.log(user);
            })
            .catch(error => console.error('Error fetching user:', error));
    }, [token]);

    if(!token){
        return(
            <Page404/>
        )
    }

    const getallArticles = async () => {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
        try {
            const allArticles = await axios.get(`https://api.realworld.io/api/articles`, { headers })
            const arFall = allArticles.data.articles.filter(article => article.favorited);
            setarticlesFavorites(arFall)
        } catch (error) {
            console.log(error);
        }
    }
    const handlegetFavorite = () => {
        getallArticles();

    }
    

    const handleDetail = (slug) => {
        nav(`/article/${slug}`)
    }
    const getAnArticles = async (slug) => {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
        try {
            const anArticles = await axios.get(`https://api.realworld.io/api/articles/${slug}`, { headers })

            setn1Articles(anArticles.data.article)

        } catch (error) {
            console.log(error);
        }
    }
    const handleFavorite = (slug) => {
        getAnArticles(slug);
        try {
            const headers = {
                'Authorization': `Bearer ${token}`
            }

            if (n1Articles.favorited) {
                const respons = axios.delete(`https://api.realworld.io/api//articles/${slug}/favorite`, {
                    headers
                })
            }
            else {
                const respons = axios.post(`https://api.realworld.io/api//articles/${slug}/favorite`, {}, {
                    headers
                })

            }
        } catch (error) {
            console.log(" handle favorites");

        }
        handlegetFavorite();

    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
        return formattedDate;
    };

    if(!user){
        return(
            <div>Loading...</div>
        )
    }

    return (
        <>
            <Header />

            <div className='user-info'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-xs-12 col-md-10 offset-md-1'>
                            <img className='user-img' src={user.image} />
                            <h4 className='user-name text-center'>{user.username}</h4>

                            <a href='/setting' className='btn btn-sm btn-outline-secondary btn-edit-profile d-flex align-items-center mt-6'>
                                <i className='fa fa-gear'></i>
                                &nbsp;&nbsp;Edit Profile Settings
                            </a>
                        </div>
                    </div>
                </div>
            </div>


            <div className='pr-52 pl-52 pt-10 row'>
                <div className='feed-toggle' style={{ borderBottom: '1px solid lightgray' }}>
                    <ul className='nav nav-pills feed-item'>
                        <li className='nav-item'>
                            <a className='nav-link feed-tag'>My Articles</a>
                        </li>
                        <li className='nav-item'>
                            <a
                                onClick={() => handlegetFavorite()}
                                className='nav-link feed-tag'>Favorited Articles</a>

                        </li>

                    </ul>
                </div>

                {articlesFavorites.map((articles, index) => (
                    <div key={articles.slug} className='article-preview'>
                        <div className='d-flex justify-between align-items-center'>
                            <div className='article-meta d-flex align-items-center gap-3'>
                                <a className='d-inline-block'>
                                    <img src={articles.author.image} alt='error' />
                                </a>
                                <div className='info'>
                                    <a className='no-underline hover:underline hover:cursor-pointer'>{articles.author.username}</a>
                                    <span className='feed-date'>{formatDate(articles.updatedAt)}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => handleFavorite(articles.slug)}
                                className={`btn btn-sm btn-outline-success btn-heart ${articles.isFavorited ? 'bg-success text-white' : ''}`} style={{ borderColor: '#5CB85C' }}

                            >
                                <i className={`fa fa-heart ${articles.isFavorited ? 'text-white' : ''}`}></i>
                                <span className='ml-1' style={{ fontWeight: '400' }}>{articles.favoritesCount}</span>
                            </button>
                        </div>

                        <div className='d-block' onClick={() => handleDetail(articles.slug)}>
                            <h1 className='article-title'>{articles.title}</h1>
                            <p className='article-description'>{articles.description}</p>
                            <div className='d-flex align-items-center justify-between'>
                                <span className='article-read-more hover:cursor-pointer'>Read more ...</span>
                                {/* list tag */}
                                <ul className='tag-list'>
                                    {articles.tagList.map(tag => (
                                        <li key={tag} className='tag-item hover:cursor-pointer'>{tag}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                    </div>
                ))}


                {/* <YourFeed/> */}

            </div>

            <Footer />
        </>
    );
}

export default Profile;
