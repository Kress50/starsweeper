import neighboursHandler from "./neightboursHandler";

export default function emptyCellsHandler(height, width, indexW, indexY, data) {
	//Getting neighbours data for the currently clicked empty cell
	//width / height swapped as a hacky solution for hard mode, seems to work anyway
	let neighbours = neighboursHandler(indexW, indexY, data, width, height);

	neighbours.map((cell) => {
		//Reveals the cell and checks if it was empty before, if yes re-runs the current function for that cell, otherwise stops
		if (!cell.revealed && (cell.empty || !cell.mine)) {
			Object.assign(data[cell.x][cell.y], { revealed: true });
			if (cell.empty) {
				emptyCellsHandler(height, width, cell.x, cell.y, data);
			}
		}
		return null;
	});
	return data;
}
