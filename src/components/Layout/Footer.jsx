import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Sheet, Typography, Button } from "@mui/joy";

export default function Footer() {
	return (
		<footer>
			<Sheet
				sx={{
					background: "rgba(0 0 0 / .75)",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					gap: "32px",
					padding: "16px",
					position: "fixed",
					bottom: 0,
					width: "100%",
				}}
				component="footer"
				variant="outlined"
			>
				<div className="socials">
					<Button
						variant="plain"
						color="neutral"
						sx={{
							fontFamily: "VT323",
							fontSize: "2rem",
							borderRadius: 0,
						}}
						href="/"
					>
						<GitHubIcon />
					</Button>
				</div>
				<Typography level="h6" component="p">
					Made using React with MUI
				</Typography>
			</Sheet>
		</footer>
	);
}
