import React, { useContext } from "react";
import FlareIcon from "@mui/icons-material/Flare";
import GameContext from "../store/game-context";

export default function Cell({ col, rowIndex, colIndex }) {
	const ctx = useContext(GameContext);

	function outputCellRenderHandler(cellData) {
		const { mine, revealed, neighbours, flagged } = cellData;
		if (!revealed) return flagged ? "F" : "";
		if (mine) return <FlareIcon />;
		if (neighbours) return neighbours;
	}

	return (
		<div
			style={{
				border: "1px solid black",
			}}
			onClick={(e) => ctx.onLeftClick(e, rowIndex, colIndex)}
			onContextMenu={(e) => ctx.onRightClick(e, rowIndex, colIndex)}
		>
			{outputCellRenderHandler(col)}
		</div>
	);
}
