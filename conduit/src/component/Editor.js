import React, { useState } from 'react';
import Header from './Home/Header';
import { useEffect } from 'react';

const Editor = () => {
  // Khởi tạo các trạng thái sử dụng useState
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tagList, setTagList] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('userToken'));
  const [user, setUser] = useState();

  //get user data
  useEffect(() => {
    fetch('https://api.realworld.io/api/user',{
      method: 'GET',
      headers:{
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
    // const article = {
    //   title,
    //   description,
    //   body,
    //   tagList
    // };
    e.preventDefault();
    try {
      const res = await fetch('https://node-express-conduit.appspot.com/api/articles', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          article: {
            title,
            description,
            body,
            tagList
          }
        })
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="editor-page">
      <Header />
      <div className="container page">
        <div className="row p-4">
          <div className="col-md-10 offset-md-1 col-xs-12 ">
            <form>
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
                  type="button"
                  onClick={submitForm}
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
};

export default Editor;
