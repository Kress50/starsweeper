import { Typography } from "@mui/joy";
import React from "react";
import { useEffect } from "react";

export default function Timer(props) {
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
