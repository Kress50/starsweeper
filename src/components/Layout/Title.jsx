import { Typography } from "@mui/joy";
import React from "react";

export default function Title() {
	return (
		<Typography
			level="display1"
			component="h1"
			className="animate__animated animate__bounceInDown"
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
