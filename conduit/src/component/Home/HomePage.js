import React, { useContext, useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import './style.css';
import Pagination from 'react-bootstrap/Pagination';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';


let active = 1;
let items = [];
for (let number = 1; number <= 20; number++) {
    items.push(
        <Pagination.Item key={number} active={number === active} className='pagination-item'>
            {number}
        </Pagination.Item>,
    );
}

const HomePage = () => {
    const [articles, setArticles] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [token, setToken] = useState(localStorage.getItem('userToken'));
    const [user, setUser] = useState();
    const nav = useNavigate()

    // useEffect(() => {
    //     fetch('https://api.realworld.io/api/user', {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             setUser(data.user)
    //             console.log(data.user);
    //         })
    //         .catch(error => console.error('Error fetching user:', error));
    // }, []);


    useEffect(() => {
        if (token) {
            fetch('https://api.realworld.io/api/articles', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
                // .then(console.log(token))
                .then(response => response.json())
                .then(data => setArticles(data.articles))
                .catch(error => console.error('Error fetching articles:', error));
        }
        else {
            fetch('https://api.realworld.io/api/articles')
                .then(response => response.json())
                .then(data => setArticles(data.articles))
                .catch(error => console.error('Error fetching articles:', error));
        }
    }, []);

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    }

    const handleDetail = (slug) =>{
        nav(`/article/${slug}`)
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
        return formattedDate;
    };

    return (
        <div>
            <Header />

            <div className='banner'>
                <div className='container text-center'>
                    <h1>conduit</h1>
                    <p>A place to share your knowledge.</p>
                </div>
            </div>

            <div className='pr-32 pl-32 pt-10 row'>
                <div className='col-md-9'>
                    <div className='feed-toggle'>
                        <ul className='nav nav-pills feed-item'>
                            <li className='nav-item'>
                                <a className='nav-link feed-tag'>Global Feed</a>
                            </li>
                            {/* <li className='nav-item'>
                                <a className='nav-link feed-tag'># tag</a>
                            </li> */}
                        </ul>
                    </div>

                    {articles.map(articles => (
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

                                <button className='btn btn-sm btn-outline-success btn-heart' style={{ borderColor: '#5CB85C' }}>
                                    <i className='fa fa-heart'></i>
                                    <span className='ml-1' style={{ fontWeight: '400' }}>{articles.favoritesCount}</span>
                                </button>
                            </div>

                            <div className='d-block' onClick={()=>handleDetail(articles.slug)}>
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

                </div>

                <div className='col-md-3'>
                    <div className='sidebar'>
                        <p>Popular Tags</p>

                        <div className='popular-tags'>
                            <a className='popular-tags-item' href=''>welcome</a>
                            <a className='popular-tags-item' href=''>implementations</a>
                            <a className='popular-tags-item' href=''>introduction</a>
                            <a className='popular-tags-item' href=''>codebaseShow</a>
                            <a className='popular-tags-item' href=''>ipsum</a>
                            <a className='popular-tags-item' href=''>qui</a>
                            <a className='popular-tags-item' href=''>et</a>
                            <a className='popular-tags-item' href=''>cupiditate</a>
                            <a className='popular-tags-item' href=''>quia</a>
                            <a className='popular-tags-item' href=''>deserunt</a>
                        </div>
                    </div>
                </div>
            </div>

            <Pagination className='mr-32 ml-32 pagination'>{items}</Pagination>

            <Footer />
        </div>
    );
}

export default HomePage;
