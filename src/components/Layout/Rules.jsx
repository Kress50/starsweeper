import { Button, Modal, ModalClose, Sheet, Typography } from "@mui/joy";
import React, { useState } from "react";

export default function Rules() {
	const [isRulesShown, setIsRulesShown] = useState(false);

	function shownHandler(e) {
		e.preventDefault();
		setIsRulesShown(!isRulesShown);
	}

	return (
		<React.Fragment>
			<Button size="lg" variant="soft" color="neutral" onClick={shownHandler}>
				How To Play
			</Button>
			<Modal
				open={isRulesShown}
				onClose={shownHandler}
				layout="center"
				sx={{
					variant: "outlined",
					color: "info",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Sheet
					variant="outlined"
					color="neutral"
					sx={{
						maxWidth: "800px",
						display: "flex",
						gap: "32px",
						flexDirection: "column",
						borderRadius: "16px",
						border: "1px solid whitesmoke",
						padding: "32px",
					}}
				>
					<ModalClose />
					<Typography level="h2" component="h2" sx={{ textAlign: "center" }}>
						Starsweeper
					</Typography>
					<Typography level="h4" component="p">
						You're an autonomous vessel tasked by The Federation to charter the
						far reaches of the unexplored space. To help you with this task,
						your ship is equipped with an advance scanner capable of detecting
						threats in the nearby sectors.
					</Typography>
					<Typography level="h4" component="p">
						<Typography color="primary">Mission goal</Typography>: Explore all
						of the sectors and evade all of the lethal threats.
					</Typography>
					<Typography level="h4" component="p" color="danger">
						Depending on the chosen difficulty you may have to explore larger
						and more dangerous regions of space...
					</Typography>
					<Typography level="h3" component="p">
						<strong>Good luck!</strong>
					</Typography>
				</Sheet>
			</Modal>
		</React.Fragment>
	);
}
