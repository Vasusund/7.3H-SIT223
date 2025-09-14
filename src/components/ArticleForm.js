// src/components/ArticleForm.js
import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

function ArticleForm() {
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [text, setText] = useState('');
  const [tags, setTags] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'articles'), {
        title,
        abstract,
        text,
        tags,
        imageURL,
        createdAt: serverTimestamp()
      });
      alert('Article posted!');
      setTitle('');
      setAbstract('');
      setText('');
      setTags('');
      setImageFile(null);
      setImageURL('');
    } catch (err) {
      console.error(err);
      alert('Error posting article');
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) setImageFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!imageFile) {
      alert('Please choose an image first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'react_upload'); //I am using cloudinary to make the url for the pic and dstore in firestore database

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dfkzglzrp/image/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      setImageURL(data.secure_url);
      alert('Image uploaded successfully!');
    } catch (err) {
      console.error(err);
      alert('Error uploading image');
    }
  };

  return (
    <div>
      <h3>Share your Article</h3>
      <div className="ui form">

        {/* Title */}
        <div className="field">
          <label>Title</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter a descriptive title"
          />
        </div>

       
        <div className="field">
          <label>Upload Image</label>
          
          <input
            type="text"
            readOnly
            value={imageFile ? imageFile.name : 'No file chosen'}
            style={{
              width: '100%',
              height: '38px',
              padding: '6px 10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              boxSizing: 'border-box',
              marginBottom: '5px',
            }}
            onClick={() => document.getElementById('hidden-file-input').click()}
          />
          
          <input
            id="hidden-file-input"
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          
          <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
            <button
              type="button"
              onClick={handleUpload}
              style={{
                padding: '10px 17px',
                borderRadius: '4px',
                backgroundColor: '#2185d0',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              UPLOAD
            </button>
            <button
              type="button"
              onClick={() => document.getElementById('hidden-file-input').click()}
              style={{
                padding: '8px 15px',
                borderRadius: '4px',
                backgroundColor: '#44c880',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              BROWSE
            </button>
          </div>
          {imageURL && (
            <div style={{ color: 'green', marginTop: '5px' }}>
              Image uploaded! URL will be saved in database.
            </div>
          )}
        </div>

        
        <div className="field">
          <label>Abstract</label>
          <textarea
            value={abstract}
            onChange={e => setAbstract(e.target.value)}
            placeholder="1 paragraph abstract"
          />
        </div>

       
        <div className="field">
          <label>Article Text</label>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Write your article"
          />
        </div>

       
        <div className="field">
          <label>Tags</label>
          <input
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="Add tags"
          />
        </div>

        <button className="ui button primary" onClick={handleSubmit}>
          Post
        </button>
      </div>
    </div>
  );
}

export default ArticleForm;
