import React, { useState, useEffect } from 'react';

const ArticleList = () => {
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    // Gọi API để lấy danh sách bài viết
    fetch('https://api.realworld.io/api/articles?limit=10&offset=0')
      .then(response => response.json())
      .then(data => {
        setArticleList(data.articles);
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
      });
  }, []);

  return articleList.map((article, index) => {
    return (
      <div key={article.slug} class="article-preview">
        <div class="article-meta">
          <a href="profile.html">
            <img src={article.author.image} />
          </a>
          <div class="info">
            <a href="" class="author">
              {article.author.username}
            </a>
            <span class="date"></span>
          </div>
          <button class="btn btn-outline-primary btn-sm pull-xs-right">
            <i class="ion-heart"></i> 29
          </button>
        </div>
        <a href="" class="preview-link">
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <span>Read more...</span>
        </a>
      </div>
    );
  });
};

export default ArticleList;
