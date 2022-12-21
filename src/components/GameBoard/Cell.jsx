import React, { useContext } from "react";
import FlareIcon from "@mui/icons-material/Flare";
import FlagIcon from "@mui/icons-material/Flag";
import GameContext from "../../store/game-context";
import { Sheet } from "@mui/joy";

export default function Cell({ col, rowIndex, colIndex }) {
	const ctx = useContext(GameContext);
	function outputCellRenderHandler(cellData) {
		const { mine, revealed, neighbours, flagged } = cellData;
		if (!revealed) return flagged ? <FlagIcon /> : "";
		if (mine) return <FlareIcon />;
		if (neighbours) return neighbours;
	}

	function colorHandler(cellData) {
		const { mine, revealed, neighbours, flagged } = cellData;
		if (ctx.gameState === "defeat") return "danger";
		if (flagged) return "primary";
		if (mine && revealed) return "danger";
		if (neighbours > 0 && neighbours <= 3 && revealed) return "success";
		if (neighbours > 3 && neighbours <= 5 && revealed) return "warning";
		if (neighbours > 5 && neighbours <= 8 && revealed) return "danger";
		if (revealed) return "success";
	}

	function randomNumberAnimation() {
		let random = Math.random() * 3;
		if (random > 0 && random <= 1)
			return "animate__animated animate__bounceIn animate__faster";
		if (random > 1 && random <= 2)
			return "animate__animated animate__bounceIn animate__fast";
		if (random > 2 && random <= 3) return "animate__animated animate__bounceIn";
	}

	return (
		<Sheet
			variant="outlined"
			color={colorHandler(col)}
			className={randomNumberAnimation()}
			onClick={(e) => ctx.onLeftClick(e, rowIndex, colIndex)}
			onContextMenu={(e) => ctx.onRightClick(e, rowIndex, colIndex)}
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{outputCellRenderHandler(col)}
		</Sheet>
	);
}
