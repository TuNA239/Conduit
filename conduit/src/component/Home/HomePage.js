import React, { useContext, useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import './style.css';
import Pagination from 'react-bootstrap/Pagination';
import YourFeed from './YourFeed';
import { useNavigate } from 'react-router-dom';


// let active = 1;
// let items = [];
// for (let number = 1; number <= 20; number++) {
//   items.push(
//     <Pagination.Item key={number} active={number === active} className='pagination-item'>
//       {number}
//     </Pagination.Item>,
//   );
// }



const HomePage = () => {
    const [articles, setArticles] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [articlesCount, setArticlesCount] = useState(0);
    const [token, setToken] = useState(localStorage.getItem('userToken'));
    const nav = useNavigate()

    const limit = 10;

    useEffect(() => {
        const offset = (activePage - 1) * limit;

        if (token) {
            fetch(`https://api.realworld.io/api/articles?limit=${limit}&offset=${offset}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
                .then(response => response.json())
                .then(data => {
                    setArticles(data.articles);
                    setArticlesCount(data.articlesCount);
                })
                .catch(error => console.error('Error fetching articles:', error));
        } else {
            fetch(`https://api.realworld.io/api/articles?limit=${limit}&offset=${offset}`)
                .then(response => response.json())
                .then(data => {
                    setArticles(data.articles);
                    setArticlesCount(data.articlesCount);
                })
                .catch(error => console.error('Error fetching articles:', error));
        }
    }, [activePage]);

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    }

    const handleDetail = (slug) => {
        nav(`/article/${slug}`)
    }

    const handleFilter = (e) => {
        const offset = (activePage - 1) * limit;
        const tag = e
        fetch(`https://api.realworld.io/api/articles?limit=${limit}&offset=${offset}&tag=${tag}`)
            .then(response => response.json())
            .then(data => {
                setArticles(data.articles);
                setArticlesCount(data.articlesCount);
            })
            .catch(error => console.error('Error fetching articles:', error));
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
        return formattedDate;
    };

    const increaseFavorites = (articleIndex) => {
        const updatedArticles = [...articles];
        updatedArticles[articleIndex].favoritesCount += 1;
        updatedArticles[articleIndex].isFavorited = true; // Update isFavorited
        setArticles(updatedArticles);
    };

    const decreaseFavorites = (articleIndex) => {
        const updatedArticles = [...articles];
        updatedArticles[articleIndex].favoritesCount -= 1;
        updatedArticles[articleIndex].isFavorited = false; // Update isFavorited
        setArticles(updatedArticles);
    };

    const totalPages = Math.ceil(articlesCount / limit);

    // Dynamically generate pagination items based on totalPages
    const paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item
                key={number}
                active={number === activePage}
                className='pagination-item'
                onClick={() => handlePageChange(number)}
            >
                {number}
            </Pagination.Item>
        );
    }


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
                    <div className='feed-toggle' style={{ borderBottom: '1px solid lightgray' }}>
                        <ul className='nav nav-pills feed-item'>
                            {token && <li className='nav-item'>
                                <a className='nav-link feed-tag'>Your Feed</a>
                            </li>}
                            <li className='nav-item'>
                                <a className='nav-link feed-tag'>Global Feed</a>
                            </li>
                            {/* <li className='nav-item'>
                                <a className='nav-link feed-tag'># tag</a>
                            </li> */}
                        </ul>
                    </div>

                    {articles.map((articles, index) => (
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

                                <button className={`btn btn-sm btn-outline-success btn-heart ${articles.isFavorited ? 'bg-success text-white' : ''}`} style={{ borderColor: '#5CB85C' }}
                                    onClick={() => {
                                        if (articles.isFavorited) {
                                            decreaseFavorites(index);
                                        } else {
                                            increaseFavorites(index);
                                        }
                                    }}
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

                <div className='col-md-3'>
                    <div className='sidebar'>
                        <p>Popular Tags</p>

                        <div className='popular-tags'>
                            <a className='popular-tags-item' onClick={(e) => handleFilter("welcome")} >welcome</a>
                            <a className='popular-tags-item' onClick={(e) => handleFilter("implementations")} >implementations</a>
                            <a className='popular-tags-item' onClick={(e) => handleFilter("introduction")} >introduction</a>
                            <a className='popular-tags-item' onClick={(e) => handleFilter("codebaseShow")} >codebaseShow</a>
                            <a className='popular-tags-item' onClick={(e) => handleFilter("ipsum")} >ipsum</a>
                            <a className='popular-tags-item' onClick={(e) => handleFilter("qui")} >qui</a>
                            <a className='popular-tags-item' onClick={(e) => handleFilter("et")} >et</a>
                            <a className='popular-tags-item' onClick={(e) => handleFilter("cupiditate")} >cupiditate</a>
                            <a className='popular-tags-item' onClick={(e) => handleFilter("quia")} >quia</a>
                            <a className='popular-tags-item' onClick={(e) => handleFilter("deserunt")} >deserunt</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* <Pagination className='mr-32 ml-32 pagination'>{items}</Pagination> */}
            {/* <Pagination className='mr-32 ml-32 pagination'>{paginationItems}</Pagination> */}
            <Pagination
                className='mr-32 ml-32 pagination'
                currentPage={activePage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            >
                {paginationItems}
            </Pagination>

            <Footer />
        </div>
    );
}

export default HomePage;
