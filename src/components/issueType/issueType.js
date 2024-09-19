import React from 'react';

const IssueCard = ({ title, url, mfa, team }) => {
  return (
    <div style={styles.card}>
      {/* Display MFA at the top */}
      <div style={styles.mfa}>
        MFA: <span style={styles.highlight}>{mfa}</span>
      </div>
      
      {/* Main content of the card */}
      <h3 style={styles.title}>{title}</h3>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <button style={styles.button}>Create Issue</button>
      </a>

      {/* Display Team at the bottom */}
      <div style={styles.team}>
        Team: <span style={styles.highlight}>{team}</span>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#fff',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    boxSizing: 'border-box', // Ensures padding is inside the card
    border: '1px solid #ccc',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    alignItems: 'center'
  },
  mfa: {
    fontSize: '0.9rem',
    padding: '0.3rem 0.6rem',
    backgroundColor: '#EEEEEE',
    borderRadius: '5px',
    alignSelf: 'flex-end',
  },
  team: {
    fontSize: '0.9rem',
    padding: '0.3rem 0.6rem',
    backgroundColor: '#EEEEEE',
    borderRadius: '5px',
    alignSelf: 'flex-end', // Positions at the bottom
    marginTop: 'auto', // Pushes the team section to the bottom
  },
  highlight: {
    color: '#E47200',
    fontWeight: 'bold',
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
    marginBottom: '1rem'
  },
};

export default IssueCard;
