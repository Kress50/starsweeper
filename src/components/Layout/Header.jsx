import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import GameContext from "../../store/game-context";

export default function Header() {
	const ctx = useContext(GameContext);
	const authCtx = useContext(AuthContext);

	function headerSignOutHandler() {
		authCtx.signOutHandler();
		ctx.onEnd();
	}

	return (
		<header>
			<NavLink to="/">Starsweeper</NavLink>
			<button>Highscores</button>
			{authCtx.user.id ? (
				<button onClick={headerSignOutHandler}>Sign out</button>
			) : (
				<NavLink to="/signin">Sign-in</NavLink>
			)}
		</header>
	);
}
