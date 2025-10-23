import React, { useState, useEffect, useRef } from 'react';
import api from '../../config/api';
import '../../styles/home.css';
import axios from 'axios';

const Home = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const touchStartY = useRef(0);

  // Fetch food items from backend
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await api.get('/food');
        setFoodItems(response.data.foodItems);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching food items:', error);
        // Handle unauthorized access
        if (error.response && error.response.status === 401) {
          console.log('User not authenticated. Redirecting to login...');
          // In a real app, you would redirect to login page
          // window.location.href = '/login';
        }
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, []);

  // Handle touch events for swipe navigation
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (!touchStartY.current) return;
    
    const touchY = e.touches[0].clientY;
    const diffY = touchStartY.current - touchY;
    
    // Minimum swipe distance
    if (Math.abs(diffY) > 50) {
      if (diffY > 0 && currentIndex < foodItems.length - 1) {
        // Swipe up - go to next video
        setCurrentIndex(prev => prev + 1);
      } else if (diffY < 0 && currentIndex > 0) {
        // Swipe down - go to previous video
        setCurrentIndex(prev => prev - 1);
      }
      touchStartY.current = 0; // Reset to prevent multiple triggers
    }
  };

  // Handle mouse wheel for desktop navigation
  const handleWheel = (e) => {
    if (e.deltaY > 0 && currentIndex < foodItems.length - 1) {
      // Scroll down - go to next video
      setCurrentIndex(prev => prev + 1);
    } else if (e.deltaY < 0 && currentIndex > 0) {
      // Scroll up - go to previous video
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown' && currentIndex < foodItems.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (e.key === 'ArrowUp' && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        container.removeEventListener('wheel', handleWheel);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [currentIndex, foodItems.length]);

  if (loading) {
    return <div className="reels-container">Loading...</div>;
  }

  if (foodItems.length === 0) {
    return <div className="reels-container">No food items available</div>;
  }

  return (
    <div 
      className="reels-container"
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {foodItems.map((item, index) => (
        <video
          key={item._id}
          className={`reel-video ${index === currentIndex ? 'active' : ''}`}
          src={item.video}
          autoPlay={index === currentIndex}
          loop
          muted
        />
      ))}
      
      <div className="reel-content">
        <p className="reel-description">
          {foodItems[currentIndex]?.description || foodItems[currentIndex]?.name}
        </p>
        <button className="visit-store-btn">Visit Store</button>
      </div>
      
      <div className="swipe-indicator">Swipe to navigate</div>
    </div>
  );
};

export default Home;