import { Button, Typography } from "@mui/joy";
import React from "react";

export default function ChangeDifficulty(props) {
	return (
		<div>
			<Button
				variant="plain"
				color="warning"
				onClick={props.difficultyHandler}
				sx={{
					borderRadius: "5px",
					padding: "8px",
				}}
			>
				<Typography level="h6" component="p">
					Change Difficulty
				</Typography>
			</Button>
		</div>
	);
}
