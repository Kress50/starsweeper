import React, { useContext } from "react";
import GameContext from "../store/game-context";

export default function Highscores() {
	const ctx = useContext(GameContext);

	return <div>highscores</div>;
}
