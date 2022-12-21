import React from "react";
import { useState } from "react";
import { Button, Modal } from "@mui/joy";
import HighscoresSheet from "./HighscoresSheet";

export default function Highscores() {
	const [isHighscoresShown, setIsHighscoresShown] = useState(false);
	function shownHandler(e) {
		e.preventDefault();
		setIsHighscoresShown(!isHighscoresShown);
	}

	return (
		<React.Fragment>
			<Button size="lg" variant="soft" color="neutral" onClick={shownHandler}>
				Highscores
			</Button>
			<Modal
				layout="center"
				variant="soft"
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
				open={isHighscoresShown}
				onClose={shownHandler}
			>
				<div>
					<HighscoresSheet />
				</div>
			</Modal>
		</React.Fragment>
	);
}
