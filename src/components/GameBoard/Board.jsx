import Cell from "./Cell";
import React, { useContext, useEffect } from "react";
import GameContext from "../../store/game-context";
import Timer from "./Timer";
import AuthContext from "../../store/auth-context";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { useState } from "react";

export function Board() {
	const ctx = useContext(GameContext);
	const authCtx = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	function difficultyHandler(e) {
		e.preventDefault();
		ctx.onEnd();
	}

	function resetHandler(e) {
		e.preventDefault();
		ctx.onReset();
	}

	const submitHandler = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			await addDoc(collection(db, "highscores"), {
				diff: ctx.difficulty.diff,
				name: authCtx.user.name,
				score: ctx.score,
				uid: authCtx.user.id,
			});
			setIsLoading(false);
		} catch (error) {
			setError(error.toString());
			setIsLoading(false);
		}
	};

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
				<button onClick={submitHandler}>
					{isLoading ? "Loading..." : "Submit Highscore!"}
				</button>
			)}
			{error && <div>{error}</div>}
			<div>
				<button onClick={difficultyHandler}>Change Difficulty</button>
				<button onClick={resetHandler}>Reset Board</button>
			</div>
		</React.Fragment>
	);
}
