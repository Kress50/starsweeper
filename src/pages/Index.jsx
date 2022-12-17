import React, { useContext } from "react";
import GameContext from "../store/game-context";
import DifficultyTitle from "../components/Layout/DifficultyTitle";
import BoardTitle from "../components/Layout/BoardTitle";
import AuthContext from "../store/auth-context";
import LoginModal from "../components/Layout/LoginModal";

export default function Index(props) {
	const ctx = useContext(GameContext);
	const authCtx = useContext(AuthContext);

	return (
		<React.Fragment>
			{!authCtx.isLoggedIn && !authCtx.isLoggedGuest && (
				<LoginModal></LoginModal>
			)}
			{!ctx.hasStarted && <DifficultyTitle />}
			{ctx.hasStarted && <BoardTitle />}
			<div>
				<button onClick={props.shownHandler}>Rules</button>
				<button onClick={props.shownHandler}>Highscores</button>
			</div>
		</React.Fragment>
	);
}
