import { Button, Typography } from "@mui/joy";
import React from "react";

export default function ResetBoard(props) {
	return (
		<div>
			<Button
				variant="plain"
				color="danger"
				onClick={props.resetHandler}
				sx={{
					borderRadius: "5px",
					padding: "8px",
				}}
			>
				<Typography level="h6" component="p">
					Reset Board
				</Typography>
			</Button>
		</div>
	);
}
