import React from 'react';
import { Link } from 'react-router-dom';

export const RefrigeratorService = () => {
  return (
    <div className="refrigerator-service">
      {/* Hero Section */}
      <section className="service-hero">
        <div className="container">
          <h1>Refrigerator & Freezer Repair Services</h1>
          <p>Expert repair for all refrigerator brands and models</p>
          <button className="btn btn-primary">Call Now: (555) 123-4567</button>
        </div>
      </section>

      {/* Common Problems */}
      <section className="common-problems">
        <div className="container">
          <h2>Common Refrigerator Problems We Fix</h2>
          <div className="problems-grid">
            <div className="problem-item">
              <h3>Not Cooling Properly</h3>
              <p>Refrigerator or freezer not maintaining proper temperature</p>
            </div>
            <div className="problem-item">
              <h3>Ice Maker Issues</h3>
              <p>Ice maker not working, making too much ice, or leaking</p>
            </div>
            <div className="problem-item">
              <h3>Water Dispenser Problems</h3>
              <p>Water not dispensing, slow flow, or bad taste</p>
            </div>
            <div className="problem-item">
              <h3>Strange Noises</h3>
              <p>Unusual sounds like grinding, clicking, or humming</p>
            </div>
            <div className="problem-item">
              <h3>Door Seal Issues</h3>
              <p>Damaged door seals causing temperature loss</p>
            </div>
            <div className="problem-item">
              <h3>Compressor Problems</h3>
              <p>Compressor not running or running constantly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Brands We Service */}
      <section className="brands-serviced">
        <div className="container">
          <h2>Refrigerator Brands We Service</h2>
          <div className="brands-grid">
            <div className="brand">Whirlpool</div>
            <div className="brand">GE & GE Profile</div>
            <div className="brand">Samsung</div>
            <div className="brand">LG</div>
            <div className="brand">Maytag</div>
            <div className="brand">KitchenAid</div>
            <div className="brand">Frigidaire</div>
            <div className="brand">Kenmore</div>
            <div className="brand">Bosch</div>
            <div className="brand">Sub-Zero</div>
            <div className="brand">Viking</div>
            <div className="brand">And More!</div>
          </div>
        </div>
      </section>

      {/* Repair Process */}
      <section className="repair-process">
        <div className="container">
          <h2>Our Refrigerator Repair Process</h2>
          <div className="process-steps">
            <div className="step">
              <h3>1. Diagnosis</h3>
              <p>Thorough inspection to identify the exact problem</p>
            </div>
            <div className="step">
              <h3>2. Estimate</h3>
              <p>Upfront pricing with no hidden fees</p>
            </div>
            <div className="step">
              <h3>3. Repair</h3>
              <p>Professional repair using quality parts</p>
            </div>
            <div className="step">
              <h3>4. Testing</h3>
              <p>Complete testing to ensure proper operation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Service */}
      <section className="emergency-service">
        <div className="container">
          <h2>Emergency Refrigerator Repair</h2>
          <p>
            When your refrigerator stops working, food spoilage becomes a major concern. 
            We offer emergency repair services to get your refrigerator running again quickly.
          </p>
          <div className="emergency-situations">
            <h3>Call for Emergency Service If:</h3>
            <ul>
              <li>Refrigerator completely stopped cooling</li>
              <li>Freezer thawing out</li>
              <li>Water leaking inside your home</li>
              <li>Electrical issues or burning smells</li>
            </ul>
          </div>
          <button className="btn btn-emergency">Emergency Service: (555) 123-4567</button>
        </div>
      </section>

      {/* Tips */}
      <section className="maintenance-tips">
        <div className="container">
          <h2>Refrigerator Maintenance Tips</h2>
          <div className="tips-grid">
            <div className="tip">
              <h3>Clean the Coils</h3>
              <p>Clean condenser coils every 6 months for optimal efficiency</p>
            </div>
            <div className="tip">
              <h3>Check Door Seals</h3>
              <p>Inspect door seals regularly for cracks or damage</p>
            </div>
            <div className="tip">
              <h3>Replace Water Filter</h3>
              <p>Change water filter every 6 months for clean water and ice</p>
            </div>
            <div className="tip">
              <h3>Don't Overload</h3>
              <p>Avoid overloading to ensure proper air circulation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <div className="container">
          <h2>Need Refrigerator Repair?</h2>
          <p>Don't let a broken refrigerator spoil your food. Call Peter Tech Services today!</p>
          <div className="cta-buttons">
            <button className="btn btn-primary">Call (555) 123-4567</button>
            <Link to="/contact" className="btn btn-secondary">Request Service Online</Link>
          </div>
        </div>
      </section>
    </div>
  );
};