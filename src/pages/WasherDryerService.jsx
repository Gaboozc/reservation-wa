import React from 'react';
import { Link } from 'react-router-dom';

export const WasherDryerService = () => {
  return (
    <div className="washer-dryer-service">
      {/* Hero Section */}
      <section className="service-hero">
        <div className="container">
          <h1>Washer & Dryer Repair Services</h1>
          <p>Expert repair for all laundry appliance brands and models</p>
          <button className="btn btn-primary">Call Now: (555) 123-4567</button>
        </div>
      </section>

      {/* Common Problems */}
      <section className="common-problems">
        <div className="container">
          <h2>Common Washer & Dryer Problems We Fix</h2>
          <div className="problems-grid">
            <div className="problem-item">
              <h3>Won't Start or Spin</h3>
              <p>Washer or dryer not starting, spinning, or completing cycles</p>
            </div>
            <div className="problem-item">
              <h3>Water Not Draining</h3>
              <p>Washer not draining water or draining slowly</p>
            </div>
            <div className="problem-item">
              <h3>Excessive Vibration</h3>
              <p>Washer or dryer shaking, moving, or making loud noises</p>
            </div>
            <div className="problem-item">
              <h3>Not Heating (Dryer)</h3>
              <p>Dryer running but not producing heat to dry clothes</p>
            </div>
            <div className="problem-item">
              <h3>Door/Lid Problems</h3>
              <p>Door or lid not locking, opening, or sealing properly</p>
            </div>
            <div className="problem-item">
              <h3>Control Panel Issues</h3>
              <p>Display not working, buttons not responding, or error codes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Washer vs Dryer Issues */}
      <section className="washer-dryer-specific">
        <div className="container">
          <div className="appliance-types">
            <div className="appliance-type">
              <h2>🧺 Washer-Specific Issues</h2>
              <ul>
                <li>Not filling with water</li>
                <li>Clothes still dirty after wash</li>
                <li>Excessive suds or soap residue</li>
                <li>Leaking water from bottom</li>
                <li>Agitator not working</li>
                <li>Spin cycle problems</li>
                <li>Off-balance loads</li>
                <li>Bad odors from washer</li>
              </ul>
            </div>
            
            <div className="appliance-type">
              <h2>🔥 Dryer-Specific Issues</h2>
              <ul>
                <li>Takes too long to dry</li>
                <li>Clothes coming out wrinkled</li>
                <li>Overheating or getting too hot</li>
                <li>Lint buildup problems</li>
                <li>Drum not turning</li>
                <li>Gas dryer not igniting</li>
                <li>Electric dryer no heat</li>
                <li>Vent blockage issues</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Brands We Service */}
      <section className="brands-serviced">
        <div className="container">
          <h2>Washer & Dryer Brands We Service</h2>
          <div className="brands-grid">
            <div className="brand">Whirlpool</div>
            <div className="brand">Maytag</div>
            <div className="brand">GE & GE Profile</div>
            <div className="brand">Samsung</div>
            <div className="brand">LG</div>
            <div className="brand">Kenmore</div>
            <div className="brand">Frigidaire</div>
            <div className="brand">Electrolux</div>
            <div className="brand">Bosch</div>
            <div className="brand">Speed Queen</div>
            <div className="brand">Amana</div>
            <div className="brand">And More!</div>
          </div>
        </div>
      </section>

      {/* Safety Information */}
      <section className="safety-info">
        <div className="container">
          <h2>⚠️ Safety First - When to Call Immediately</h2>
          <div className="safety-alerts">
            <div className="safety-alert">
              <h3>Gas Dryer Safety</h3>
              <p>If you smell gas around your dryer, stop using it immediately and call us for emergency service. Gas leaks can be dangerous.</p>
            </div>
            <div className="safety-alert">
              <h3>Electrical Issues</h3>
              <p>If you see sparks, smell burning, or experience electrical problems, unplug the unit and call for immediate service.</p>
            </div>
            <div className="safety-alert">
              <h3>Water Leaks</h3>
              <p>Significant water leaks can cause property damage. Turn off water supply and call us right away.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance Tips */}
      <section className="maintenance-tips">
        <div className="container">
          <h2>Washer & Dryer Maintenance Tips</h2>
          <div className="tips-grid">
            <div className="tip">
              <h3>Clean the Lint Filter</h3>
              <p>Clean dryer lint filter after every load for efficiency and fire prevention</p>
            </div>
            <div className="tip">
              <h3>Check Hoses</h3>
              <p>Inspect washer hoses regularly for cracks, bulges, or leaks</p>
            </div>
            <div className="tip">
              <h3>Clean Washer Drum</h3>
              <p>Run cleaning cycle monthly to prevent odors and buildup</p>
            </div>
            <div className="tip">
              <h3>Level Your Machines</h3>
              <p>Ensure washers and dryers are level to prevent vibration</p>
            </div>
            <div className="tip">
              <h3>Don't Overload</h3>
              <p>Avoid overloading machines for better performance and longevity</p>
            </div>
            <div className="tip">
              <h3>Clean Dryer Vent</h3>
              <p>Have dryer vent professionally cleaned annually</p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Models */}
      <section className="common-models">
        <div className="container">
          <h2>Types of Washers & Dryers We Repair</h2>
          <div className="models-grid">
            <div className="model-type">
              <h3>Top-Load Washers</h3>
              <p>Traditional and high-efficiency top-loading washing machines</p>
            </div>
            <div className="model-type">
              <h3>Front-Load Washers</h3>
              <p>Energy-efficient front-loading washers with advanced features</p>
            </div>
            <div className="model-type">
              <h3>Electric Dryers</h3>
              <p>Standard and high-efficiency electric dryers</p>
            </div>
            <div className="model-type">
              <h3>Gas Dryers</h3>
              <p>Natural gas and propane dryers with proper safety protocols</p>
            </div>
            <div className="model-type">
              <h3>Stackable Units</h3>
              <p>Space-saving stacked washer and dryer combinations</p>
            </div>
            <div className="model-type">
              <h3>All-in-One Units</h3>
              <p>Combination washer/dryer units and compact machines</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <div className="container">
          <h2>Need Washer or Dryer Repair?</h2>
          <p>Don't let laundry pile up! Call Peter Tech Services for fast, professional repair.</p>
          <div className="cta-buttons">
            <button className="btn btn-primary">Call (555) 123-4567</button>
            <Link to="/contact" className="btn btn-secondary">Request Service Online</Link>
          </div>
        </div>
      </section>
    </div>
  );
};