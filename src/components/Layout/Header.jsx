import React, { useContext } from "react";
import { Link } from "react-router-dom";
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
			<Link to="/">Starsweeper</Link>
			<div>
				<p>Welcome {authCtx.user.name}</p>
				{authCtx.user.id ? (
					<button onClick={headerSignOutHandler}>Sign out</button>
				) : (
					<Link to="/authenticate">Sign-in</Link>
				)}
			</div>
		</header>
	);
}
