import React from 'react';

const Transportation = () => {
  // Data for Sri Lankan Transport Options
  const transportModes = [
    {
      id: 1,
      title: "Scenic Trains",
      icon: "🚂",
      desc: "Experience the world-famous Kandy to Ella train ride. The 'Main Line' offers breathtaking views of tea plantations, waterfalls, and mountains.",
      tip: "Pro Tip: Book observation deck tickets at least 30 days in advance."
    },
    {
      id: 2,
      title: "Public Buses",
      icon: "🚌",
      desc: "The most affordable way to travel. Choose between CTB (Red) buses for reliability or Private (Blue) buses for frequency.",
      tip: "Pro Tip: For long distances, look for 'AC Intercity' buses for comfort."
    },
    {
      id: 3,
      title: "Tuk-Tuks",
      icon: "🛺",
      desc: "Perfect for short trips and last-mile connectivity. They are everywhere and offer a fun, breezy way to see the cities.",
      tip: "Pro Tip: Use metered tuks or apps to ensure a fair price."
    },
    {
      id: 4,
      title: "Ride Hailing",
      icon: "📱",
      desc: "Apps like PickMe and Uber work well in major cities like Colombo, Kandy, and Galle. They offer Tuks, Cars, and Vans.",
      tip: "Pro Tip: Great for airport transfers and safe night travel."
    }
  ];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Getting Around Sri Lanka</h1>
        <p style={styles.subtitle}>
          From scenic train journeys to convenient ride-hailing apps, here is how to navigate the island.
        </p>
      </header>

      <div style={styles.grid}>
        {transportModes.map((mode) => (
          <div key={mode.id} style={styles.card}>
            <div style={styles.icon}>{mode.icon}</div>
            <h3 style={styles.cardTitle}>{mode.title}</h3>
            <p style={styles.cardDesc}>{mode.desc}</p>
            <div style={styles.tipBox}>
              <strong>💡 {mode.tip}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Simple internal CSS styles
const styles = {
  container: {
    padding: '40px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Inter, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '50px',
  },
  title: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#666',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', // Responsive grid
    gap: '30px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    transition: 'transform 0.2s',
    border: '1px solid #eee',
  },
  icon: {
    fontSize: '3rem',
    marginBottom: '15px',
  },
  cardTitle: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    color: '#222',
  },
  cardDesc: {
    color: '#555',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
  tipBox: {
    backgroundColor: '#f0f9ff',
    padding: '10px',
    borderRadius: '8px',
    fontSize: '0.9rem',
    color: '#0066cc',
    borderLeft: '4px solid #0066cc',
  }
};

export default Transportation;
