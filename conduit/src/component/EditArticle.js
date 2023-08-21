import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Home/Header";
import axios from "axios";
import { useEffect } from "react";
import Page404 from "./404Page/404Page";

const EditArticle = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [body, setBody] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [tagList, setTagList] = useState([]);
    const [article, setArticle] = useState()
    const [token, setToken] = useState(localStorage.getItem('userToken'));
    const { slug } = useParams();
    const nav = useNavigate();

    
    useEffect(() => {
        fetch(`https://api.realworld.io/api/articles/${slug}`)
        .then(response => response.json())
        .then(data => {
            setArticle(data);
            setTitle(data.article.title);
            setDescription(data.article.description);
            setBody(data.article.body);
            setTagList([...data.article.tagList])
        })
        .catch(error => console.error('Error fetching articles:', error));
    }, [])
    
    if(!token){
        return(
            <Page404/>
        )
    }

    if (!article) {
        return (
            <div>Loading...</div>
        )
    }
    console.log(article);

    // Hàm xử lý sự kiện thay đổi tiêu đề
    const changeTitle = event => {
        setTitle(event.target.value);
    };

    // Hàm xử lý sự kiện thay đổi mô tả
    const changeDescription = event => {
        setDescription(event.target.value);
    };

    // Hàm xử lý sự kiện thay đổi nội dung bài viết
    const changeBody = event => {
        setBody(event.target.value);
    };

    // Hàm xử lý sự kiện thay đổi trường nhập tag
    const changeTagInput = event => {
        setTagInput(event.target.value);
    };

    // Hàm xử lý sự kiện nhấn phím Enter để thêm tag
    const watchForEnter = ev => {
        if (ev.keyCode === 13) {
            ev.preventDefault();
            addTag();
        }
    };

    // Hàm thêm tag vào danh sách tag
    const addTag = () => {
        if (!tagInput) return;
        setTagList([...tagList, tagInput]);
        setTagInput('');
    };

    // Hàm xử lý sự kiện loại bỏ tag
    const removeTagHandler = tag => {
        setTagList(tagList.filter(item => item !== tag));
    };

    // Hàm xử lý sự kiện nhấn nút "Publish Article"
    const submitForm = async e => {
        e.preventDefault();
        axios.put(
            `https://api.realworld.io/api/articles/${slug}`,
            {
                article: {
                    title: title,
                    description: description,
                    body: body,
                    tagList: tagList,
                },
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    article: {
                        title: title,
                        description: description,
                        body: body,
                        tagList: tagList,
                    }
                })
            }
        )
            .then((res) => {
                console.log(res);
                nav('/')
                // console.log(res.data.errors);
            })
            .catch((error) => {
                console.error('Error publishing article:', error);
            });
    };

    return (
        <div className="editor-page">
            <Header />
            <div className="container page">
                <div className="row p-4">
                    <div className="col-md-10 offset-md-1 col-xs-12 ">
                        <form onSubmit={submitForm}>
                            <fieldset>
                                <fieldset className="form-group p-2">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Article Title"
                                        value={title}
                                        onChange={changeTitle}
                                    />
                                </fieldset>
                                <fieldset className="form-group p-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="What's this article about?"
                                        value={description}
                                        onChange={changeDescription}
                                    />
                                </fieldset>
                                <fieldset className="form-group p-2">
                                    <textarea
                                        className="form-control"
                                        rows="8"
                                        placeholder="Write your article (in markdown)"
                                        value={body}
                                        onChange={changeBody}
                                    ></textarea>
                                </fieldset>
                                <fieldset className="form-group p-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter tags"
                                        value={tagInput}
                                        onChange={changeTagInput}
                                        onKeyUp={watchForEnter}
                                    />
                                    <div className="tag-list">
                                        {tagList.map(tag => (
                                            <span className="tag-default tag-pill" key={tag}>
                                                <i
                                                    className="ion-close-round"
                                                    onClick={() => removeTagHandler(tag)}
                                                ></i>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </fieldset>
                                <button
                                    className="btn btn-lg pull-xs-right btn-success my-3 "
                                    type="submit"

                                >
                                    Publish Article
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditArticle