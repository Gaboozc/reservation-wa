import React from 'react';

export const About = () => {
  return (
    <div className="about">
      {/* About Hero */}
      <section className="about-hero">
        <div className="container">
          <h1>About Peter Tech Services LLC</h1>
          <p>Your trusted local appliance repair experts since 2010</p>
        </div>
      </section>

      {/* Company Story */}
      <section className="company-story">
        <div className="container">
          <div className="story-content">
            <h2>Our Story</h2>
            <p>
              Peter Tech Services LLC was founded in 2010 with a simple mission: to provide 
              honest, reliable, and affordable appliance repair services to families and 
              businesses in our community. What started as a one-person operation has grown 
              into a trusted team of certified technicians.
            </p>
            <p>
              With over 13 years of experience, we've repaired thousands of appliances and 
              built lasting relationships with our customers. Our commitment to quality work, 
              fair pricing, and exceptional customer service has made us the go-to appliance 
              repair company in the area.
            </p>
          </div>
        </div>
      </section>

      {/* Our Experience */}
      <section className="experience">
        <div className="container">
          <h2>Our Experience & Certifications</h2>
          <div className="experience-grid">
            <div className="experience-item">
              <h3>13+ Years</h3>
              <p>Of professional appliance repair experience</p>
            </div>
            <div className="experience-item">
              <h3>Licensed & Insured</h3>
              <p>Fully licensed and insured for your protection</p>
            </div>
            <div className="experience-item">
              <h3>Factory Trained</h3>
              <p>Certified technicians trained by major appliance manufacturers</p>
            </div>
            <div className="experience-item">
              <h3>5000+ Repairs</h3>
              <p>Successfully completed repairs across all appliance types</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services We Provide */}
      <section className="services-provided">
        <div className="container">
          <h2>What We Specialize In</h2>
          <div className="specialties-grid">
            <div className="specialty">
              <h3>Major Appliances</h3>
              <ul>
                <li>Refrigerators & Freezers</li>
                <li>Washers & Dryers</li>
                <li>Dishwashers</li>
                <li>Ovens & Ranges</li>
                <li>Microwaves</li>
                <li>Garbage Disposals</li>
              </ul>
            </div>
            <div className="specialty">
              <h3>All Major Brands</h3>
              <ul>
                <li>Whirlpool</li>
                <li>GE & GE Profile</li>
                <li>Samsung</li>
                <li>LG</li>
                <li>Maytag</li>
                <li>KitchenAid</li>
                <li>And many more!</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="our-promise">
        <div className="container">
          <h2>Our Promise to You</h2>
          <div className="promise-content">
            <p>
              At Peter Tech Services, we understand that when your appliances break down, 
              it disrupts your daily life. That's why we're committed to providing fast, 
              reliable service that gets your appliances working again quickly.
            </p>
            <div className="promises-list">
              <div className="promise-item">
                <h3>Honest Diagnosis</h3>
                <p>We'll always give you an honest assessment of your appliance's condition</p>
              </div>
              <div className="promise-item">
                <h3>Fair Pricing</h3>
                <p>Upfront, competitive pricing with no hidden fees or surprises</p>
              </div>
              <div className="promise-item">
                <h3>Quality Work</h3>
                <p>All repairs are guaranteed and backed by our warranty</p>
              </div>
              <div className="promise-item">
                <h3>Respectful Service</h3>
                <p>We treat your home and family with the utmost respect</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};