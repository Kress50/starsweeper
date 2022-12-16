import { createContext, useState } from "react";
import randomMineHandler from "../utils/randomMineHandler";
import generateNeighboursHandler from "../utils/generateNeighboursHandler";
import emptyCellsHandler from "../utils/emptyCellsHandler";
import displayGridHandler from "../utils/displayGridHandler";
import produce from "immer";
import winConditionHandler from "../utils/winConditionHandler";

const GameContext = createContext({
	hasStarted: true,
	gameState: false,
	difficulty: {},
	board: [],
	mineCount: 0,
	score: 0,
	scoreIsActive: false,
	setScore: () => {},
	onEnd: () => {},
	onReset: () => {},
	onDifficulty: () => {},
	onGenerate: () => {},
	onLeftClick: () => {},
	onRightClick: () => {},
});

export function GameContextProvider(props) {
	const [hasStarted, setHasStarted] = useState(false);
	console.log(hasStarted);
	const [gameState, setGameState] = useState("default");
	const [difficulty, setDifficulty] = useState({
		width: 0,
		height: 0,
		mines: 0,
	});
	const [board, setBoard] = useState([]);
	const [mineCount, setMineCount] = useState(0);
	const [score, setScore] = useState(0);
	const [scoreIsActive, setScoreIsActive] = useState(false);

	function endHandler() {
		setHasStarted(false);
		setGameState("default");
	}

	function resetHandler() {
		setGameState("default");
		setMineCount(difficulty.mines);
		setScore(0);
		setScoreIsActive(true);
		generateBoardHandler(difficulty.width, difficulty.height, difficulty.mines);
	}

	function difficultyHandler(diff) {
		// Looking at which difficulty is being selected and passing object data to board generator

		if (diff.target.innerText === "Easy") {
			setDifficulty({
				width: 9,
				height: 9,
				mines: 10,
			});
			setMineCount(10);
		}
		if (diff.target.innerText === "Medium") {
			setDifficulty({
				width: 16,
				height: 16,
				mines: 40,
			});
			setMineCount(40);
		}
		if (diff.target.innerText === "Hard") {
			setDifficulty({
				width: 30,
				height: 16,
				mines: 99,
			});
			setMineCount(99);
		}
		setHasStarted(true);
		setScoreIsActive(true);
	}

	function generateBoardHandler(height = 0, width = 0, mines = 0) {
		// Generating empty minesweeper array (board)
		let boardArray = Array(width)
			.fill()
			.map((_, indexW) =>
				Array(height)
					.fill()
					.map((_, indexH) => ({
						x: indexW,
						y: indexH,
						mine: false,
						empty: false,
						revealed: false,
						flagged: false,
						neighbours: 0,
					}))
			);

		// Mutating minesweeper array with mines
		let minesMutatedArray = randomMineHandler(boardArray, height, width, mines);

		// Mutating minesMutatedArray with to find mine neighbours
		let neighboursMutatedArray = generateNeighboursHandler(
			minesMutatedArray,
			height,
			width
		);
		setBoard(neighboursMutatedArray);
	}

	function leftClickHandler(e, rowIndex = 0, colIndex = 0) {
		e.preventDefault();

		//Checking if cell is already revealed or flagged, do nothing if true
		if (board[rowIndex][colIndex].revealed || board[rowIndex][colIndex].flagged)
			return;

		//Revealing the cell object
		const updatedBoard = produce(board, (draft) => {
			//Reveals the clicked cells
			Object.assign(draft[rowIndex][colIndex], { revealed: true });

			//If cell was empty, also runs the emptyCellsHandler to check for empty neighbours and reveal them too
			if (draft[rowIndex][colIndex].empty) {
				emptyCellsHandler(
					difficulty.height,
					difficulty.width,
					rowIndex,
					colIndex,
					draft
				);
			}
		});

		//Checking if clicked cell contains a bomb, ending the game if it does
		const revealedBoard = displayGridHandler(updatedBoard);

		if (updatedBoard[rowIndex][colIndex].mine) {
			setGameState("defeat");
			setScoreIsActive(false);
			setBoard(revealedBoard);
			return;
		}

		//Check for win condition
		if (winConditionHandler(updatedBoard, difficulty) === true) {
			setGameState("win");
			setBoard(revealedBoard);
			setScoreIsActive(false);
			return;
		}
		setBoard(updatedBoard);
	}

	function rightClickHandler(e, rowIndex = 0, colIndex = 0) {
		e.preventDefault();
		if (board[rowIndex][colIndex].revealed) return;
		const updatedBoard = produce(board, (draft) => {
			//Checks for flag availability
			if (mineCount <= 0 && !draft[rowIndex][colIndex].flagged) return;

			//Mutates flagged status and counter depending if the cell is already flagged
			if (mineCount > 0 && !draft[rowIndex][colIndex].flagged) {
				setMineCount((prev) => prev - 1);
				draft[rowIndex][colIndex].flagged = !draft[rowIndex][colIndex].flagged;
			} else {
				setMineCount((prev) => prev + 1);
				draft[rowIndex][colIndex].flagged = !draft[rowIndex][colIndex].flagged;
			}
		});
		setBoard(updatedBoard);
	}

	return (
		<GameContext.Provider
			value={{
				hasStarted: hasStarted,
				gameState: gameState,
				difficulty: difficulty,
				board: board,
				mineCount: mineCount,
				score: score,
				setScore: setScore,
				scoreIsActive: scoreIsActive,
				onEnd: endHandler,
				onReset: resetHandler,
				onDifficulty: difficultyHandler,
				onGenerate: generateBoardHandler,
				onLeftClick: leftClickHandler,
				onRightClick: rightClickHandler,
			}}
		>
			{props.children}
		</GameContext.Provider>
	);
}

export default GameContext;
