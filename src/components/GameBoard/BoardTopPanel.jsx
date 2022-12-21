import React, { useContext } from "react";
import Timer from "./Timer";
import AuthContext from "../../store/auth-context";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { useState } from "react";
import { Button, Divider, Grid, Typography } from "@mui/joy";
import Mines from "./Mines";
import ResetBoard from "./ResetBoard";
import ChangeDifficulty from "./ChangeDifficulty";
import GameContext from "../../store/game-context";
import { useEffect } from "react";

export default function BoardTopPanel() {
	const authCtx = useContext(AuthContext);
	const ctx = useContext(GameContext);
	const [isLoading, setIsLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(null);
	const [score, setScore] = useState(0);
	const [scoreIsActive, setScoreIsActive] = useState(true);

	useEffect(() => {
		setScoreIsActive((prev) => !prev);
	}, [ctx.gameState]);

	function difficultyHandler(e) {
		e.preventDefault();
		ctx.onEnd();
		setSuccess(false);
	}

	function resetHandler(e) {
		e.preventDefault();
		ctx.onReset();
		setSuccess(false);
		setScore(0);
	}

	const submitHandler = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			await addDoc(collection(db, "highscores"), {
				diff: ctx.difficulty.diff,
				name: authCtx.user.name,
				score: score,
				uid: authCtx.user.id,
			});
			setIsLoading(false);
			setSuccess(true);
		} catch (error) {
			setError(error.toString());
			setIsLoading(false);
		}
	};

	return (
		<React.Fragment>
			<Grid container justifyContent="center" paddingBottom="16px">
				<Grid item xs={2}>
					<Mines />
				</Grid>
				<Divider orientation="vertical"></Divider>
				<Grid item xs={2}>
					<Timer
						score={score}
						setScore={setScore}
						scoreIsActive={scoreIsActive}
						setScoreIsActive={setScoreIsActive}
					/>
				</Grid>
				<Divider orientation="vertical"></Divider>
				<Grid item xs={2}>
					<ResetBoard resetHandler={resetHandler}></ResetBoard>
				</Grid>
				<Divider orientation="vertical"></Divider>
				<Grid item xs={2}>
					<ChangeDifficulty
						difficultyHandler={difficultyHandler}
					></ChangeDifficulty>
				</Grid>
			</Grid>
			{authCtx.isLoggedIn && ctx.gameState === "win" && (
				<Button
					color="success"
					variant="solid"
					type="submit"
					onClick={submitHandler}
					loading={isLoading ? true : false}
					disabled={success ? true : false}
					sx={{ marginBottom: "16px" }}
				>
					{success ? "Submitted!" : "Submit Score!"}
				</Button>
			)}
			{error && (
				<Typography
					level="p"
					component="p"
					textAlign="center"
					sx={{
						color: "Crimson",
						fontWeight: "bold",
					}}
				>
					{error}
				</Typography>
			)}
		</React.Fragment>
	);
}
