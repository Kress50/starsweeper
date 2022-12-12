import produce from "immer";

export default function displayGridHandler(data) {
	//maps over every cell and reveals it
	const revealedGrid = produce(data, (draft) =>
		draft.map((row) =>
			row.map((cell) => {
				return { ...cell, revealed: true };
			})
		)
	);
	return revealedGrid;
}
