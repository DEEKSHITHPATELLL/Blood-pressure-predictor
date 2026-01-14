import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';

const AiSuggestion = () => {
  const location = useLocation();
  const prediction = location.state?.prediction || 'Unknown';
  const [suggestions, setSuggestions] = useState('');
  const [loading, setLoading] = useState(true);

  const removeSpecialCharacters = (text) => {
    if (!text) return '';

    return text
      .replace(/[^\x00-\x7F]/g, '')

      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')

      .replace(/^\s*[-•]\s+/gm, '')

      .replace(/\s{2,}/g, ' ')

      .replace(/\n{3,}/g, '\n\n')

      .trim();
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const genAI = new GoogleGenerativeAI(`
          ${import.meta.env.VITE_GEMINI_API_KEY}
       `);
        const model = genAI.getGenerativeModel({
          model: 'gemini-2.5-flash'
        });

        const prompt = `Based on the blood pressure prediction of "${prediction}", provide polite and helpful suggestions on how to manage or control blood pressure. Include steps to take, lifestyle changes, and any general advice. Keep it concise and encouraging.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        setSuggestions(removeSpecialCharacters(text));
      } catch (error) {
        console.error('Error fetching AI suggestions:', error);
        setSuggestions(
          'Sorry, unable to fetch suggestions at the moment. Please consult a healthcare professional.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [prediction]);

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '50px auto',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 1, 10, 0.1)',
        fontFamily: 'Arial, sans-serif',
        color: 'white',
        backgroundColor: '#333'
      }}
    >
      <h2 style={{ textAlign: 'center' }}>
        AI Suggestions for {prediction} Blood Pressure
      </h2>

      {loading ? (
        <p>Loading suggestions...</p>
      ) : (
        <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
          {suggestions}
        </div>
      )}

      <button
        onClick={() => window.history.back()}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Back to Prediction
      </button>
    </div>
  );
};

export default AiSuggestion;
