import Cell from "./Cell";
import React, { useContext, useEffect } from "react";
import GameContext from "../../store/game-context";
import { Container } from "@mui/system";
import BoardTopPanel from "./BoardTopPanel";

export function Board() {
	const ctx = useContext(GameContext);

	useEffect(() => {
		ctx.onReset();
	}, []);

	return (
		<Container>
			<BoardTopPanel />
			<Container>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: `repeat(${ctx.difficulty.width}, 35px)`,
						gridTemplateRows: `repeat(${ctx.difficulty.height}, 35px)`,
						justifyContent: "center",
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
			</Container>
		</Container>
	);
}
