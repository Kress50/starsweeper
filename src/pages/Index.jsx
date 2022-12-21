import React, { useContext } from "react";
import GameContext from "../store/game-context";
import DifficultySelection from "../components/Layout/DifficultySelection.jsx";
import AuthContext from "../store/auth-context";
import LoginModal from "../components/Layout/LoginModal";
import Rules from "../components/Layout/Rules";
import Highscores from "../components/Layout/Highscores";
import { Container, Sheet, Grid, Divider, Box } from "@mui/joy";
import { Board } from "../components/GameBoard/Board";
import Title from "../components/Layout/Title";

export default function Index() {
	const ctx = useContext(GameContext);
	const authCtx = useContext(AuthContext);

	return (
		<React.Fragment>
			{!authCtx.isLoggedIn && !authCtx.isLoggedGuest && (
				<LoginModal></LoginModal>
			)}
			<Box position="absolute" top="64px" marginLeft="-292px" left="50%">
				{!ctx.hasStarted && <Title></Title>}
			</Box>

			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				minHeight="100vh"
			>
				<Container maxWidth="xl">
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
						{!ctx.hasStarted && <DifficultySelection />}
						{ctx.hasStarted && <Board />}
						<Grid
							container
							direction="row"
							justifyContent="center"
							alignItems="center"
						>
							<Grid item xs={3}>
								<Rules />
							</Grid>
							<Divider orientation="vertical" />
							<Grid item xs={3}>
								<Highscores />
							</Grid>
						</Grid>
					</Sheet>
				</Container>
			</Box>
		</React.Fragment>
	);
}
