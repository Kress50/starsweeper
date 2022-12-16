import React, { useContext } from "react";
import GameContext from "../../store/game-context";

export default function DifficultyTitle() {
	const ctx = useContext(GameContext);

	function gameStartHandler(e) {
		e.preventDefault();
		ctx.onDifficulty(e);
	}

	return (
		<section>
			<h1>Starsweeper</h1>
			<div>
				<p>Choose difficulty</p>
				<button onClick={gameStartHandler}>Easy</button>
				<button onClick={gameStartHandler}>Medium</button>
				<button onClick={gameStartHandler}>Hard</button>
			</div>
		</section>
	);
}
