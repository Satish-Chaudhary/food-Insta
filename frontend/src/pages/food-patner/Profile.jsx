import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../config/api';
import '../../styles/profile.css';

const Profile = () => {
  const { id } = useParams();
  const [foodPartner, setFoodPartner] = useState(null);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Fetch food partner data
        const partnerResponse = await api.get(`/food/food-partner/${id}`);
        setFoodPartner(partnerResponse.data.foodPartner);
        
        // Fetch foods by this food partner
        const foodsResponse = await api.get(`/food/food?foodpartner=${id}`);
        setFoods(foodsResponse.data.foodItems);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load profile data');
        setLoading(false);
        console.error('Error fetching profile data:', err);
      }
    };
    console.log(fetchProfileData());
    

    if (id) {
      fetchProfileData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  if (!foodPartner) {
    return (
      <div className="profile-container">
        <div className="error">Food partner not found</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-info">
          <div className="profile-image">
            <div className="placeholder-image">
              {foodPartner.businessName?.charAt(0) || 'F'}
            </div>
          </div>
          <div className="profile-details">
            <h1 className="business-name">{foodPartner.businessName}</h1>
            <p className="address">{foodPartner.address}</p>
            <div className="stats">
              <div className="stat">
                <span className="stat-number">{foods.length}</span>
                <span className="stat-label">Meals</span>
              </div>
              <div className="stat">
                <span className="stat-number">0</span>
                <span className="stat-label">Customers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="divider"></div>

      {/* Videos Grid */}
      <div className="videos-section">
        <h2 className="section-title">Meals</h2>
        {foods.length > 0 ? (
          <div className="videos-grid">
            {foods.map((food) => (
              <div key={food._id} className="video-card">
                <video 
                  className="video-thumbnail"
                  src={food.video}
                  muted
                  preload="metadata"
                />
                <div className="video-info">
                  <p className="video-name">{food.name}</p>
                  <p className="video-description">{food.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-videos">
            <p>No meals available yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;