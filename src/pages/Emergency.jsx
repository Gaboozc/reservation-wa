import React from 'react';

export const Emergency = () => {
  return (
    <div className="emergency">
      {/* Emergency Hero */}
      <section className="emergency-hero">
        <div className="container">
          <h1>🚨 Emergency Appliance Repair</h1>
          <h2>24/7 Emergency Service Available</h2>
          <p>When you have an appliance emergency, we're here to help immediately</p>
          <div className="emergency-number">
            <a href="tel:5551234567" className="btn btn-emergency-large">
              Call Emergency Line: (555) 123-4567
            </a>
          </div>
        </div>
      </section>

      {/* What Constitutes an Emergency */}
      <section className="emergency-situations">
        <div className="container">
          <h2>When to Call for Emergency Service</h2>
          <p>
            Not all appliance problems require emergency service. Here's when you should 
            call our emergency line:
          </p>
          
          <div className="emergency-types">
            <div className="emergency-type">
              <h3>🧊 Refrigerator Emergencies</h3>
              <ul>
                <li>Complete cooling failure</li>
                <li>Freezer completely thawed</li>
                <li>Internal water leaking</li>
                <li>Electrical sparking or burning smell</li>
              </ul>
            </div>

            <div className="emergency-type">
              <h3>💧 Water-Related Emergencies</h3>
              <ul>
                <li>Washing machine flooding</li>
                <li>Dishwasher leaking heavily</li>
                <li>Water heater leaking</li>
                <li>Burst water lines in appliances</li>
              </ul>
            </div>

            <div className="emergency-type">
              <h3>🔥 Gas & Electrical Emergencies</h3>
              <ul>
                <li>Gas smell from stove or dryer</li>
                <li>Electrical sparking from any appliance</li>
                <li>Burning smells from appliances</li>
                <li>Complete electrical failure</li>
              </ul>
            </div>

            <div className="emergency-type">
              <h3>🏠 Property Damage Risk</h3>
              <ul>
                <li>Appliances causing water damage</li>
                <li>Risk of food spoilage (refrigeration)</li>
                <li>Safety hazards from malfunctioning appliances</li>
                <li>Complete loss of essential appliance function</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Response Process */}
      <section className="emergency-process">
        <div className="container">
          <h2>Our Emergency Response Process</h2>
          <div className="process-timeline">
            <div className="process-step">
              <h3>Step 1: Immediate Response</h3>
              <p>We answer emergency calls within minutes and assess the situation</p>
              <span className="time">0-5 minutes</span>
            </div>
            <div className="process-step">
              <h3>Step 2: Safety First</h3>
              <p>We guide you on immediate safety measures while en route</p>
              <span className="time">5-15 minutes</span>
            </div>
            <div className="process-step">
              <h3>Step 3: Rapid Dispatch</h3>
              <p>Emergency technician dispatched to your location immediately</p>
              <span className="time">15-30 minutes</span>
            </div>
            <div className="process-step">
              <h3>Step 4: On-Site Repair</h3>
              <p>Quick diagnosis and immediate repair or temporary solution</p>
              <span className="time">30-60 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Services Pricing */}
      <section className="emergency-pricing">
        <div className="container">
          <h2>Emergency Service Information</h2>
          <div className="pricing-info">
            <div className="pricing-card">
              <h3>Emergency Service Call</h3>
              <p>Emergency service calls include:</p>
              <ul>
                <li>Immediate response (24/7)</li>
                <li>Priority scheduling</li>
                <li>Safety assessment</li>
                <li>Temporary solutions when possible</li>
                <li>Complete diagnosis</li>
              </ul>
              <p className="note">
                Emergency service fees may apply for after-hours calls. 
                All fees are discussed upfront before service.
              </p>
            </div>
            
            <div className="availability-card">
              <h3>Emergency Availability</h3>
              <div className="availability-schedule">
                <p><strong>Weekdays (6 PM - 8 AM):</strong> Emergency rates apply</p>
                <p><strong>Weekends:</strong> Emergency rates apply</p>
                <p><strong>Holidays:</strong> Emergency rates apply</p>
                <p><strong>Regular Hours:</strong> Standard rates</p>
              </div>
              <p className="emergency-note">
                True emergencies threatening safety or property receive immediate attention 
                regardless of time or day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Immediate Actions */}
      <section className="immediate-actions">
        <div className="container">
          <h2>What to Do Before We Arrive</h2>
          <div className="actions-grid">
            <div className="action-category">
              <h3>Water Leaks</h3>
              <ol>
                <li>Turn off water supply to the appliance</li>
                <li>Unplug the appliance if safe to do so</li>
                <li>Move items away from the leak area</li>
                <li>Place towels or buckets to catch water</li>
              </ol>
            </div>
            
            <div className="action-category">
              <h3>Gas Smell</h3>
              <ol>
                <li><strong>Do not</strong> use electrical switches</li>
                <li>Turn off gas supply at the appliance</li>
                <li>Open windows for ventilation</li>
                <li>Evacuate if smell is strong</li>
              </ol>
            </div>
            
            <div className="action-category">
              <h3>Electrical Issues</h3>
              <ol>
                <li>Turn off circuit breaker to the appliance</li>
                <li>Unplug the appliance if safe</li>
                <li>Do not touch damaged wires</li>
                <li>Keep area clear until we arrive</li>
              </ol>
            </div>
            
            <div className="action-category">
              <h3>Refrigeration Failure</h3>
              <ol>
                <li>Keep doors closed to maintain temperature</li>
                <li>Move perishables to coolers if available</li>
                <li>Check if it's just a tripped breaker</li>
                <li>Note when the problem started</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="emergency-contact">
        <div className="container">
          <h2>Emergency Contact Information</h2>
          <div className="contact-info">
            <div className="emergency-number-large">
              <h3>Emergency Line</h3>
              <a href="tel:5551234567" className="emergency-phone">
                (555) 123-4567
              </a>
              <p>Available 24 hours a day, 7 days a week</p>
            </div>
            
            <div className="emergency-text">
              <h3>Text for Non-Urgent Emergencies</h3>
              <p>
                For less urgent situations, you can text us at the same number. 
                Include your name, address, and brief description of the problem.
              </p>
            </div>
          </div>
          
          <div className="emergency-guarantee">
            <h3>Our Emergency Service Guarantee</h3>
            <p>
              We guarantee that a qualified technician will respond to your emergency 
              call within 1 hour during regular hours, and within 2 hours for 
              after-hours emergencies, weather permitting.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};