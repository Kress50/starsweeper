import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import HighscoreTable from "./HighscoreTable";
import {
	collection,
	getDocs,
	query,
	where,
	orderBy,
	limit,
	startAfter,
} from "firebase/firestore";
import { db } from "../../../firebase-config";

export default function Highscores() {
	const [highscores, setHighscores] = useState([]);
	const [lastHighscore, setLastHighscore] = useState(null);
	const [difficulty, setDifficulty] = useState("easy");
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingButton, setIsLoadingButton] = useState(false);
	const [isEmpty, setIsEmpty] = useState(false);

	const highscoreRef = collection(db, "highscores");

	useEffect(() => {
		setIsLoading(true);
		const q = query(
			highscoreRef,
			where("diff", "==", difficulty),
			orderBy("score"),
			limit(5)
		);
		const getHighscores = async () => {
			try {
				const users = await getDocs(q);
				setHighscores(users.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
				setLastHighscore(users.docs[users.docs.length - 1]);
				setIsLoading(false);
			} catch (error) {
				setError(error.toString());
				setIsLoading(false);
			}
		};
		getHighscores();
	}, [difficulty]);

	console.log(highscores);

	function difficultyHandler(e) {
		if (e.target.innerText === "Easy") setDifficulty("easy");
		if (e.target.innerText === "Medium") setDifficulty("medium");
		if (e.target.innerText === "Hard") setDifficulty("hard");
	}

	const fetchMoreHighscores = async (e) => {
		e.preventDefault();
		setIsLoadingButton(true);
		const q = query(
			highscoreRef,
			where("diff", "==", difficulty),
			orderBy("score"),
			startAfter(lastHighscore),
			limit(5)
		);
		try {
			const users = await getDocs(q);
			if (users.size === 0) {
				setIsEmpty(true);
				return;
			}
			setHighscores((prev) => [
				...prev,
				...users.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
			]);
			setIsLoadingButton(false);
			setLastHighscore(users.docs[users.docs.length - 1]);
		} catch (error) {
			setError(error.toString());
			setIsLoadingButton(false);
		}
	};

	return (
		<React.Fragment>
			<div>
				<div>
					<div onClick={difficultyHandler}>Easy</div>
					<div onClick={difficultyHandler}>Medium</div>
					<div onClick={difficultyHandler}>Hard</div>
				</div>
				{isLoading && <div>Loading...</div>}
				{!isLoading && error}
				{!isLoading && (
					<HighscoreTable highscores={highscores}></HighscoreTable>
				)}
				<div>
					{!isEmpty ? (
						<button onClick={fetchMoreHighscores}>
							{isLoadingButton ? "Loading..." : "Load more"}
						</button>
					) : (
						<div>No more scores available</div>
					)}
				</div>
			</div>
		</React.Fragment>
	);
}
