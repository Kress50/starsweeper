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
import {
	Box,
	Button,
	CircularProgress,
	Modal,
	ModalClose,
	Sheet,
	Tab,
	TabList,
	Tabs,
	Typography,
} from "@mui/joy";

export default function HighscoresSheet() {
	const [highscores, setHighscores] = useState([]);
	const [lastHighscore, setLastHighscore] = useState(null);
	const [difficulty, setDifficulty] = useState("easy");
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingButton, setIsLoadingButton] = useState(false);
	const [isEmpty, setIsEmpty] = useState(false);
	const [index, setIndex] = useState(0);

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
		<Sheet
			variant="outlined"
			color="neutral"
			sx={{
				display: "flex",
				gap: "16px",
				flexDirection: "column",
				borderRadius: "16px",
				padding: "48px 24px 24px 24px",
			}}
		>
			<ModalClose />
			<Tabs
				size="lg"
				value={index}
				defaultValue={0}
				variant="soft"
				color="neutral"
			>
				<TabList>
					<Tab
						onClick={(e) => {
							e.preventDefault();
							setDifficulty("easy");
							setIsLoadingButton(false);
							setIsEmpty(false);
							setIndex(0);
						}}
						value={0}
						color={index === 0 ? "success" : "neutral"}
					>
						Easy
					</Tab>
					<Tab
						onClick={(e) => {
							e.preventDefault();
							setDifficulty("medium");
							setIsLoadingButton(false);
							setIsEmpty(false);
							setIndex(1);
						}}
						value={1}
						color={index === 1 ? "warning" : "neutral"}
					>
						Normal
					</Tab>
					<Tab
						onClick={(e) => {
							e.preventDefault();
							setDifficulty("hard");
							setIsLoadingButton(false);
							setIsEmpty(false);
							setIndex(2);
						}}
						value={2}
						color={index === 2 ? "danger" : "neutral"}
					>
						Hard
					</Tab>
				</TabList>
			</Tabs>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
				}}
			>
				{isLoading && <CircularProgress color="neutral" variant="plain" />}
				{!isLoading && (
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
				{!isLoading && (
					<HighscoreTable highscores={highscores}></HighscoreTable>
				)}
				{!isEmpty ? (
					<Button
						variant="soft"
						color="neutral"
						onClick={fetchMoreHighscores}
						loading={isLoadingButton ? true : false}
					>
						Load More
					</Button>
				) : (
					<Typography level="p" component="p" color="danger" textAlign="center">
						No more scores available
					</Typography>
				)}
			</Box>
		</Sheet>
	);
}
