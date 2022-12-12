import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import GameContext from "../store/game-context";

export default function Header() {
	const ctx = useContext(GameContext);

	return (
		<header>
			<NavLink to="/">Starsweeper</NavLink>
			<NavLink to="/highscores">Highscores</NavLink>
		</header>
	);
}

// onClick={ctx.onEnd}
