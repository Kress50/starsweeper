import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";

export default function LoginModal() {
	const authCtx = useContext(AuthContext);

	return (
		<React.Fragment>
			<h1>Welcome to Starsweeper!</h1>
			<p>To play this game you need to authenticate!</p>
			<div>
				<div>
					<button onClick={authCtx.signInWithGoogleHandler}>Google</button>
				</div>
				<div>
					<Link to="/authenticate">Email</Link>
				</div>
			</div>
			<button onClick={authCtx.signInAsGuestHandler}>Play as a guest</button>
		</React.Fragment>
	);
}
