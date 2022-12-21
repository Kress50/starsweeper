import { Grid, Sheet, Box, Button, Menu, MenuItem } from "@mui/joy";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import GameContext from "../../store/game-context";

export default function Header() {
	const ctx = useContext(GameContext);
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	function navigateToIndex() {
		navigate("/");
	}

	function navigateToAuth() {
		navigate("/authenticate");
	}

	function headerSignOutHandler() {
		authCtx.signOutHandler();
		ctx.onEnd();
	}

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Sheet
			sx={{
				background: "rgba(0 0 0 / .75)",
				display: "flex",
				justifyContent: "center",
				gap: "32px",
				padding: "16px",
				position: "fixed",
				top: 0,
				width: "100%",
			}}
			component="header"
			variant="outlined"
		>
			<Grid
				container
				alignItems="center"
				width="100%"
				textAlign="center"
				fontWeight="bold"
			>
				<Grid item xs={12}>
					<Button
						onClick={navigateToIndex}
						variant="plain"
						color="neutral"
						sx={{
							fontFamily: "VT323",
							fontSize: "2rem",
							borderRadius: 0,
						}}
					>
						STARSWEEPER
					</Button>
				</Grid>
				<Box position="absolute" right="16px">
					<Button
						variant="plain"
						color="neutral"
						onClick={handleClick}
						sx={{ borderRadius: 0 }}
						aria-controls={open ? "profile-menu" : undefined}
						aria-haspopup="true"
						aria-expanded={open ? "true" : undefined}
					>
						Welcome {authCtx.user.name}
					</Button>
					<Menu
						id="profile-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						aria-labelledby="profile-button"
					>
						{authCtx.user.id ? (
							<MenuItem level="h6" component="p" onClick={headerSignOutHandler}>
								Sign out
							</MenuItem>
						) : (
							<MenuItem level="h6" component="p" onClick={navigateToAuth}>
								Sign in
							</MenuItem>
						)}
					</Menu>
				</Box>
			</Grid>
		</Sheet>
	);
}
