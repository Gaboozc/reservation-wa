import React, { useState } from 'react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    appliance: '',
    issue: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will contact you soon.');
  };

  return (
    <div className="contact">
      {/* Contact Hero */}
      <section className="contact-hero">
        <div className="container">
          <h1>Contact Peter Tech Services</h1>
          <p>Get in touch for fast, professional appliance repair services</p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="contact-info">
        <div className="container">
          <div className="contact-grid">
            
            {/* Contact Details */}
            <div className="contact-details">
              <h2>Get In Touch</h2>
              
              <div className="contact-item">
                <h3>📞 Phone</h3>
                <p><strong>(555) 123-4567</strong></p>
                <p>Call us for immediate assistance</p>
              </div>

              <div className="contact-item">
                <h3>📧 Email</h3>
                <p><strong>info@petertechservices.com</strong></p>
                <p>Send us your questions or requests</p>
              </div>

              <div className="contact-item">
                <h3>📍 Service Area</h3>
                <p><strong>Greater Metropolitan Area</strong></p>
                <p>We serve the entire metro region and surrounding areas</p>
              </div>

              <div className="contact-item">
                <h3>🕐 Business Hours</h3>
                <div className="hours">
                  <p><strong>Monday - Friday:</strong> 8:00 AM - 6:00 PM</p>
                  <p><strong>Saturday:</strong> 9:00 AM - 5:00 PM</p>
                  <p><strong>Sunday:</strong> Emergency Service Only</p>
                  <p><strong>Emergency Service:</strong> Available 24/7</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form">
              <h2>Request Service</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="appliance">Appliance Type *</label>
                  <select
                    id="appliance"
                    name="appliance"
                    value={formData.appliance}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Appliance</option>
                    <option value="refrigerator">Refrigerator</option>
                    <option value="washer">Washer</option>
                    <option value="dryer">Dryer</option>
                    <option value="dishwasher">Dishwasher</option>
                    <option value="oven">Oven/Range</option>
                    <option value="microwave">Microwave</option>
                    <option value="disposal">Garbage Disposal</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="issue">What's the problem?</label>
                  <input
                    type="text"
                    id="issue"
                    name="issue"
                    value={formData.issue}
                    onChange={handleChange}
                    placeholder="e.g., Not cooling, won't start, making noise"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Additional Details</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Tell us more about the issue, preferred appointment time, etc."
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  Request Service
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="emergency-contact">
        <div className="container">
          <div className="emergency-box">
            <h2>🚨 Need Emergency Service?</h2>
            <p>
              If you have an appliance emergency that can't wait, call us immediately:
            </p>
            <div className="emergency-number">
              <a href="tel:5551234567" className="btn btn-emergency">
                Call Emergency Line: (555) 123-4567
              </a>
            </div>
            <p className="emergency-note">
              Emergency services available 24/7 for urgent repairs like refrigerator 
              failures, gas leaks, or flooding from appliances.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-contact-us">
        <div className="container">
          <h2>Why Contact Peter Tech Services?</h2>
          <div className="reasons-grid">
            <div className="reason">
              <h3>Fast Response</h3>
              <p>We respond to service requests quickly and schedule repairs at your convenience</p>
            </div>
            <div className="reason">
              <h3>Free Estimates</h3>
              <p>Get a free, no-obligation estimate for your appliance repair</p>
            </div>
            <div className="reason">
              <h3>Professional Service</h3>
              <p>Licensed, insured, and experienced technicians you can trust</p>
            </div>
            <div className="reason">
              <h3>Satisfaction Guaranteed</h3>
              <p>We stand behind our work with a comprehensive warranty</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};