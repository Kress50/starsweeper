import React, { useContext } from "react";
import GameContext from "../store/game-context";
import DifficultyTitle from "../components/Layout/DifficultyTitle";
import BoardTitle from "../components/Layout/BoardTitle";

export default function Index(props) {
	const ctx = useContext(GameContext);
	return (
		<React.Fragment>
			{!ctx.hasStarted && <DifficultyTitle />}
			{ctx.hasStarted && <BoardTitle />}
			<div>
				<button onClick={props.shownHandler}>Rules</button>
				<button onClick={props.shownHandler}>Highscores</button>
			</div>
		</React.Fragment>
	);
}
