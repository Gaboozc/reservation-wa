import { Link } from "react-router-dom";

export const Footer = () => (
    <footer className="footer">
        <div className="container">
            <div className="footer-content">
                {/* Blank column for layout alignment */}
                <div className="footer-section" aria-hidden="true"></div>

                {/* Services */}
                <div className="footer-section">
                    <h4>Our Services in Central Florida</h4>
                    <ul>
                        <li><Link to="/services/refrigerator">Refrigerator Repair</Link></li>
                        <li>Washer &amp; Dryer Repair</li>
                        <li>Dishwasher Repair</li>
                        <li>Oven &amp; Range Repair</li>
                        <li>Microwave Repair</li>
                        <li>Emergency Service 24/7</li>
                    </ul>
                </div>

                {/* Business Hours */}
                <div className="footer-section" style={{ color: "#fff" }}>
                    <h4>Business Hours</h4>
                    <div className="hours">
                        <p><strong>Monday - Friday:</strong><br />8:00 AM - 6:00 PM</p>
                        <p><strong>Saturday:</strong><br />9:00 AM - 5:00 PM</p>
                        <p><strong>Sunday:</strong><br />Emergency Only</p>
                        <p><strong>Emergency Service:</strong><br />Available 24/7</p>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom">
                <div className="bottom-content">
                    <p>© 2023 Peter Tech Services LLC. All rights reserved.</p>
                </div>
            </div>
        </div>
    </footer>
);