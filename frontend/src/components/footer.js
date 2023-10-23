import React from 'react';
import './footer.css';

function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Mobile Hour</p> {/* Dynamic year */}
                <ul className="footer-links">
                    <li>Terms of Service</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
