import { Typography } from "@mui/joy";
import React, { useContext } from "react";
import GameContext from "../../store/game-context";

export default function Mines() {
	const ctx = useContext(GameContext);

	return (
		<Typography level="h6" component="p" color="danger" sx={{ padding: "8px" }}>
			Mines: {ctx.mineCount}
		</Typography>
	);
}
