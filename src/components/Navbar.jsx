import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<div className="classic-navbar-wrapper">
			{/* Navbar sin logo */}
			<nav className="classic-nav">
				<div className="classic-nav-container">
					<ul className="classic-nav-menu">
						<li><Link to="/" className="classic-nav-link">Home</Link></li>
						<li><Link to="/about" className="classic-nav-link">About</Link></li>
						<li><Link to="/services" className="classic-nav-link">Services</Link></li>
						<li><Link to="/contact" className="classic-nav-link">Contact</Link></li>
						<li><Link to="/emergency" className="classic-nav-link emergency-link">Emergency</Link></li>
					</ul>
				</div>
			</nav>
		</div>
	);
};