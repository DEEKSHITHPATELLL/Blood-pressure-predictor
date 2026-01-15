import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

function App() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('bpFormData');
    return savedData ? JSON.parse(savedData) : {
      Age: '',
      Gender: '',
      BMI: '',
      SystolicBP: '',
      DiastolicBP: '',
      HeartRate: '',
      Diabetes: '',
      Cholesterol: '',
      Smoking: '',
      Alcohol: '',
      PhysicalActivity: '',
      StressLevel: '',
      SleepHours: ''
    };
  });
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState(() => {
    const savedPrediction = localStorage.getItem('bpPrediction');
    return savedPrediction || '';
  });

  useEffect(() => {
    localStorage.setItem('bpFormData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('bpPrediction', prediction);
  }, [prediction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setPrediction('');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        // Show ECG for 5 seconds before showing prediction
        setTimeout(() => {
          setPrediction(result.prediction);
          setIsLoading(false);
        }, 5000);
      } else {
        alert(`Error: ${result.error}`);
        setIsLoading(false);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
      setIsLoading(false);
    }
  };

  const formStyle = {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 1, 10, 0.1)',
    fontFamily: 'Arial, sans-serif',
    color: 'white'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
    color: 'rgba(246, 247, 250, 1)'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    border: '2px solid purple',
    borderRadius: '10px',
    fontSize: '16px',
    boxSizing: 'border-box',
    height: '50px',
    boxShadow: '0 0 10px purple'
  };

  const selectStyle = {
    ...inputStyle
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100%'
  };

  const buttonHoverStyle = {
    backgroundColor: '#45a049'
  };

  return (
    <div style={formStyle}>
      <h2 style={{ textAlign: 'center', color: 'white' }}>Blood pressure predictor</h2>
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Age:</label>
        <input
          type="number"
          name="Age"
          value={formData.Age}
          onChange={handleChange}
          style={inputStyle}
          min="1"
          step="1"
          required
        />

        <label style={labelStyle}>Gender:</label>
        <select
          name="Gender"
          value={formData.Gender}
          onChange={handleChange}
          style={selectStyle}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label style={labelStyle}>BMI:</label>
        <input
          type="number"
          step="1"
          name="BMI"
          value={formData.BMI}
          onChange={handleChange}
          style={inputStyle}
          min="0"
          required
        />

        <label style={labelStyle}>Systolic BP:</label>
        <input
          type="number"
          name="SystolicBP"
          value={formData.SystolicBP}
          onChange={handleChange}
          style={inputStyle}
          min="0"
          step="1"
          required
        />

        <label style={labelStyle}>Diastolic BP:</label>
        <input
          type="number"
          name="DiastolicBP"
          value={formData.DiastolicBP}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <label style={labelStyle}>Heart Rate:</label>
        <input
          type="number"
          name="HeartRate"
          value={formData.HeartRate}
          onChange={handleChange}
          style={inputStyle}
          min="0"
          step="1"
          required
        />

        <label style={labelStyle}>Diabetes:</label>
        <select
          name="Diabetes"
          value={formData.Diabetes}
          onChange={handleChange}
          style={selectStyle}
          required
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <label style={labelStyle}>Cholesterol:</label>
        <select
          name="Cholesterol"
          value={formData.Cholesterol}
          onChange={handleChange}
          style={selectStyle}
          required
        >
          <option value="">Select</option>
          <option value="Normal">Normal</option>
          <option value="High">High</option>
        </select>

        <label style={labelStyle}>Smoking:</label>
        <select
          name="Smoking"
          value={formData.Smoking}
          onChange={handleChange}
          style={selectStyle}
          required
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <label style={labelStyle}>Alcohol:</label>
        <select
          name="Alcohol"
          value={formData.Alcohol}
          onChange={handleChange}
          style={selectStyle}
          required
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <label style={labelStyle}>Physical Activity:</label>
        <select
          name="PhysicalActivity"
          value={formData.PhysicalActivity}
          onChange={handleChange}
          style={selectStyle}
          required
        >
          <option value="">Select</option>
          <option value="Low">Low</option>
          <option value="Moderate">Moderate</option>
          <option value="High">High</option>
        </select>

        <label style={labelStyle}>Stress Level:</label>
        <select
          name="StressLevel"
          value={formData.StressLevel}
          onChange={handleChange}
          style={selectStyle}
          required
        >
          <option value="">Select</option>
          <option value="Low">Low</option>
          <option value="Moderate">Moderate</option>
          <option value="High">High</option>
        </select>

        <label style={labelStyle}>Sleep Hours:</label>
        <input
          type="number"
          step="0.1"
          name="SleepHours"
          value={formData.SleepHours}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
        >
          Submit
        </button>
       {isLoading && (
  <div style={{ marginTop: '25px', textAlign: 'center' }}>
    <svg
      className="ecg-svg"
      viewBox="0 0 600 120"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="ecg-path"
        d="
          M 0 60
          L 50 60
          Q 65 40 80 60
          L 100 60
          L 110 90
          L 120 20
          L 130 90
          L 140 60
          L 180 60
          Q 210 40 240 60
          L 300 60
          Q 315 40 330 60
          L 350 60
          L 360 90
          L 370 20
          L 380 90
          L 390 60
          L 450 60
          Q 480 40 510 60
          L 600 60
        "
      />
    </svg>
    <div className="prediction-text">Predicting...</div>
  </div>
)}

      </form>
      {prediction && !isLoading && (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
  <div style={{ fontSize: '100px' }}>
    {prediction === 'High'
      ? '❤️'   // Red heart
      : prediction === 'Low'
      ? '💜'   // Purple heart
      : prediction === 'Normal'
      ? '💚'   // Green heart
      : '🤍'}
  </div>

  <p style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
    Prediction: {prediction}
  </p>

    <div style={{ marginTop: '20px' }}>
    <button
      onClick={() => navigate('/ai-suggestion', { state: { prediction, formData } })}
      style={{
        backgroundColor: '#007bff',
        color: 'white',
        padding: '12px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        marginRight: '10px'
      }}
    >
      🤖 Get AI Suggestions
    </button>
    <button
      onClick={() => navigate('/doctors')}
      style={{
        backgroundColor: '#28a745',
        color: 'white',
        padding: '12px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px'
      }}
    >
      👨‍⚕️ Get Doctor Consult
    </button>
  </div>
</div>

      )}
    </div>
  );
}

export default App
