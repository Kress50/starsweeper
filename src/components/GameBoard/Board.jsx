import Cell from "./Cell";
import React, { useContext, useEffect } from "react";
import GameContext from "../../store/game-context";
import Timer from "./Timer";
import AuthContext from "../../store/auth-context";

export function Board() {
	const ctx = useContext(GameContext);
	const authCtx = useContext(AuthContext);

	function difficultyHandler(e) {
		e.preventDefault();
		ctx.onEnd();
	}

	function resetHandler(e) {
		e.preventDefault();
		ctx.onReset();
	}

	useEffect(() => {
		ctx.onReset();
	}, []);

	function outputIndexRenderHandler() {
		if (ctx.gameState === "default") return "Game on!";
		if (ctx.gameState === "defeat") return "Defeat!";
		if (ctx.gameState === "win") return "Congratulations!";
	}

	return (
		<React.Fragment>
			<div>{outputIndexRenderHandler()}</div>
			<div>
				<div>{ctx.mineCount}</div>
				<Timer />
			</div>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: `repeat(${ctx.difficulty.width}, 30px)`,
					gridTemplateRows: `repeat(${ctx.difficulty.height}, 30px)`,
					// gridAutoFlow: "column",
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
			{authCtx.isLoggedIn && ctx.gameState === "win" && (
				<button>Submit Highscore!</button>
			)}
			<div>
				<button onClick={difficultyHandler}>Change Difficulty</button>
				<button onClick={resetHandler}>Reset Board</button>
			</div>
		</React.Fragment>
	);
}
