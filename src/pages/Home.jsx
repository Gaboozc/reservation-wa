import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();
  
  const goToServices = () => {
    console.log('Navigating to services page...');
    navigate('/services');
  };

  return (


    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-flex">
          <div className="hero-logo big">
            <img src="/src/assets/img/PeterT.png" alt="Peter Tech Services" />
          </div>
          <div className="hero-content">
            <h1>FAST, RELIABLE & AFFORDABLE APPLIANCE REPAIR<br/>IN CENTRAL FLORIDA</h1>
            <p>Expert technicians available 24/7 for all your appliance repair needs. Quick response, quality service, competitive prices.</p>
          </div>
        </div>
      </section>

      {/* Service Cards Section */}
      <div className="service-cards service-cards-grid">
        <div className="service-card-modern">
          <div className="service-image refrigerator-bg"></div>
          <div className="service-overlay">
            <h3>Refrigerator Repair</h3>
            <p>Expert diagnosis and repair of cooling issues, ice makers, and electrical problems</p>
            <Link to="/services/refrigerator" className="btn btn-primary" style={{marginTop: '1.2rem', background: '#ff6b35', borderColor: '#ff6b35'}}>Learn More</Link>
          </div>
        </div>
        <div className="service-card-modern">
          <div className="service-image washer-dryer-bg"></div>
          <div className="service-overlay">
            <h3>Washer & Dryer Repair</h3>
            <p>Fix drainage issues, motor problems, and restore optimal washing performance</p>
            <Link to="/services/washer-dryer" className="btn btn-primary" style={{marginTop: '1.2rem', background: '#ff6b35', borderColor: '#ff6b35'}}>Learn More</Link>
          </div>
        </div>
        <div className="service-card-modern">
          <div className="service-image dishwasher-bg"></div>
          <div className="service-overlay">
            <h3>Dishwasher Repair</h3>
            <p>Resolve cleaning issues, water leaks, and restore proper dishwasher function</p>
            <Link to="/services/dishwasher" className="btn btn-primary" style={{marginTop: '1.2rem', background: '#ff6b35', borderColor: '#ff6b35'}}>Learn More</Link>
          </div>
        </div>
      </div>

      {/* Expert Technicians + Image Box Section */}
      <section className="expert-stats-section">
        <div className="expert-stats-grid">
          <div className="expert-text-block">
            <h2>EXPERT TECHNICIANS YOU CAN TRUST</h2>
            <p>With over 15 years of experience serving Central Florida, our certified technicians have the expertise to handle any appliance repair challenge. We pride ourselves on honest pricing, quality workmanship, and exceptional customer service.</p>
            <div className="features-list">
              <div className="feature-item"><span className="checkmark">✓</span> Licensed & Insured Professionals</div>
              <div className="feature-item"><span className="checkmark">✓</span> Same-Day Service Available</div>
              <div className="feature-item"><span className="checkmark">✓</span> 90-Day Warranty on All Repairs</div>
            </div>
            <button className="btn btn-primary" style={{background: '#C4982A', borderColor: '#C4982A', marginTop: '2rem'}}>Schedule Your Repair</button>
          </div>
          <div className="image-stat-block">
            <div className="image-box">
              <div className="image-background"></div>
            </div>
            <div className="stat-text-below">
              <span className="stat-number">500+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <div className="container">
          <h2>Need Appliance Repair Today?</h2>
          <p>Don't wait - call Peter Tech Services for fast, professional appliance repair!</p>
          <button className="btn btn-primary">Get Free Estimate</button>
        </div>
      </section>
    </div>
  );
};