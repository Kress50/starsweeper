import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config";
import AuthContext from "../store/auth-context";

export default function Authenticate() {
	const [isLogin, setIsLogin] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordAgain, setPasswordAgain] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();

	//Checks for auth mode and either creates or signs in a user through firebase
	//Displays an error if something went wrong
	const onSubmitHandler = async (e) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		if (!isLogin) {
			try {
				await authCtx.signUpWithEmailHandler(email, password);
				setIsLoading(false);
				navigate("/");
			} catch (error) {
				setError(`Something went wrong: ${error.toString()}`);
				setIsLoading(false);
			}
		}

		if (isLogin) {
			try {
				await authCtx.signInWithEmailHandler(email, password);
				setIsLoading(false);
				navigate("/");
			} catch (error) {
				setError(`Something went wrong: ${error.toString()}`);
				setIsLoading(false);
			}
		}
	};

	function inputHandler(e) {
		if (e.target.name === "email") {
			setEmail(e.target.value);

			//
			if (isLogin) return;
		}
		if (e.target.name === "password") {
			setPassword(e.target.value);
			if (isLogin) return;
		}

		if (e.target.name === "passwordAgain") {
			setPasswordAgain(e.target.value);
		}
	}

	function modeSwitchHandler(e) {
		e.preventDefault();
		setIsLogin((prev) => !prev);
	}

	function buttonDisplayHandler() {
		if (isLoading) return "Loading...";
		if (!isLoading && isLogin) return "Sign In";
		if (!isLoading && !isLogin) return "Sign Up";
	}

	return (
		<React.Fragment>
			<div>{isLogin ? "Login" : "SignUp"}</div>
			{isLogin && (
				<button onClick={authCtx.signInWithGoogleHandler}>Google</button>
			)}
			<br></br>
			<button onClick={modeSwitchHandler}>Switch</button>
			<form onSubmit={onSubmitHandler}>
				<label htmlFor="email">Email:</label>
				<input
					type="email"
					name="email"
					id="email"
					onChange={inputHandler}
					value={email}
					required
				/>
				<label htmlFor="password">Password:</label>
				<input
					type="password"
					name="password"
					id="password"
					autoComplete="new-password"
					onChange={inputHandler}
					value={password}
					required
				/>
				{!isLogin && (
					<React.Fragment>
						<label htmlFor="passwordAgain">Repeat password:</label>
						<input
							type="password"
							name="passwordAgain"
							id="passwordAgain"
							onChange={inputHandler}
							value={passwordAgain}
							required
						/>
					</React.Fragment>
				)}
				<div>{error}</div>
				<button type="submit">{buttonDisplayHandler()}</button>
			</form>
		</React.Fragment>
	);
}
