import React from 'react';
import { Link } from 'react-router-dom';

export const Services = () => {
  return (
    <div className="services">
      {/* Services Hero */}
      <section className="services-hero">
        <div className="container">
          <h1>Our Appliance Repair Services</h1>
          <p>Professional repair services for all major home appliances</p>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="main-services">
        <div className="container">
          <div className="services-grid">
            
            {/* Refrigerator Services */}
            <div className="service-category">
              <h2>Refrigerator & Freezer Repair</h2>
              <div className="service-details">
                <p>Expert repair for all refrigerator and freezer issues:</p>
                <ul>
                  <li>Not cooling properly</li>
                  <li>Ice maker problems</li>
                  <li>Water dispenser issues</li>
                  <li>Strange noises</li>
                  <li>Door seal problems</li>
                  <li>Compressor issues</li>
                </ul>
                <Link to="/services/refrigerator" className="btn btn-secondary">Learn More</Link>
              </div>
            </div>

            {/* Washer Services */}
            <div className="service-category">
              <h2>Washer & Dryer Repair</h2>
              <div className="service-details">
                <p>Complete laundry appliance repair services:</p>
                <ul>
                  <li>Won't start or spin</li>
                  <li>Water not draining</li>
                  <li>Excessive vibration</li>
                  <li>Not heating (dryer)</li>
                  <li>Door/lid problems</li>
                  <li>Control panel issues</li>
                </ul>
                <Link to="/services/washer-dryer" className="btn btn-secondary">Learn More</Link>
              </div>
            </div>

            {/* Dishwasher Services */}
            <div className="service-category">
              <h2>Dishwasher Repair</h2>
              <div className="service-details">
                <p>Fast dishwasher repair and maintenance:</p>
                <ul>
                  <li>Not cleaning dishes properly</li>
                  <li>Water not draining</li>
                  <li>Door latch problems</li>
                  <li>Spray arm issues</li>
                  <li>Control problems</li>
                  <li>Leaking water</li>
                </ul>
                <Link to="/services/dishwasher" className="btn btn-secondary">Learn More</Link>
              </div>
            </div>

            {/* Oven/Range Services */}
            <div className="service-category">
              <h2>Oven, Range & Cooktop Repair</h2>
              <div className="service-details">
                <p>Professional cooking appliance repairs:</p>
                <ul>
                  <li>Oven not heating</li>
                  <li>Temperature issues</li>
                  <li>Burner problems</li>
                  <li>Self-cleaning issues</li>
                  <li>Door problems</li>
                  <li>Control panel repair</li>
                </ul>
                <Link to="/services/oven-range" className="btn btn-secondary">Learn More</Link>
              </div>
            </div>

            {/* Microwave Services */}
            <div className="service-category">
              <h2>Microwave Repair</h2>
              <div className="service-details">
                <p>Quick microwave repair services:</p>
                <ul>
                  <li>Not heating food</li>
                  <li>Turntable problems</li>
                  <li>Door issues</li>
                  <li>Control panel repair</li>
                  <li>Strange noises</li>
                  <li>Light/fan problems</li>
                </ul>
                <Link to="/services/microwave" className="btn btn-secondary">Learn More</Link>
              </div>
            </div>

            {/* Additional Services */}
            <div className="service-category">
              <h2>Additional Services</h2>
              <div className="service-details">
                <p>Other appliance repair services:</p>
                <ul>
                  <li>Garbage disposal repair</li>
                  <li>Ice maker service</li>
                  <li>Appliance installation</li>
                  <li>Maintenance service</li>
                  <li>Diagnostic service</li>
                  <li>Emergency repairs</li>
                </ul>
                <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Service */}
      <section className="emergency-service">
        <div className="container">
          <h2>Emergency Appliance Repair</h2>
          <p>
            Appliance emergencies don't wait for business hours. That's why we offer 
            emergency repair services for urgent situations like:
          </p>
          <div className="emergency-list">
            <ul>
              <li>Refrigerator completely stopped working</li>
              <li>Water leaking from appliances</li>
              <li>Gas appliance safety concerns</li>
              <li>Complete power failure in appliances</li>
            </ul>
          </div>
          <div className="emergency-contact">
            <h3>Emergency Service Available</h3>
            <p>Call us for emergency repairs: <strong>(555) 123-4567</strong></p>
            <button className="btn btn-primary">Call for Emergency Service</button>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="service-areas">
        <div className="container">
          <h2>Areas We Serve</h2>
          <p>We provide appliance repair services throughout the greater metropolitan area:</p>
          <div className="areas-grid">
            <div className="area-group">
              <h3>Primary Service Areas</h3>
              <ul>
                <li>Downtown</li>
                <li>Westside</li>
                <li>Eastside</li>
                <li>Northtown</li>
                <li>Southend</li>
              </ul>
            </div>
            <div className="area-group">
              <h3>Extended Service Areas</h3>
              <ul>
                <li>Suburban North</li>
                <li>Suburban South</li>
                <li>Suburban East</li>
                <li>Suburban West</li>
                <li>Outer Counties</li>
              </ul>
            </div>
          </div>
          <p className="service-note">
            Don't see your area listed? Call us! We may still be able to help.
          </p>
        </div>
      </section>
    </div>
  );
};