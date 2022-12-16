import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import Modal from "../UI/Modal";

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
				<button>Sign in</button>
				<button>Sign-up</button>
			</div>
			<button onClick={authCtx.signInAsGuestHandler}>Play as a guest</button>
		</React.Fragment>
	);
}
