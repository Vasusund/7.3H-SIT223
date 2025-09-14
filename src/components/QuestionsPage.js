import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [filterTitle, setFilterTitle] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newTag, setNewTag] = useState('');

  const fetchQuestions = async () => {
    const querySnapshot = await getDocs(collection(db, 'questions'));
    const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setQuestions(list);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'questions', id));
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const handleAdd = async () => {
    if (!newTitle || !newDescription) return;
    const newQ = {
      title: newTitle,
      description: newDescription,
      tags: newTag,
      createdAt: serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, 'questions'), newQ);
    setQuestions(prev => [...prev, { id: docRef.id, ...newQ }]);
    setNewTitle('');
    setNewDescription('');
    setNewTag('');
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const filteredQuestions = questions.filter(q => {
    const matchesTitle = q.title?.toLowerCase().includes(filterTitle.toLowerCase());
    const matchesTag = filterTag ? q.tags?.toLowerCase().includes(filterTag.toLowerCase()) : true;
    const matchesDate = filterDate
      ? new Date(q.createdAt?.toDate()).toLocaleDateString() === new Date(filterDate).toLocaleDateString()
      : true;
    return matchesTitle && matchesTag && matchesDate;
  });

  return (
    <div className="page-container">
      <div className="content-wrap">
        <h2 className="page-title">Find Questions</h2>

        <div className="filters">
          <input
            type="text"
            placeholder="Filter by Title"
            value={filterTitle}
            onChange={(e) => setFilterTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Filter by Tag"
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
          />
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>

        {/* Add Question Section */}
        <div className="add-question">
          <h3>Add New Question</h3>
          <input
            type="text"
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
          <button className="add-btn" onClick={handleAdd}>Add Question</button>
        </div>

        <div className="questions-grid">
          {filteredQuestions.map(q => (
            <QuestionCard key={q.id} question={q} onDelete={handleDelete} />
          ))}
        </div>
      </div>

      <footer className="footer">
        <p>© 2025 DEV@Deakin – All rights reserved</p>
      </footer>
    </div>
  );
}

function QuestionCard({ question, onDelete }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="question-card">
      <h4>{question.title}</h4>
      {expanded ? (
        <>
          
          <ReactMarkdown
            children={question.description}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>{children}</code>
                );
              }
            }}
          />

          <p><strong>Tags:</strong> {question.tags}</p>
          <p><strong>Date:</strong> {question.createdAt?.toDate().toLocaleString()}</p>
          <button className="secondary-btn" onClick={() => setExpanded(false)}>Show Less</button>
        </>
      ) : (
        <button className="secondary-btn" onClick={() => setExpanded(true)}>View Details</button>
      )}
      <button className="delete-btn" onClick={() => onDelete(question.id)}>Delete</button>
    </div>
  );
}

export default QuestionsPage;
