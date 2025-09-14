import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import ReactMarkdown from 'react-markdown';

function QuestionForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState(''); // <-- added tags state

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'questions'), {
        title,
        description,
        tags, // <-- save tags in Firebase
        createdAt: serverTimestamp()
      });
      alert('Question posted!');
      setTitle('');
      setDescription('');
      setTags(''); // <-- reset tags
    } catch (err) {
      console.error(err);
      alert('Error posting question');
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', padding: '20px' }}>
      <h3>Ask a Question</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Start your question with how, what, why"
          />
        </div>

        <div>
          <label>Description / Code (Markdown & Code Supported)</label>
          <CodeMirror
            value={description}
            height="200px"
            extensions={[javascript()]}
            theme={oneDark}
            onChange={(value) => setDescription(value)}
          />
        </div>

        <div style={{ marginTop: '10px' }}>
          <label>Tags (comma separated)</label>
          <input
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g., javascript, react, firebase"
          />
        </div>

        <div style={{ marginTop: '10px' }}>
          <h4>Preview:</h4>
          <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '6px', background: '#f9f9f9' }}>
            <ReactMarkdown>{description}</ReactMarkdown>
          </div>
        </div>

        <button
          type="submit"
          style={{
            marginTop: '20px',
            padding: '10px 25px',
            backgroundColor: '#44c880',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default QuestionForm;
