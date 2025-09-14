import React, { useState } from 'react';
import QuestionForm from './QuestionForm';
import ArticleForm from './ArticleForm';
import '../PostForm.css';

function PostForm() {
  const [postType, setPostType] = useState('question');

  return (
    <div className="post-page-container">
      <div className="ui container post-container">
        <div className="post-header">
          <h1>New Post</h1>
          <div className="post-type-selector">
            <label>
              <input
                type="radio"
                value="question"
                checked={postType === 'question'}
                onChange={() => setPostType('question')}
              />
              Question
            </label>
            <label>
              <input
                type="radio"
                value="article"
                checked={postType === 'article'}
                onChange={() => setPostType('article')}
              />
              Article
            </label>
          </div>
        </div>

        <div className="post-form-wrapper">
          {postType === 'question' ? <QuestionForm /> : <ArticleForm />}
        </div>
      </div>
    </div>
  );
}

export default PostForm;
