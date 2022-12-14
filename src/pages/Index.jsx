import React, { useContext } from "react";
import GameContext from "../store/game-context";
import { Board } from "../components/Board";

export default function Index(props) {
	const ctx = useContext(GameContext);

	function gameStartHandler(e) {
		e.preventDefault();
		ctx.onDifficulty(e);
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
					<Board />
				</section>
			)}
			<div>
				<button onClick={props.shownHandler}>Rules</button>
				<button onClick={props.shownHandler}>Highscores</button>
			</div>
		</React.Fragment>
	);
}
