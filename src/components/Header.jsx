import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
	return (
		<header>
			<NavLink to="/">Starsweeper</NavLink>
			<NavLink to="/highscores">Highscores</NavLink>
		</header>
	);
}
