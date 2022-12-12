import React, { useContext, useEffect } from "react";
import GameContext from "../store/game-context";
import { Board } from "../components/Board";

export default function Index() {
	const ctx = useContext(GameContext);

	function gameStartHandler(e) {
		e.preventDefault();
		ctx.onDifficulty(e);
	}

	function resetHandler(e) {
		e.preventDefault();
		ctx.onEnd();
	}

	function outputIndexRenderHandler() {
		if (ctx.gameState === "default") return "Game on!";
		if (ctx.gameState === "defeat") return "Defeat!";
		if (ctx.gameState === "win") return "Congratulations!";
	}

	return (
		<React.Fragment>
			{!ctx.hasStarted && (
				<section>
					<h1>Starsweeper</h1>
					<div>
						<p>Choose difficulty</p>
						<button onClick={gameStartHandler}>Easy</button>
						<button onClick={gameStartHandler}>Medium</button>
						<button onClick={gameStartHandler}>Hard</button>
					</div>
				</section>
			)}
			{ctx.hasStarted && (
				<section>
					<div>{outputIndexRenderHandler()}</div>
					<div>{ctx.mineCount}</div>
					<Board />
					<button onClick={resetHandler}>Reset Board</button>
				</section>
			)}
		</React.Fragment>
	);
}
