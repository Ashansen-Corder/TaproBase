import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Hotel, Users, Plus, X, Clock, Star, Download, Share2, Save } from 'lucide-react';
import { attractions } from '../data/attractions';
import { accommodations } from '../data/accommodations';
import { guides } from '../data/guides';
import toast from 'react-hot-toast';
import './TripPlanner.css';

const TripPlanner = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [activeTab, setActiveTab] = useState('attractions');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [itineraryDays, setItineraryDays] = useState([]);

  // Calculate trip duration
  const calculateDays = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays > 0 ? diffDays : 0;
    }
    return 0;
  };

  const days = calculateDays();

  // Generate itinerary days
  React.useEffect(() => {
    if (days > 0) {
      const newDays = [];
      const start = new Date(startDate);
      for (let i = 0; i < days; i++) {
        const currentDate = new Date(start);
        currentDate.setDate(start.getDate() + i);
        newDays.push({
          date: currentDate.toISOString().split('T')[0],
          dayNumber: i + 1,
          attractions: [],
          accommodation: null,
          guide: null
        });
      }
      setItineraryDays(newDays);
    }
  }, [startDate, endDate, days]);

  // Add attraction to itinerary
  const addAttraction = (attraction, dayIndex) => {
    if (!startDate || !endDate) {
      toast.error('Please select your trip dates first!');
      return;
    }
    
    const updatedDays = [...itineraryDays];
    if (!updatedDays[dayIndex].attractions.find(a => a.id === attraction.id)) {
      updatedDays[dayIndex].attractions.push(attraction);
      setItineraryDays(updatedDays);
      toast.success(`${attraction.name} added to Day ${dayIndex + 1}`);
    } else {
      toast.error('Attraction already added to this day');
    }
  };

  // Add accommodation to day
  const addAccommodation = (accommodation, dayIndex) => {
    if (!startDate || !endDate) {
      toast.error('Please select your trip dates first!');
      return;
    }
    
    const updatedDays = [...itineraryDays];
    updatedDays[dayIndex].accommodation = accommodation;
    setItineraryDays(updatedDays);
    toast.success(`${accommodation.name} added to Day ${dayIndex + 1}`);
  };

  // Add guide to day
  const addGuide = (guide, dayIndex) => {
    if (!startDate || !endDate) {
      toast.error('Please select your trip dates first!');
      return;
    }
    
    const updatedDays = [...itineraryDays];
    updatedDays[dayIndex].guide = guide;
    setItineraryDays(updatedDays);
    toast.success(`${guide.name} added to Day ${dayIndex + 1}`);
  };

  // Remove item from itinerary
  const removeAttraction = (dayIndex, attractionId) => {
    const updatedDays = [...itineraryDays];
    updatedDays[dayIndex].attractions = updatedDays[dayIndex].attractions.filter(
      a => a.id !== attractionId
    );
    setItineraryDays(updatedDays);
    toast.success('Attraction removed');
  };

  const removeAccommodation = (dayIndex) => {
    const updatedDays = [...itineraryDays];
    updatedDays[dayIndex].accommodation = null;
    setItineraryDays(updatedDays);
    toast.success('Accommodation removed');
  };

  const removeGuide = (dayIndex) => {
    const updatedDays = [...itineraryDays];
    updatedDays[dayIndex].guide = null;
    setItineraryDays(updatedDays);
    toast.success('Guide removed');
  };

  // Save itinerary
  const saveItinerary = () => {
    if (!startDate || !endDate) {
      toast.error('Please select your trip dates first!');
      return;
    }
    
    const itinerary = {
      startDate,
      endDate,
      days: itineraryDays,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('taprobase-itinerary', JSON.stringify(itinerary));
    toast.success('Itinerary saved successfully!');
  };

  // Download itinerary as JSON
  const downloadItinerary = () => {
    if (!startDate || !endDate) {
      toast.error('Please select your trip dates first!');
      return;
    }
    
    const itinerary = {
      startDate,
      endDate,
      days: itineraryDays,
      createdAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(itinerary, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `taprobase-itinerary-${startDate}-${endDate}.json`;
    link.click();
    toast.success('Itinerary downloaded!');
  };

  // Share itinerary
  const shareItinerary = () => {
    if (!startDate || !endDate) {
      toast.error('Please select your trip dates first!');
      return;
    }
    
    const itinerary = {
      startDate,
      endDate,
      days: itineraryDays
    };
    
    const text = `My Sri Lanka Trip Plan (${startDate} to ${endDate})\n\n` +
      itineraryDays.map((day, idx) => 
        `Day ${idx + 1} (${day.date}):\n` +
        (day.attractions.length > 0 ? `Attractions: ${day.attractions.map(a => a.name).join(', ')}\n` : '') +
        (day.accommodation ? `Stay: ${day.accommodation.name}\n` : '') +
        (day.guide ? `Guide: ${day.guide.name}\n` : '')
      ).join('\n');
    
    if (navigator.share) {
      navigator.share({
        title: 'My Sri Lanka Trip Plan',
        text: text
      }).catch(() => {
        copyToClipboard(text);
      });
    } else {
      copyToClipboard(text);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Itinerary copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy itinerary');
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="trip-planner-page"
    >
      <div className="container">
        {/* Header */}
        <div className="planner-header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="planner-title">Trip Planner</h1>
            <p className="planner-subtitle">
              Create your custom itinerary and plan the perfect Sri Lankan adventure
            </p>
          </motion.div>
        </div>

        {/* Date Selection */}
        <motion.div
          className="date-selection-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="date-inputs">
            <div className="date-input-group">
              <label htmlFor="start-date">
                <Calendar size={20} />
                Start Date
              </label>
              <input
                type="date"
                id="start-date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="date-input-group">
              <label htmlFor="end-date">
                <Calendar size={20} />
                End Date
              </label>
              <input
                type="date"
                id="end-date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate || new Date().toISOString().split('T')[0]}
              />
            </div>
            {days > 0 && (
              <div className="trip-duration">
                <span className="duration-label">Trip Duration:</span>
                <span className="duration-value">{days} {days === 1 ? 'Day' : 'Days'}</span>
              </div>
            )}
          </div>
        </motion.div>

        {days > 0 ? (
          <>
            {/* Action Buttons */}
            <motion.div
              className="action-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <button className="btn btn-primary" onClick={saveItinerary}>
                <Save size={18} />
                Save Itinerary
              </button>
              <button className="btn btn-secondary" onClick={downloadItinerary}>
                <Download size={18} />
                Download
              </button>
              <button className="btn btn-secondary" onClick={shareItinerary}>
                <Share2 size={18} />
                Share
              </button>
            </motion.div>

            {/* Itinerary Days */}
            <div className="itinerary-days">
              {itineraryDays.map((day, dayIndex) => (
                <motion.div
                  key={dayIndex}
                  className="itinerary-day-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * dayIndex }}
                >
                  <div className="day-header">
                    <div className="day-info">
                      <h3 className="day-title">Day {day.dayNumber}</h3>
                      <p className="day-date">{new Date(day.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</p>
                    </div>
                  </div>

                  <div className="day-content">
                    {/* Attractions Section */}
                    <div className="day-section">
                      <div className="section-header">
                        <h4 className="section-title">
                          <MapPin size={20} />
                          Attractions
                        </h4>
                        <button
                          className="btn-add"
                          onClick={() => {
                            setActiveTab('attractions');
                            setSelectedDayIndex(dayIndex);
                            setShowAddModal(true);
                          }}
                        >
                          <Plus size={18} />
                          Add
                        </button>
                      </div>
                      <div className="items-list">
                        {day.attractions.length > 0 ? (
                          day.attractions.map((attraction) => (
                            <div key={attraction.id} className="item-card">
                              <div className="item-icon">{attraction.image}</div>
                              <div className="item-info">
                                <h5 className="item-name">{attraction.name}</h5>
                                <p className="item-details">
                                  <Clock size={14} /> {attraction.duration}
                                  <span className="separator">•</span>
                                  <Star size={14} fill="currentColor" /> {attraction.rating}
                                </p>
                              </div>
                              <button
                                className="btn-remove"
                                onClick={() => removeAttraction(dayIndex, attraction.id)}
                              >
                                <X size={18} />
                              </button>
                            </div>
                          ))
                        ) : (
                          <p className="empty-state">No attractions added yet</p>
                        )}
                      </div>
                    </div>

                    {/* Accommodation Section */}
                    <div className="day-section">
                      <div className="section-header">
                        <h4 className="section-title">
                          <Hotel size={20} />
                          Accommodation
                        </h4>
                        <button
                          className="btn-add"
                          onClick={() => {
                            setActiveTab('accommodations');
                            setSelectedDayIndex(dayIndex);
                            setShowAddModal(true);
                          }}
                        >
                          <Plus size={18} />
                          Add
                        </button>
                      </div>
                      <div className="items-list">
                        {day.accommodation ? (
                          <div className="item-card">
                            <div className="item-icon">{day.accommodation.image}</div>
                            <div className="item-info">
                              <h5 className="item-name">{day.accommodation.name}</h5>
                              <p className="item-details">
                                {day.accommodation.location}
                                <span className="separator">•</span>
                                {day.accommodation.pricePerNight}
                              </p>
                            </div>
                            <button
                              className="btn-remove"
                              onClick={() => removeAccommodation(dayIndex)}
                            >
                              <X size={18} />
                            </button>
                          </div>
                        ) : (
                          <p className="empty-state">No accommodation added yet</p>
                        )}
                      </div>
                    </div>

                    {/* Guide Section */}
                    <div className="day-section">
                      <div className="section-header">
                        <h4 className="section-title">
                          <Users size={20} />
                          Guide
                        </h4>
                        <button
                          className="btn-add"
                          onClick={() => {
                            setActiveTab('guides');
                            setSelectedDayIndex(dayIndex);
                            setShowAddModal(true);
                          }}
                        >
                          <Plus size={18} />
                          Add
                        </button>
                      </div>
                      <div className="items-list">
                        {day.guide ? (
                          <div className="item-card">
                            <div className="item-icon">👤</div>
                            <div className="item-info">
                              <h5 className="item-name">{day.guide.name}</h5>
                              <p className="item-details">
                                {day.guide.location}
                                <span className="separator">•</span>
                                {day.guide.dailyRate}
                              </p>
                            </div>
                            <button
                              className="btn-remove"
                              onClick={() => removeGuide(dayIndex)}
                            >
                              <X size={18} />
                            </button>
                          </div>
                        ) : (
                          <p className="empty-state">No guide added yet</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <motion.div
            className="empty-planner-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Calendar size={64} className="empty-icon" />
            <h3>Start Planning Your Trip</h3>
            <p>Select your travel dates to begin creating your custom itinerary</p>
          </motion.div>
        )}

        {/* Add Modal */}
        <AnimatePresence>
          {showAddModal && (
            <AddModal
              activeTab={activeTab}
              dayNumber={selectedDayIndex + 1}
              onClose={() => setShowAddModal(false)}
              onAddAttraction={(attraction) => {
                addAttraction(attraction, selectedDayIndex);
                setShowAddModal(false);
              }}
              onAddAccommodation={(accommodation) => {
                addAccommodation(accommodation, selectedDayIndex);
                setShowAddModal(false);
              }}
              onAddGuide={(guide) => {
                addGuide(guide, selectedDayIndex);
                setShowAddModal(false);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Add Modal Component
const AddModal = ({ activeTab, dayNumber, onClose, onAddAttraction, onAddAccommodation, onAddGuide }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const filteredAttractions = attractions.filter(attraction =>
    attraction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attraction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAccommodations = accommodations.filter(accommodation =>
    accommodation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    accommodation.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGuides = guides.filter(guide =>
    guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>
            {activeTab === 'attractions' && `Add Attraction to Day ${dayNumber}`}
            {activeTab === 'accommodations' && `Add Accommodation to Day ${dayNumber}`}
            {activeTab === 'guides' && `Add Guide to Day ${dayNumber}`}
          </h2>
          <button className="btn-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-search">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="modal-body">
          {activeTab === 'attractions' && (
            <div className="modal-list">
              {filteredAttractions.length > 0 ? (
                filteredAttractions.map((attraction) => (
                  <div
                    key={attraction.id}
                    className="modal-item"
                    onClick={() => onAddAttraction(attraction)}
                  >
                    <div className="modal-item-icon">{attraction.image}</div>
                    <div className="modal-item-info">
                      <h4>{attraction.name}</h4>
                      <p>{attraction.description}</p>
                      <div className="modal-item-meta">
                        <span><Clock size={14} /> {attraction.duration}</span>
                        <span><Star size={14} fill="currentColor" /> {attraction.rating}</span>
                      </div>
                    </div>
                    <Plus size={20} className="add-icon" />
                  </div>
                ))
              ) : (
                <p className="empty-state">No attractions found matching your search</p>
              )}
            </div>
          )}

          {activeTab === 'accommodations' && (
            <div className="modal-list">
              {filteredAccommodations.length > 0 ? (
                filteredAccommodations.map((accommodation) => (
                  <div
                    key={accommodation.id}
                    className="modal-item"
                    onClick={() => onAddAccommodation(accommodation)}
                  >
                    <div className="modal-item-icon">{accommodation.image}</div>
                    <div className="modal-item-info">
                      <h4>{accommodation.name}</h4>
                      <p>{accommodation.description}</p>
                      <div className="modal-item-meta">
                        <span>{accommodation.location}</span>
                        <span>{accommodation.pricePerNight}</span>
                      </div>
                    </div>
                    <Plus size={20} className="add-icon" />
                  </div>
                ))
              ) : (
                <p className="empty-state">No accommodations found matching your search</p>
              )}
            </div>
          )}

          {activeTab === 'guides' && (
            <div className="modal-list">
              {filteredGuides.length > 0 ? (
                filteredGuides.map((guide) => (
                  <div
                    key={guide.id}
                    className="modal-item"
                    onClick={() => onAddGuide(guide)}
                  >
                    <div className="modal-item-icon">👤</div>
                    <div className="modal-item-info">
                      <h4>{guide.name}</h4>
                      <p>{guide.bio}</p>
                      <div className="modal-item-meta">
                        <span>{guide.location}</span>
                        <span>{guide.dailyRate}</span>
                      </div>
                    </div>
                    <Plus size={20} className="add-icon" />
                  </div>
                ))
              ) : (
                <p className="empty-state">No guides found matching your search</p>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TripPlanner;
