import { useEffect, useState } from 'react';
import { getLatestAnswer, submitAnswer } from './apiFile/api';

function App() {
  const [answer, setAnswer] = useState<string>('Loading...');
  const [input, setInput] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  // Load latest answer on initial render
  useEffect(() => {
    const loadAnswer = async () => {
      try {
        const latest = await getLatestAnswer();
        setAnswer(latest);
      } catch (error) {
        console.error('Failed to load answer:', error);
        setAnswer('Error fetching data.');
      }
    };

    loadAnswer();
  }, []);

  // Handler for submitting new answer
  const handleSubmit = async () => {
    if (!input.trim()) {
      setStatus('Please enter some text.');
      return;
    }

    try {
      await submitAnswer(input);
      setStatus('Answer submitted successfully.');
      setInput(''); // clear input field

      const latest = await getLatestAnswer(); // refresh latest answer
      setAnswer(latest);
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('Failed to submit answer.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Latest Answer</h1>
      <p>The most recent data sent to the backend is:</p>
      <span id="answer">{answer}</span>

      <div style={{ marginTop: '2rem' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your answer here"
          style={{ padding: '0.5rem', width: '300px' }}
        />
        <button
          onClick={handleSubmit}
          style={{ padding: '0.5rem 1rem', marginLeft: '1rem' }}
        >
          Submit
        </button>
      </div>

      {status && <p style={{ marginTop: '1rem' }}>{status}</p>}
    </div>
  );
}

export default App;
