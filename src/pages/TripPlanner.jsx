import React, { useState } from 'react';

const TripPlanner = () => {
  // --- STATE MANAGEMENT ---
  const [myPlan, setMyPlan] = useState([]);
  const [budgetLevel, setBudgetLevel] = useState('standard'); // budget, standard, luxury
  const [filter, setFilter] = useState('all');

  // --- DATA: Sri Lankan Destinations ---
  const destinations = [
    { id: 1, name: 'Sigiriya Rock', type: 'culture', days: 1, cost: 30, icon: '🦁', desc: 'Ancient palace fortress' },
    { id: 2, name: 'Ella Nine Arches', type: 'mountain', days: 2, cost: 20, icon: '🚂', desc: 'Scenic train & hiking' },
    { id: 3, name: 'Mirissa Beach', type: 'beach', days: 2, cost: 40, icon: '🏖️', desc: 'Whale watching & surf' },
    { id: 4, name: 'Yala Safari', type: 'wildlife', days: 1, cost: 60, icon: '🐆', desc: 'Leopards & elephants' },
    { id: 5, name: 'Galle Fort', type: 'culture', days: 1, cost: 10, icon: '🏰', desc: 'Dutch colonial architecture' },
    { id: 6, name: 'Arugam Bay', type: 'beach', days: 3, cost: 35, icon: '🏄', desc: 'World class surfing' },
    { id: 7, name: 'Kandy Temple', type: 'culture', days: 1, cost: 15, icon: '🛕', desc: 'Sacred Tooth Relic' },
    { id: 8, name: 'Nuwara Eliya', type: 'mountain', days: 2, cost: 25, icon: '🍵', desc: 'Tea plantations & cool climate' },
  ];

  // --- LOGIC ---
  const addToPlan = (spot) => {
    if (!myPlan.find(item => item.id === spot.id)) {
      setMyPlan([...myPlan, spot]);
    }
  };

  const removeFromPlan = (id) => {
    setMyPlan(myPlan.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    let baseCost = myPlan.reduce((acc, item) => acc + item.cost, 0);
    const multiplier = budgetLevel === 'luxury' ? 2.5 : budgetLevel === 'budget' ? 0.7 : 1;
    return Math.round(baseCost * multiplier);
  };

  const totalDays = myPlan.reduce((acc, item) => acc + item.days, 0);

  const filteredDestinations = filter === 'all' 
    ? destinations 
    : destinations.filter(d => d.type === filter);

  // --- RENDER ---
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Build Your Dream Trip 🇱🇰</h1>
        <p style={styles.subtitle}>Select your favorite spots and we'll estimate the cost!</p>
      </header>

      <div style={styles.layout}>
        {/* LEFT COLUMN: Selection Area */}
        <div style={styles.selectionArea}>
          {/* Filters */}
          <div style={styles.filterBar}>
            {['all', 'culture', 'beach', 'wildlife', 'mountain'].map(f => (
              <button 
                key={f} 
                onClick={() => setFilter(f)}
                style={{...styles.filterBtn, backgroundColor: filter === f ? '#333' : '#eee', color: filter === f ? '#fff' : '#333'}}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div style={styles.grid}>
            {filteredDestinations.map(place => (
              <div key={place.id} style={styles.card}>
                <div style={styles.cardIcon}>{place.icon}</div>
                <h3>{place.name}</h3>
                <p style={styles.cardDesc}>{place.desc}</p>
                <div style={styles.cardMeta}>
                  <span>⏱ {place.days} Days</span>
                  <span>💲 ${place.cost}</span>
                </div>
                <button 
                  onClick={() => addToPlan(place)}
                  style={styles.addBtn}
                  disabled={myPlan.find(item => item.id === place.id)}
                >
                  {myPlan.find(item => item.id === place.id) ? 'Added ✓' : 'Add to Trip +'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Itinerary Summary */}
        <div style={styles.sidebar}>
          <div style={styles.summaryBox}>
            <h2 style={styles.summaryTitle}>🎒 Your Backpack</h2>
            
            {/* Budget Toggle */}
            <div style={styles.budgetControl}>
              <label>Travel Style:</label>
              <select 
                value={budgetLevel} 
                onChange={(e) => setBudgetLevel(e.target.value)}
                style={styles.select}
              >
                <option value="budget">🎒 Backpacker</option>
                <option value="standard">🏨 Standard</option>
                <option value="luxury">👑 Luxury</option>
              </select>
            </div>

            {/* Selected Items List */}
            {myPlan.length === 0 ? (
              <p style={styles.emptyState}>Your itinerary is empty. Click items on the left to start planning!</p>
            ) : (
              <ul style={styles.planList}>
                {myPlan.map(item => (
                  <li key={item.id} style={styles.planItem}>
                    <span>{item.icon} {item.name}</span>
                    <button onClick={() => removeFromPlan(item.id)} style={styles.removeBtn}>×</button>
                  </li>
                ))}
              </ul>
            )}

            <hr style={styles.divider}/>

            {/* Totals */}
            <div style={styles.totals}>
              <div style={styles.totalRow}>
                <span>Duration:</span>
                <strong>{totalDays} Days</strong>
              </div>
              <div style={styles.totalRow}>
                <span>Est. Cost:</span>
                <strong style={{color: '#27ae60'}}>${calculateTotal()} USD</strong>
              </div>
            </div>

            <button style={styles.saveBtn} onClick={() => alert("Itinerary saved! (This would connect to a backend later)")}>
              Save Itinerary ✈️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- STYLES ---
const styles = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', fontFamily: 'Inter, sans-serif' },
  header: { textAlign: 'center', marginBottom: '40px' },
  title: { fontSize: '2.5rem', marginBottom: '10px', color: '#2c3e50' },
  subtitle: { color: '#7f8c8d' },
  layout: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }, // Responsive layout needed in CSS really, but this works for desktop
  
  // Left Side
  filterBar: { marginBottom: '20px', display: 'flex', gap: '10px' },
  filterBtn: { padding: '8px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: '500' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' },
  card: { padding: '20px', borderRadius: '12px', background: '#fff', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textAlign: 'center', transition: '0.2s' },
  cardIcon: { fontSize: '3rem', marginBottom: '10px' },
  cardDesc: { fontSize: '0.9rem', color: '#666', marginBottom: '15px', height: '40px' }, // fixed height for alignment
  cardMeta: { display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#888', marginBottom: '15px' },
  addBtn: { width: '100%', padding: '10px', background: '#3498db', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  
  // Right Side (Sidebar)
  sidebar: { position: 'sticky', top: '20px' },
  summaryBox: { background: '#f8f9fa', padding: '25px', borderRadius: '15px', border: '1px solid #e9ecef' },
  summaryTitle: { marginTop: 0, marginBottom: '20px', fontSize: '1.5rem' },
  budgetControl: { marginBottom: '20px' },
  select: { width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' },
  emptyState: { fontStyle: 'italic', color: '#999', textAlign: 'center', margin: '20px 0' },
  planList: { listStyle: 'none', padding: 0, margin: 0 },
  planItem: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' },
  removeBtn: { background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', fontSize: '1.2rem' },
  divider: { margin: '20px 0', border: 0, borderTop: '1px solid #ddd' },
  totals: { marginBottom: '20px' },
  totalRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '1.1rem' },
  saveBtn: { width: '100%', padding: '15px', background: '#27ae60', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }
};

export default TripPlanner;