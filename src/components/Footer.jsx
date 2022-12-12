import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer() {
	return (
		<footer>
			<div>
				<a href="/">
					<GitHubIcon />
				</a>
			</div>
			<div>Made using React with MUI</div>
		</footer>
	);
}
