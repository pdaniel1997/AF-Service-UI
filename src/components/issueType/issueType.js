import React from 'react';

const IssueCard = ({ title, url, mfa }) => {
  return (
    <div style={styles.card}>
      {/* Display MFA on the top right of the card */}
      <div style={{ ...styles.mfa, position: 'absolute', top: '10px', right: '10px', marginBottom: '10px', padding: '0.3rem 0.6rem', fontSize: '0.8rem', backgroundColor: '#EEEEEE' }}>
        MFA:
        <span style={{ color: '#E47200', fontWeight: 'bold' }}> {mfa}</span> 
      </div>
      <h3 style={styles.title}>{title}</h3>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <button style={styles.button}>Create Issue</button>
      </a>
    </div>
  );
};

const styles = {
  card: {
    position: 'relative',
    border: '1px solid #ccc',
    padding: '1rem',
    marginBottom: '1rem',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  title: {
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#1D2C49',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default IssueCard;
