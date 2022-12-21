import { Button, Container, Divider, Grid, Typography } from "@mui/joy";
import React, { useContext } from "react";
import GameContext from "../../store/game-context";

export default function DifficultySelection() {
	const ctx = useContext(GameContext);

	function gameStartHandler(e) {
		e.preventDefault();
		ctx.onDifficulty(e);
	}

	return (
		<Container
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: "32px",
				justifyContent: "center",
			}}
		>
			<Typography level="h2" component="h2">
				Select your difficulty
			</Typography>
			<Divider></Divider>
			<Grid
				container
				direction="row"
				justifyContent="center"
				alignItems="center"
			>
				<Grid item xs={3}>
					<Button
						variant="plain"
						color="success"
						size="lg"
						onClick={gameStartHandler}
					>
						Easy
					</Button>
				</Grid>
				<Grid item xs={3}>
					<Button
						variant="plain"
						color="warning"
						size="lg"
						onClick={gameStartHandler}
					>
						Normal
					</Button>
				</Grid>
				<Grid item xs={3}>
					<Button
						variant="plain"
						color="danger"
						size="lg"
						onClick={gameStartHandler}
					>
						Hard
					</Button>
				</Grid>
			</Grid>
		</Container>
	);
}
