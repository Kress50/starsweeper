import {
	Box,
	Button,
	Container,
	Grid,
	Sheet,
	Tab,
	TabList,
	Tabs,
	TextField,
	Typography,
} from "@mui/joy";
import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Layout/Title";
import AuthContext from "../store/auth-context";
import validator from "validator";

export default function Authenticate() {
	const [isLogin, setIsLogin] = useState(true);
	const [email, setEmail] = useState({
		email: "",
		valid: "",
	});
	const [password, setPassword] = useState({
		password: "",
		valid: "",
	});
	const [passwordAgain, setPasswordAgain] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState({
		email: "",
		password: "",
		passwordAgain: "",
		auth: "",
	});
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
				await authCtx.signUpWithEmailHandler(email.email, password.password);
				setIsLoading(false);
				navigate("/");
			} catch (error) {
				setError((prev) => ({ ...prev, auth: error.toString() }));
				setIsLoading(false);
			}
		}

		if (isLogin) {
			try {
				await authCtx.signInWithEmailHandler(email.email, password.password);
				setIsLoading(false);
				navigate("/");
			} catch (error) {
				setError((prev) => ({ ...prev, auth: error.toString() }));
				setIsLoading(false);
			}
		}
	};

	function inputHandler(e) {
		if (e.target.name === "email") {
			setEmail({
				email: e.target.value,
				valid: validator.isEmail(e.target.value),
			});

			if (isLogin) return;
		}
		if (e.target.name === "password") {
			setPassword({
				password: e.target.value,
				valid: validator.isStrongPassword(e.target.value, {
					minLength: 8,
					minLowercase: 0,
					minNumbers: 1,
					minSymbols: 0,
					minUppercase: 1,
					returnScore: false,
				}),
			});
			if (isLogin) return;
		}

		if (e.target.name === "passwordAgain") {
			setPasswordAgain(e.target.value);
		}
	}

	function buttonDisplayHandler() {
		if (isLoading) return "Loading...";
		if (!isLoading && isLogin) return "Sign In";
		if (!isLoading && !isLogin) return "Sign Up";
	}

	return (
		<Grid container alignItems="center" sx={{ height: "100vh" }}>
			<Grid item xs={7} sx={{ minWidth: "600px" }}>
				<Container maxWidth="sm">
					<Sheet
						variant="soft"
						color="neutral"
						sx={{
							background: "RGBA(0 0 0 / 0.3)",
							display: "flex",
							flexDirection: "column",
							borderRadius: "16px",
							padding: "32px",
							textAlign: "center",
							gap: "32px",
						}}
					>
						<Tabs
							size="md"
							defaultValue={0}
							variant="soft"
							color="neutral"
							sx={{ borderRadius: "8px" }}
						>
							<TabList>
								<Tab
									onClick={(e) => {
										e.preventDefault();
										setIsLogin(true);
									}}
									value={0}
								>
									Login
								</Tab>
								<Tab
									onClick={(e) => {
										e.preventDefault();
										setIsLogin(false);
									}}
									value={1}
								>
									Sign up
								</Tab>
							</TabList>
						</Tabs>

						<form onSubmit={onSubmitHandler}>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									gap: "16px",
								}}
							>
								<Typography
									level="p"
									component="label"
									htmlFor="email"
									textAlign="left"
								>
									Email:
								</Typography>
								<TextField
									type="email"
									name="email"
									id="email"
									onChange={inputHandler}
									value={email.email}
									error={!isLogin && email.valid === false}
									helperText={
										!isLogin
											? email.valid
												? ""
												: "Please enter a valid email (example@site.com)"
											: ""
									}
									required
								/>
								<Typography
									level="p"
									component="label"
									htmlFor="password"
									textAlign="left"
								>
									Password:
								</Typography>
								<TextField
									type="password"
									name="password"
									id="password"
									autoComplete="new-password"
									onChange={inputHandler}
									value={password.password}
									error={!isLogin && password.valid === false}
									helperText={
										!isLogin
											? password.valid
												? ""
												: "Your password must be at least 8 characters long, contain 1 uppercase letter and 1 number"
											: ""
									}
									required
								/>
								{!isLogin && (
									<React.Fragment>
										<Typography
											level="p"
											component="label"
											htmlFor="passwordAgain"
											textAlign="left"
										>
											Repeat password:
										</Typography>
										<TextField
											type="password"
											name="passwordAgain"
											id="passwordAgain"
											onChange={inputHandler}
											value={passwordAgain}
											error={!(password.password === passwordAgain)}
											helperText={
												!(password.password === passwordAgain)
													? "Password must match"
													: ""
											}
											required
										/>
									</React.Fragment>
								)}
								<Typography
									level="p"
									component="p"
									textAlign="center"
									sx={{
										color: "Crimson",
										fontWeight: "bold",
									}}
								>
									{error.auth}
								</Typography>
								<Button
									color="success"
									variant="solid"
									type="submit"
									loading={isLoading ? true : false}
								>
									{buttonDisplayHandler()}
								</Button>
							</Box>
						</form>
					</Sheet>
				</Container>
			</Grid>
			<Grid item xs={5}>
				<Title></Title>
			</Grid>
		</Grid>
	);
}
