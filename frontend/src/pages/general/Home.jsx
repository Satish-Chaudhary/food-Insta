import React, { useState, useEffect, useRef } from 'react';
import api from '../../config/api';
import '../../styles/home.css';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

const Home = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const navigate = useNavigate();

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
          navigate('/user/login')
        }
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, []);

  // Handle scroll events to update current index
  const handleScroll = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const scrollPosition = container.scrollTop;
    const windowHeight = window.innerHeight;
    
    // Calculate which reel is currently in view
    const newIndex = Math.round(scrollPosition / windowHeight);
    
    // Update current index if it changed
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < foodItems.length) {
      setCurrentIndex(newIndex);
    }
  };

  // Handle mouse wheel for desktop navigation
  const handleWheel = (e) => {
    // Allow natural scrolling but update current index
    setTimeout(handleScroll, 50);
  };

  // Handle touch events for swipe navigation
  const handleTouchStart = (e) => {
    // Allow natural touch scrolling
  };

  const handleTouchMove = (e) => {
    // Allow natural touch scrolling
  };

  const handleTouchEnd = (e) => {
    // Update index after touch scrolling
    setTimeout(handleScroll, 50);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      container.addEventListener('wheel', handleWheel);
      
      // Touch events
      container.addEventListener('touchstart', handleTouchStart);
      container.addEventListener('touchmove', handleTouchMove);
      container.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        container.removeEventListener('scroll', handleScroll);
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [currentIndex, foodItems.length]);

  // Scroll to the current reel when index changes
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const targetScrollTop = currentIndex * window.innerHeight;
      
      container.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

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
    >
      {foodItems.map((item, index) => (
        <div key={item._id} className="reel-item">
          <video
            className="reel-video"
            src={item.video}
            autoPlay={index === currentIndex}
            loop
            playsInline
            preload='metadata'
            muted
          />
          <div className="reel-content">
            <p className="reel-description">
              {item.description || item.name}
            </p>
            <Link to={`/food-partner/${item._id}`} className="visit-store-btn" aria-label='Visit Store'>Visit Store</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;

