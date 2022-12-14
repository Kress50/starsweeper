import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
	return (
		<header>
			<NavLink to="/">Starsweeper</NavLink>
			<button>Highscores</button>
			<NavLink to="/login">Starsweeper</NavLink>
		</header>
	);
}
