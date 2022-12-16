import React, { useContext } from "react";
import { useEffect } from "react";
import GameContext from "../../store/game-context";

export default function Timer() {
	const ctx = useContext(GameContext);

	//Timer display updates score every second depending on state of the game
	useEffect(() => {
		let interval = null;
		if (!ctx.scoreIsActive) {
			clearInterval(interval);
		} else {
			interval = setInterval(() => {
				ctx.setScore((prev) => prev + 1);
			}, 1000);
		}

		return () => {
			clearInterval(interval);
		};
	}, [ctx.score, ctx.scoreIsActive]);

	return <div>{ctx.score}</div>;
}
