import React from 'react';

const Transportation = () => {
  const transportModes = [
    {
      id: 1,
      title: "Scenic Trains",
      icon: "🚂",
      desc: "The Kandy to Ella train is famous worldwide. Book 'Observation Saloon' or 'First Class' for the best views.",
      cost: "Rs. 1,200 - 3,000 ($4 - $10)",
      action: "Book via Railway.gov.lk",
      link: "https://seatreservation.railway.gov.lk/"
    },
    {
      id: 2,
      title: "Highway Buses",
      icon: "🚌",
      desc: "Fast and air-conditioned. Use the 'Makumbura Multimodal Center' (MMC) for highway buses to Galle and Matara.",
      cost: "Rs. 900 - 1,500 ($3 - $5)",
      action: "Check Schedules",
      link: "https://ntc.gov.lk/"
    },
    {
      id: 3,
      title: "PickMe & Uber",
      icon: "🚗",
      desc: "The safest way to travel within cities. You get a fixed price before you ride, so no bargaining is needed.",
      cost: "Rs. 100 - 150 per km",
      action: "Download PickMe",
      link: "https://pickme.lk/"
    }
  ];

  const commonRoutes = [
    { id: 1, route: "Colombo ➝ Kandy", time: "3.5 Hours (Train)", price: "Rs. 1,500" },
    { id: 2, route: "Colombo ➝ Galle", time: "1.5 Hours (Highway Bus)", price: "Rs. 1,100" },
    { id: 3, route: "Kandy ➝ Ella", time: "6 Hours (Scenic Train)", price: "Rs. 2,000" },
    { id: 4, route: "Airport ➝ Colombo", time: "45 Mins (Taxi)", price: "Rs. 5,500" },
  ];

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <header style={styles.header}>
        <h1 style={styles.title}>Transport in Sri Lanka</h1>
        <p style={styles.subtitle}>Navigate the island like a local with these options.</p>
      </header>

      {/* Main Options Grid */}
      <div style={styles.grid}>
        {transportModes.map((mode) => (
          <div key={mode.id} style={styles.card}>
            <div style={styles.icon}>{mode.icon}</div>
            <h3 style={styles.cardTitle}>{mode.title}</h3>
            <p style={styles.cardDesc}>{mode.desc}</p>
            <div style={styles.priceTag}>💰 Avg Cost: {mode.cost}</div>
            <a href={mode.link} target="_blank" rel="noopener noreferrer" style={styles.button}>
              {mode.action} →
            </a>
          </div>
        ))}
      </div>

      {/* Popular Routes Table */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>📅 Popular Route Estimates</h2>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>Route</th>
                <th style={styles.th}>Travel Mode & Time</th>
                <th style={styles.th}>Avg Price</th>
              </tr>
            </thead>
            <tbody>
              {commonRoutes.map((route) => (
                <tr key={route.id} style={styles.tableRow}>
                  <td style={styles.td}><strong>{route.route}</strong></td>
                  <td style={styles.td}>{route.time}</td>
                  <td style={styles.td}>{route.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '40px 20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'Inter, sans-serif', color: '#333' },
  header: { textAlign: 'center', marginBottom: '40px' },
  title: { fontSize: '2.5rem', marginBottom: '10px', color: '#2c3e50' },
  subtitle: { fontSize: '1.1rem', color: '#7f8c8d' },
  
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', marginBottom: '60px' },
  card: { background: '#fff', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #eee', transition: '0.3s' },
  icon: { fontSize: '3rem', marginBottom: '15px' },
  cardTitle: { fontSize: '1.4rem', marginBottom: '10px' },
  cardDesc: { color: '#666', lineHeight: '1.5', marginBottom: '15px' },
  priceTag: { background: '#e3f2fd', color: '#1565c0', padding: '5px 10px', borderRadius: '5px', fontSize: '0.9rem', display: 'inline-block', marginBottom: '15px' },
  button: { display: 'block', width: '100%', padding: '10px', background: '#2c3e50', color: '#fff', textAlign: 'center', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' },
  
  section: { marginTop: '40px' },
  sectionTitle: { fontSize: '1.8rem', marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '10px' },
  tableWrapper: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' },
  tableHeader: { background: '#f8f9fa', textAlign: 'left' },
  th: { padding: '15px', fontSize: '1rem', color: '#555' },
  tableRow: { borderBottom: '1px solid #eee' },
  td: { padding: '15px', fontSize: '0.95rem' }
};

export default Transportation;