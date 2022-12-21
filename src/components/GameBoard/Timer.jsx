import { Typography } from "@mui/joy";
import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import GameContext from "../../store/game-context";

export default function Timer(props) {
	const ctx = useContext(GameContext);

	// Timer display updates score every second depending on state of the game
	useEffect(() => {
		let interval = null;
		if (!props.scoreIsActive) {
			clearInterval(interval);
		} else {
			interval = setInterval(() => {
				props.setScore((prev) => prev + 1);
			}, 1000);
		}

		return () => {
			clearInterval(interval);
		};
	}, [props.score, props.scoreIsActive]);

	return (
		<Typography
			color="warning"
			level="h6"
			component="p"
			sx={{ padding: "8px" }}
		>
			Score: {props.score}
		</Typography>
	);
}
