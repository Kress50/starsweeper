import React from "react";
import Modal from "../UI/Modal";

export default function LoginModal(props) {
	return (
		<React.Fragment>
			<h1>Welcome to Starsweeper!</h1>
			<p>To play this game you need to authenticate!</p>
			<div>
				<button>Login</button>
				<button>Sign-up</button>
			</div>
			<button onClick={props.onLoginGuest}>Play as a guest</button>
		</React.Fragment>
	);
}
