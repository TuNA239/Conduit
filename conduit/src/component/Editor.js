import React, { useState } from 'react';

const Editor = () => {
 // Khởi tạo các trạng thái sử dụng useState
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tagList, setTagList] = useState([]);

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
const submitForm = () => {
    const article = {
      title,
      description,
      body,
      tagList
    };

    // Simulating the promise without agent
    const promise = new Promise((resolve, reject) => {
      // Simulate API call success
      setTimeout(() => {
        resolve(); // Assuming success
      }, 1000);
    });

    // Handle the promise and any success/error logic here
    promise
      .then(() => {
        // Handle success
        console.log('Article created successfully');
      })
      .catch(error => {
        // Handle error
        console.error('Error creating article:', error);
      });
  };

  return (
    <div class="editor-page">
      <div class="container page">
        <div class="row p-4">
          <div class="col-md-10 offset-md-1 col-xs-12 ">
            <form>
              <fieldset>
                <fieldset class="form-group p-2">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Article Title"
                    value={title}
                    onChange={changeTitle}
                  />
                </fieldset>
                <fieldset class="form-group p-2">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="What's this article about?"
                    value={description}
                    onChange={changeDescription}
                  />
                </fieldset>
                <fieldset class="form-group p-2">
                  <textarea
                    class="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    value={body}
                    onChange={changeBody}
                  ></textarea>
                </fieldset>
                <fieldset class="form-group p-2">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter tags"
                    value={tagInput}
                    onChange={changeTagInput}
                    onKeyUp={watchForEnter}
                  />
                  <div class="tag-list">
                    {tagList.map(tag => (
                      <span class="tag-default tag-pill" key={tag}>
                        <i
                          class="ion-close-round"
                          onClick={() => removeTagHandler(tag)}
                        ></i>
                        {tag}
                      </span>
                    ))}
                  </div>
                </fieldset>
                <button
                  class="btn btn-lg pull-xs-right btn-success my-3 "
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
