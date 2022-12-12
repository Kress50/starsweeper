import Cell from "./Cell";
import { useContext, useEffect } from "react";
import GameContext from "../store/game-context";

export function Board() {
	const ctx = useContext(GameContext);

	useEffect(() => {
		ctx.onGenerate(
			ctx.difficulty.height,
			ctx.difficulty.width,
			ctx.difficulty.mines
		);
		console.log("running");
	}, []);

	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: `repeat(${ctx.difficulty.width}, 30px)`,
				gridTemplateRows: `repeat(${ctx.difficulty.height}, 30px)`,
				gridAutoFlow: "column",
				placeContent: "center",
			}}
		>
			{ctx.board.map((row, rowIndex) =>
				row.map((col, colIndex) => (
					<Cell
						col={col}
						rowIndex={rowIndex}
						colIndex={colIndex}
						key={`${rowIndex}-${colIndex}`}
					/>
				))
			)}
		</div>
	);
}
