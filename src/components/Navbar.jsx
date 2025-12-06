import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

export const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	const closeMenu = () => {
		setMenuOpen(false);
	};

	return (
		<nav className="navbar">
			<div className="navbar-container">
				<Link to="/" className="navbar-logo" onClick={closeMenu}>
					💈 Sistema de Reservas
				</Link>
				<div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
					<span className="bar"></span>
					<span className="bar"></span>
					<span className="bar"></span>
				</div>
				<div className={`navbar-menu ${menuOpen ? "active" : ""}`}>
					<Link to="/catalogo" className="nav-link btn-agendar" onClick={closeMenu}>
						📚 Catálogo
					</Link>
					<Link to="/reservar" className="nav-link btn-agendar" onClick={closeMenu}>
						✂️ Agendar Cita
					</Link>
				</div>
			</div>
		</nav>
	);
};