import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Home/Header";

const ArticleDetail = () => {
  const { slug } = useParams()
  const [token, setToken] = useState(localStorage.getItem('userToken'))
  const [article, setArticle] = useState()
  const [user, setUser] = useState();
  // console.log(slug);

  useEffect(() => {
    fetch(`https://api.realworld.io/api/articles/${slug}`)
      .then(response => response.json())
      .then(data => setArticle(data))
      .catch(error => console.error('Error fetching articles:', error));
  }, [])

  useEffect(() => {
    fetch('https://api.realworld.io/api/user', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setUser(data.user)
        console.log(data.user);
      })
      .catch(error => console.error('Error fetching user:', error));
  }, []);

  console.log(article);


  const handleDelete = () =>{
    console.log(article.article.slug);
  }

  if (!article) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <>
      <Header />
      <div className="article-page">
        <div className="">
          <div className="fluid">
            <div className=" d-block text-center text-bg-dark text-white">
              <h1 className="pt-4 pb-3">{article.article.title}</h1>

              <div className="container article-meta d-flex align-items-center gap-3 pb-4">
                <a className="d-inline-block">
                  {/* <img src={articles.author.image} alt="error" /> */}
                  <img
                    className="rounded-circle"
                    src="https://api.realworld.io/images/demo-avatar.png"
                    alt="Anah Benešová"
                  ></img>
                </a>

                <div className="info" style={{ gap: '10px' }}>
                  <a className="no-underline hover:underline hover:cursor-pointer" style={{ color: 'white' }}>
                    {/* {articles.author.username} */}{article.article.author.username}
                  </a>
                  <span className="feed-date d-block" style={{ color: '#bbb', fontSize: '0.8rem' }}>
                    {/* {formatDate(articles.updatedAt)} */}{article.article.createdAt}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="container page" style={{ marginTop: "1.5rem" }}>
            <div className="row article-content">
              <div className="col-xs-12">
                <div>
                  <p style={{ textAlign: "initial" }}>
                    {article.article.body}
                  </p>
                </div>
              </div>

              <div className="text-start">
                <ul className="tag-list d-inline-block">
                  {article.article.tagList.map((tag, index) => (
                    <li
                      key={index}
                      style={{
                        border: "1px solid #ddd",
                        color: "rgb(193, 190, 190)",
                        fontSize: "0.8rem",
                        borderRadius: "10rem",
                      }}
                      className="tag-default tag-pill tag-outline d-inline-block pt-1 pb-1 pl-2 pr-2 m-1"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-3" style={{ borderBottom: '1px solid lightGray' }}></div>

            </div>
          </div>
        </div>

        {user != undefined && user.username === article.article.author.username &&
          <div className="d-flex justify-center mt-10">
            <a
              to={`/editor/${article.slug}`}
              className="btn btn-outline-secondary btn-sm">
              <i className="ion-edit"></i> Edit Article
            </a>
            <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>
              <i className="ion-trash-a"></i> Delete Article
            </button>
          </div>
        }

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <div>
              <form
                method="POST"
                action="?/createComment"
                className="card comment-form m-5"
              >
                <div className="card-block ">
                  <textarea
                    className="form-control p-4"
                    name="comment"
                    placeholder="Write a comment..."
                    rows="3"
                  ></textarea>
                </div>

                <div className="card-footer d-flex justify-content-between align-items-center p-3" >

                  <img style={{ width: '2rem', float: 'float-start', borderRadius: '50%' }}
                    src="https://api.realworld.io/images/smiley-cyrus.jpeg"
                    className="comment-author-img d-inline-block"
                    alt="HastyAlvin"
                  ></img>
                  <button className="btn btn-sm btn-success " type="submit">
                    Post Comment
                  </button>
                </div>
              </form>
            </div>
          </div>{" "}
        </div>{" "}
      </div>
    </>
  );
};

export default ArticleDetail;
