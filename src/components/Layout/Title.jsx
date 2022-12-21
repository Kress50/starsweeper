import { Typography } from "@mui/joy";
import React, { useContext } from "react";
import GameContext from "../../store/game-context";

export default function Title() {
	const ctx = useContext(GameContext);

	return (
		<Typography
			level="display1"
			component="h1"
			sx={{
				fontSize: "8rem",
				fontWeight: "bold",
				display: "inline-block",
				padding: "0 8px",
				border: "10px solid whitesmoke",
				textAlign: "center",
				fontFamily: "VT323",
			}}
		>
			Starsweeper
		</Typography>
	);
}
