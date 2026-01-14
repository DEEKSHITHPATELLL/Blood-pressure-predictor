import React, { useState } from 'react';

const Doctors = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [disabledDoctors, setDisabledDoctors] = useState(new Set());

  const doctors = [
    {
      id: 1,
      name: 'Dr. Rajesh Sharma',
      specialty: 'Cardiologist',
      experience: '15 years',
      details: 'Specializes in hypertension and cardiovascular health.',
      image: 'https://www.marengoasiahospitals.com/static/uploads/de4636bd-ae01-490a-9c34-6348983f871a-1689751152610.jpg'
    },
    {
      id: 2,
      name: 'Dr. Priya Singh',
      specialty: 'Internal Medicine',
      experience: '12 years',
      details: 'Expert in managing chronic conditions like high blood pressure.',
      image: 'https://media.licdn.com/dms/image/v2/D5603AQH2QzIpwg0Eug/profile-displayphoto-scale_200_200/B56ZsoD_88JoAc-/0/1765903697852?e=2147483647&v=beta&t=2p8x425zIPkC1FiAx3gCigMySeK1SDEinlsXXzn2jHE'
    },
    {
      id: 3,
      name: 'Dr. Amit Kumar',
      specialty: 'Nephrologist',
      experience: '10 years',
      details: 'Focuses on kidney-related issues affecting blood pressure.',
      image: 'https://phoenixhospital.ae/wp-content/uploads/2022/06/amith-kumar-e1691575020416.jpg'
    },
    {
      id: 4,
      name: 'Dr. Sunita Patel',
      specialty: 'Endocrinologist',
      experience: '18 years',
      details: 'Handles hormonal imbalances impacting blood pressure.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREVPMIqOvBjAnz0PBs4tdyr8x5d0D1NMuI7w&s'
    },
    {
      id: 5,
      name: 'Dr. Vikram Rao',
      specialty: 'Hypertension Specialist',
      experience: '14 years',
      details: 'Dedicated to blood pressure management and lifestyle counseling.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4oYHHf3vPId_Cs1AfjV0vtyWOxiG-UO-Onw&s'
    }
  ];

  const getRandomAppointment = () => {
    const days = ['today', 'tomorrow', 'day after tomorrow'];
    const randomDay = days[Math.floor(Math.random() * days.length)];
    const hours = Math.floor(Math.random() * 8) + 9; // 9 AM to 5 PM
    const minutes = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, 45
    const time = `${hours}:${minutes.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
    return `Your appointment is on ${randomDay} at ${time}`;
  };

  const handleConnect = (doctorId) => {
    setDisabledDoctors(prev => new Set(prev).add(doctorId));
    alert(getRandomAppointment());
  };

  const containerStyle = {
    maxWidth: '800px',
    margin: '50px auto',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 1, 10, 0.1)',
    fontFamily: 'Arial, sans-serif',
    color: 'white',
    backgroundColor: '#333'
  };

  const doctorCardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    backgroundColor: '#444'
  };

  const buttonStyle = (isDisabled) => ({
    backgroundColor: isDisabled ? '#6c757d' : '#28a745',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    fontSize: '14px'
  });

  const backButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#007bff',
    marginTop: '20px'
  };

  const imageStyle = (isHovered) => ({
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    marginBottom: '10px',
    cursor: 'pointer',
    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
    transition: 'transform 0.3s ease'
  });

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center' }}>Consult a Doctor</h2>
      <p style={{ textAlign: 'center', marginBottom: '30px' }}>
        Here are some specialists related to blood pressure management. Click "Get Connected" to schedule an appointment.
      </p>
      {doctors.map(doctor => (
        <div key={doctor.id} style={doctorCardStyle}>
          <img src={doctor.image} alt={doctor.name} style={imageStyle(hoveredId === doctor.id)} onMouseEnter={() => setHoveredId(doctor.id)} onMouseLeave={() => setHoveredId(null)} />
          <h3>{doctor.name}</h3>
          <p><strong>Specialty:</strong> {doctor.specialty}</p>
          <p><strong>Experience:</strong> {doctor.experience}</p>
          <p>{doctor.details}</p>
          <button style={buttonStyle(disabledDoctors.has(doctor.id))} onClick={() => handleConnect(doctor.id)} disabled={disabledDoctors.has(doctor.id)}>
            {disabledDoctors.has(doctor.id) ? 'Connected' : 'Get Connected'}
          </button>
        </div>
      ))}
      <button style={backButtonStyle} onClick={() => window.history.back()}>
        Back to Prediction
      </button>
    </div>
  );
};

export default Doctors;
