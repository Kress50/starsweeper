import { Button, Divider, Modal, Sheet, Typography } from "@mui/joy";
import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import GoogleIcon from "@mui/icons-material/Google";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";

export default function LoginModal() {
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();

	function navigateToAuth() {
		navigate("/authenticate");
	}

	return (
		<Modal
			open={!authCtx.isLoggedIn && !authCtx.isLoggedGuest}
			onClose={() => {}}
			layout="center"
			variant="soft"
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Sheet
				variant="outlined"
				color="neutral"
				sx={{
					display: "flex",
					gap: "32px",
					flexDirection: "column",
					borderRadius: "16px",
					padding: "32px",
				}}
			>
				<Typography level="h2" component="h2" sx={{ textAlign: "center" }}>
					Welcome to Starsweeper!
				</Typography>
				<Typography level="h5" component="p">
					To play this game you need to authenticate!
				</Typography>
				<Button
					color="success"
					size="lg"
					variant="solid"
					onClick={authCtx.signInWithGoogleHandler}
					sx={{
						display: "flex",
						gap: "8px",
					}}
				>
					<GoogleIcon />
					<Divider orientation="vertical"></Divider>
					Google
				</Button>
				<Button
					color="primary"
					size="lg"
					variant="solid"
					onClick={navigateToAuth}
					sx={{
						display: "flex",
						gap: "8px",
					}}
				>
					<EmailIcon />
					<Divider orientation="vertical"></Divider>
					Email
				</Button>
				<Divider></Divider>
				<Button
					color="neutral"
					size="lg"
					variant="plain"
					onClick={authCtx.signInAsGuestHandler}
				>
					Play as a guest
				</Button>
			</Sheet>
		</Modal>
	);
}
